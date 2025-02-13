import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
    query users {
        users {
        _id
        username
        email 
        }
    }
`;


export const QUERY_USER = gql`
    query user($username: String) {
        user(username: $username) {
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

export const QUERY_ME = gql`
    query me {
        me {
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


export const QUERY_SINGLE_ITEM = gql`
    query getItem($itemId: ID) {
        item(itemId: $itemId) {
        _id
        name
        price
        imagePath
        tags
        }
    }
`;

export const QUERY_BY_TAG = gql`
    query getItems($tag: String) {
        items(tag: $tag) {
        _id
        name
        price
        imagePath
        tags
        }
    }
`;

export const QUERY_RANDOM_NON_GIFT_ITEMS = gql`
    query getRandomNonGiftItems {
        randomNonGiftItems {
            _id
            name
            price
            imagePath
            tags
        }
    }
`;




// export const QUERY_CART = gql`
//     query getCart {
//         cart {
//         _id
//         name
//         price
//         imagePath
//         tags
//         }
//     }
// `;


