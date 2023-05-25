import { Resolver, Query, Mutation, Arg } from 'type-graphql';

@Resolver()
export class UserResolvers {
    @Query(() => String)
    hello() {
        return 'hi!';
    }
}
