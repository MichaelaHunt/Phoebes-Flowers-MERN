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
  createUser(username: String!, email: String!, password: String!): User
  login(email: String!, password: String!): AuthPayload
  createItem(name: String!, price: Float!, tags: [String]): Item
  createCart(userId: ID!, items: [CartItemInput]): User
  }
`;

export default typeDefs;
