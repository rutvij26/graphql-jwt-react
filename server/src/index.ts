import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './UserResolvers';

(async () => {
    const app = express();
    app.get('/', (_, res) => res.send('Hello'));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolvers],
        }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('Express app listening on port 4000!'));
})();
