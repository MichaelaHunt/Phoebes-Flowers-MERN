import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ALTER_QUANTITY_IN_CART = gql`
  mutation updateItemQuantityInCart($userId: ID!, $quantityChange: Int!, $itemId: Int!) {
    alterQuantityInCart(userId: $userId, quantityChange: $quantityChange, itemId: $itemId) {
      _id
      username
      email
      cart {
        inventoryItem {
            _id
            name
            price
            imagePath
        }
        quantity    
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($userId: ID!, $itemId: Int!) {
    removeItemFromCart(userId: $userId, itemId: $itemId) {
      _id
      username
      email
      cart {
        inventoryItem {
            _id
            name
            price
            imagePath
        }
        quantity    
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart($userId: ID!, $itemId: Int!, $quantity: Int!) {
    addItemToCart(userId: $userId, itemId: $itemId, quantity: $quantity) {
      _id
      username
      email
      cart {
        inventoryItem {
          _id
          name
          price
          imagePath
          }
        quantity
      }
    }
  }
`;