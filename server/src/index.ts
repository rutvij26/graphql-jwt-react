import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './UserResolvers';
import { AppDataSource } from './data-source';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken } from './auth';
import { sendRefreshToken } from './sendRefreshToken';
import cors from 'cors';

(async () => {
    const app = express();
    app.use(cookieParser());
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );
    app.get('/', (_, res) => res.send('Hello'));
    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.jid;

        if (!token) {
            return res.send({ ok: false, accessToken: '' });
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: '' });
        }

        //token is valid now
        // send back an access token

        const user = await User.findOne({ where: { id: payload.userId } });

        if (!user) {
            return res.send({ ok: false, accessToken: '' });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: '' });
        }

        sendRefreshToken(res, createAccessToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    AppDataSource.initialize();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolvers],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => console.log('Express app listening on port 4000!'));
})();
