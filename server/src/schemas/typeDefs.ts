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

  type Review {
    _id: ID!
    username: String!
    content: String!
    stars: Int!
  }

  type Item {
    _id: ID!
    name: String!
    price: Float!
    imagePath: String!
    tags: [String]
    reviews: [Review]
  }

  type Query {

  }

  type Mutation {

  }
`;

export default typeDefs;
