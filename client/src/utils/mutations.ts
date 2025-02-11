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

export const ALTER_QUANTITY_IN_CART = gql`
  mutation alterQuantityInCart($userId: ID!, $quantityChange: Int!, $itemId: ID!) {
    alterQuantityInCart(userId: $userId, $quantityChange: $quantityChange, itemId: $itemId) {
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

export const ADD_ITEM_TO_CART = gql`
mutation addItemToCart($userId: ID!, $itemId: ID!, $quantity: Int!) {
addItemToCart(userId: $userId, itemId: $itemId, quantity: $quantity) {
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
