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
        const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
}