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

  type AuthPayload {
    token: String!
    user: User!
  }

  type Item {
    _id: Int!
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
  addItemToCart(userId: ID!, itemId: Int!, quantity: Int!): User
  alterQuantityInCart(userId: ID!, itemId: Int!): User
  removeItemFromCart(userId: ID!, itemId: Int!): User
  }
`;

export default typeDefs;
