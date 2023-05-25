import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './UserResolvers';
import { AppDataSource } from './data-source';

(async () => {
    const app = express();
    app.get('/', (_, res) => res.send('Hello'));

    AppDataSource.initialize();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolvers],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('Express app listening on port 4000!'));
})();
