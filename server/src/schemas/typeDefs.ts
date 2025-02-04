const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    cart: [CartItem]
  }

  type CartItem {
    inventoryItem: Item!
    quantity: Int!
  }

  type Item {
    _id: ID!
    name: String!
    price: Float!
    imagePath: String!
    tags: [String]
  }

  type Query {
  getUser: (id: ID!): User
  me: User
  viewCart: Cart
  getItemsById: (id: ID!): Item
  getRandomItems: [Item]
  }

  type Mutation {
  addUser(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  addToCart(itemId: ID!, quantity: Int!): Cart
  removeFromCart(itemId: ID!): Cart
  editCartQuantity(itemId: ID!, quantity: Int!): Cart
  }
`;

export default typeDefs;
