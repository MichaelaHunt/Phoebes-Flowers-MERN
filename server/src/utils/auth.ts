import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }: any) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    //if token is sent in the header, extract it from the header
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    //if no token is given, return the object as is
    if (!token) {
        return req;
    }

    //verify the token
    try {
        const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
        //if the token is valid, attach the data to the request object
        req.user = data;
    } catch (error) {
        //if the token is invalid, throw an error
        console.log('invalid token');
    }
    //return the request object
    return req;
}

export const signToken = (username: string, email: string, _id: unknown) => {
    //create the payload with user data
    const payload = { username, email, _id };
    const secretKey: any = process.env.JWT_SECRET_KEY; //get the secret key from the environment variables

    //sign the token with the payload and secret key, set the expiration to 2 hours
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
    constructor(message: string) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
};