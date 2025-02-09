import { signToken, AuthenticationError } from '../utils/auth.js';
import { User, Item } from '../models/index.js';

//define types for the resolvers

interface UserArgs {
    id: string;
    username: string;
    email: string;
    password: string;
  }
  
interface CartItem {
    id: string;
    itemId: string;
    quantity: number;
  }
  
interface CartArgs {
    id: string;
    userId: string;
    items: CartItem[];
  }
  
  //changed name for item to ItemArgs
interface ItemArgs {
    id: string;
    name: string;
    price: number;
    tags: string[];
  }


// define the resolvers
const resolvers = {
    Query: {
      // get user by id
      //added populate to include cart
      user: async (_parent: any, { id }: { id: string }) => {
        return User.findById(id).populate('cart');
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
      items: async (_: any, { tag }: { tag: string } ) => {
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
        return User.create({ username, email, password });
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
        const token = signToken(user.email, user.username, user.id);
        return { token, user };
      },
      // create a new item
      createItem: async (_parent: any, { name, price, tags }: ItemArgs) => {
        return Item.create({ name, price, tags });
      },
      // create a new cart
      createCart: async (_parent: any, { userId, items }: CartArgs) => {
        return User.create({ userId, items });
      },
    },
};
    export default resolvers;