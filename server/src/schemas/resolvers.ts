import { signToken, AuthenticationError } from '../utils/auth';
import { User, Item } from '../models/index.js';
import { Query } from 'mongoose';

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
        //get a user by id
      getUser: async (_: any, { id }: { id: string }, context: any): Promise<User | null> => {
        return context.db.getUserById(id);
      },
      //check if a user is logged in
      me: async (_: any, __: any, context: any): Promise<User | null> => {
        return context.user;
      },
      //get all items in cart
      viewCart: async (_: any, __: any, context: any): Promise<Cart | null> => {
        return context.db.getCartByUserId(context.user.id);
      },
      //get specific item by id
      getItemsById: async (_: any, { id }: { id: string }, context: any): Promise<Item[]> => {
        return context.db.getItemsById(id);
      },
      getRandomItems: async (_: any, __: any, context: any): Promise<Item[]> => {
        return context.db.getRandomItems(3);
      }
    },

    // Mutation resolvers
    Mutation: {
        addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }, context: any): Promise<User> => {
          return context.db.createUser({ username, email, password });
        },
        login: async (_: any, { email, password }: { email: string; password: string }, context: any): Promise<AuthPayload> => {
          return context.auth.login(email, password);
        },
        addToCart: async (_: any, { itemId, quantity }: { itemId: string; quantity: number }, context: any): Promise<Cart> => {
          return context.db.addToCart(context.user.id, itemId, quantity);
        },
        removeFromCart: async (_: any, { itemId }: { itemId: string }, context: any): Promise<Cart> => {
          return context.db.removeFromCart(context.user.id, itemId);
        },
        editCartQuantity: async (_: any, { itemId, quantity }: { itemId: string; quantity: number }, context: any): Promise<Cart> => {
          return context.db.updateCartItem(context.user.id, itemId, quantity);
        }
      }
    };

    export default resolvers;