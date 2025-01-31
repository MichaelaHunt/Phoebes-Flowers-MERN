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

  }

  type Mutation {

  }
`;

export default typeDefs;
