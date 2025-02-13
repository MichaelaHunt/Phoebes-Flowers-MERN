import { signToken, AuthenticationError } from '../utils/auth.js';
import { User, Item } from '../models/index.js';
// import mongoose from 'mongoose';
// import { ICartItem } from '../models/User.js';

//define types for the resolvers

interface UserArgs {
  id: string;
  username: string;
  email: string;
  password: string;
}

// interface CartItem {
//   id?: string;
//   itemId: number;
//   quantity: number;
// }

// interface CartArgs {
//   id: string;
//   userId: string;
//   items: CartItem[];
// }

// //changed name for item to ItemArgs
// interface ItemArgs {
//   id: string;
//   name: string;
//   price: number;
//   tags: string[];
// }


// define the resolvers
const resolvers = {
  Query: {
    user: async (_parent: any, { username }: { username: string }) => {
      // console.log("Entered user resolver with ID:", _id);
      return User.findOne({username}).populate({
        path: 'cart.inventoryItem', // Ensure inventoryItem inside cart is populated
      });
    },
    // get all users
    //added populate to include cart
    users: async () => {
      return User.find()
      // .populate('cart');
    },
    // get item by id
    item: async (_parent: any, { id }: { id: string }) => {
      return Item.findById(id);
    },
    // get all items
    items: async (_: any, { tag }: { tag: string }) => {
      return Item.find({ tags: { $in: [tag] } });
    },
    //new resolver to get 3 random items without the "gift" tag
    randomNonGiftItems: async () => {
      const items = await Item.find({ tags: { $ne: "gift" } });
      return items.sort(() => Math.random() - 0.5).slice(0, 3);
    },

    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {

        //this line was correct, added populate to include cart, may need to be changed
        // return User.findOne({ _id: context.user._id });
        return User.findById(context.user._id).populate('cart');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // create a new user
    createUser: async (_parent: any, { username, email, password }: UserArgs) => {
      try {
        // Create the user
        const user = await User.create({ username, email, password });

        // Generate authentication token
        const token = signToken(user.username, user.email, user._id);

        // Return the token and user data
        return { token, user };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user. Username or email might already be in use.");
      }
    },
    // login user
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },
    addItemToCart: async (_parent: any, { userId, itemId, quantity }: { userId: string; itemId: number, quantity: number }) => {
      // Find user and ensure cart items are fully populated
      const user = await User.findById(userId).populate({
        path: 'cart.inventoryItem', // Ensure inventoryItem is populated
      });
    
      if (!user) {
        throw new AuthenticationError('User not found');
      }
    
      if (!user.cart) {
        user.cart = [];
      }
    
      // Check if item is already in cart
      const existingItem = user.cart.find((cartItem: any) => cartItem.inventoryItem?._id?.toString() === itemId.toString());
    
      if (existingItem) {
        // existingItem.quantity += quantity;
      } else {
        user.cart.push({ inventoryItem: itemId, quantity });
      }
    
      await user.save();
    
      // Return user with cart and populated inventoryItem
      return await User.findById(userId).populate({
        path: 'cart.inventoryItem',
      });
    },

    //mutation that allows us to add or subtract from the quantity of an item in the cart or remove the item from the cart when the value reaches 0
    alterQuantityInCart: async (_parent: any, { userId, itemId, quantityChange }: { userId: string; itemId: number; quantityChange: number }) => {
      const user = await User.findById(userId).populate('cart');
      if (!user) {
        throw new AuthenticationError('User not found');
      }
      //find the index of the item in the cart
      const itemIndex = user.cart.findIndex((cartItem: any) => cartItem.inventoryItem._id.toString() === itemId);
      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }
      //update the quantity based on the quantityChange value
      user.cart[itemIndex].quantity += quantityChange;
      //remove the item if quantity goes to 0
      if (user.cart[itemIndex].quantity <= 0) {
        user.cart.splice(itemIndex, 1);
      }

      //save the updated cart
      await user.save();
      //return user with the updated cart
      return await User.findById(userId)
        .populate('cart');
    },

    //make mutation for removing entire item from cart regardless of quantity
    removeItemFromCart: async (_parent: any, { userId, itemId }: { userId: string; itemId: number }) => {
      //find the user and populate their cart
      const user = await User.findById(userId).populate('cart');
      //check if user exists
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      //remove item from cart regardless of quantity

      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cart: { inventoryItem: itemId } } },
        { new: true }
      )

      //save the updated cart
      await user.save();
      //return user with the updated cart
      return await User.findById(userId).populate({
        path: 'cart.inventoryItem',
      });
    }
  }
};
export default resolvers;