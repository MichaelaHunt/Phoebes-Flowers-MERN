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
  mutation login($email: String!, $password: String!) {
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

export const ADD_TO_CART = gql`
  mutation addToCart($itemId: ID!) {
    addToCart(itemId: $itemId) {
      _id
      cart {
        _id
        name
        price
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation updateCart($itemId: ID!, $quantity: Int!) {
    updateCart(itemId: $itemId, quantity: $quantity) {
      _id
      cart {
        _id
        name
        price
        quantity
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId) {
      _id
      cart {
        _id
        name
        price
        quantity
      }
    }
  }
`;

export const ALTER_QUANTITY_IN_CART = gql`
  mutation alterQuantityInCart($userId: ID!, $itemId: ID!) {
    alterQuantityInCart(userId: $userId, itemId: $itemId) {
      _id
      username
      email
      cart {
        _id
        name
        price
        imagePath
        quantity
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
mutation removeItemFromCart($userId: ID!, $itemId: ID!) {
removeItemFromCart(userId: $userId, itemId: $itemId) {
        _id
        username
        email
        cart {
            _id
            name
            price
            imagePath
            quantity
            }
        }
`;
