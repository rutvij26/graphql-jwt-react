import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    ObjectType,
    Ctx,
} from 'type-graphql';
import { compare, hash } from 'bcryptjs';
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken } from './auth';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolvers {
    @Query(() => String)
    hello() {
        return 'hi!';
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashedPassword,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error('could not find user');
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error('invalid password');
        }
        // login successful

        res.cookie('jid', createRefreshToken(user), {
            httpOnly: true,
        });

        // return the token to the client
        return {
            accessToken: createAccessToken(user),
        };
    }
}
