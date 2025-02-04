import { signToken, AuthenticationError } from '../utils/auth';
import { User, Item } from '../models/index.js';
import { Query } from 'mongoose';
import db from '../config/connections.js';

//define types for the resolvers

interface User {
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
  
interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
  }
  
interface Item {
    id: string;
    name: string;
    price: number;
    tags: string[];
  }
  
interface AuthPayload {
    token: string;
    user: User;
  }

// define the resolvers
const resolvers = {
    Query: {
      // Get a user by ID
      getUser: async (_: any, { id }: { id: string }): Promise<User | null> => {
        return db.getUserById(id);
      },
      // Check if a user is logged in
      me: async (_: any, __: any, context: any): Promise<User | null> => {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        return context.user;
      },
      // Get all items in the cart
      viewCart: async (_: any, __: any, context: any): Promise<Cart | null> => {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        return db.getCartByUserId(context.user.id);
      },
      // Get specific item by ID
      getItemsById: async (_: any, { id }: { id: string }): Promise<Item | null> => {
        return db.getItemById(id);
      },
      // Get 3 random items
      getRandomItems: async (_: any, __: any): Promise<Item[]> => {
        return db.getRandomItems(3);
      }
    },
  
    Mutation: {
      // Add a new user
      addUser: async (
        _: any,
        { username, email, password }: { username: string; email: string; password: string }
      ): Promise<User> => {
        const newUser = await db.createUser({ username, email, password });
        return newUser;
      },
      // User login
      login: async (_: any, { email, password }: { email: string; password: string }): Promise<AuthPayload> => {
        return auth.login(email, password);
      },
      // Add item to cart
      addToCart: async (
        _: any,
        { itemId, quantity }: { itemId: string; quantity: number },
        context: any
      ): Promise<Cart> => {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        return db.addToCart(context.user.id, itemId, quantity);
      },
      // Remove item from cart
      removeFromCart: async (_: any, { itemId }: { itemId: string }, context: any): Promise<Cart> => {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        return db.removeFromCart(context.user.id, itemId);
      },
      // Edit quantity of an item in the cart
      editCartQuantity: async (
        _: any,
        { itemId, quantity }: { itemId: string; quantity: number },
        context: any
      ): Promise<Cart> => {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        return db.updateCartItem(context.user.id, itemId, quantity);
      }
    }
  };
  
  export default resolvers;
  

    export default resolvers;