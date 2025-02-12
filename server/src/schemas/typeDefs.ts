const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    cart: [CartItem]
  }

  type CartItem {
    inventoryItem: Item!
    quantity: Int!
  }

  input CartItemInput {
    itemId: ID!
    quantity: Int!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Item {
    _id: ID!
    name: String!
    price: Float!
    imagePath: String!
    tags: [String]
  }

  type Query {
  users: [User]
  user(username: String!): User
  items(tag: String!): [Item]
  item(itemId: ID!): Item
  randomNonGiftItems: [Item]
  me: User
}

  type Mutation {
  createUser(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
 addItemToCart(userId: ID!, itemId: ID!, quantity: Int!): User
  alterQuantityInCart(userId: ID!, itemId: ID!): User
  removeItemFromCart(userId: ID!, itemId: ID!): User
  }
`;

export default typeDefs;
