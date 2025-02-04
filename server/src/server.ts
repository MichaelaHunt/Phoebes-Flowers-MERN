import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';   
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server-express';
import { expressMiddleware } from '@apollo/server-express';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//create new Apollo server with GraphQL schema
const server =new ApolloServer ({
    typeDefs,
    resolvers
});

//function to start Apollo server and express server
const startApolloServer = async () => {
    await server.start ();
    //initialize database connection
    await db();
//set port and create express app
    const PORT = process.env.PORT || 3001;
    const app = express();

    //Middleware to parse JSON and urlencoded data 
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    //Apply Apollo GraphQl middleware with authentication context
    app.use('/graphql', expressMiddleware(server as any, 
        {
            context: authenticateToken as any
        }
    ));
//serve static files in production
    if (process.env.NODE_ENV === 'production') {
        //serve static files from client/dist
        app.use(express.static(path.join(__dirname, '../client/dist')));
//handle all other routes by serving index.html
        app.get('*', (_req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }
//start server
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
}

startApolloServer();
