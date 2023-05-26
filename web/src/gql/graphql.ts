/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string | number; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type LoginResponse = {
    __typename?: 'LoginResponse';
    accessToken: Scalars['String']['output'];
};

export type Mutation = {
    __typename?: 'Mutation';
    login: LoginResponse;
    register: Scalars['Boolean']['output'];
    revokeRefreshTokensForUser: Scalars['Boolean']['output'];
};

export type MutationLoginArgs = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type MutationRevokeRefreshTokensForUserArgs = {
    userId: Scalars['Int']['input'];
};

export type Query = {
    __typename?: 'Query';
    bye: Scalars['String']['output'];
    hello: Scalars['String']['output'];
    users: Array<User>;
};

export type User = {
    __typename?: 'User';
    email: Scalars['String']['output'];
    id: Scalars['Int']['output'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: 'Query'; hello: string };

export const HelloDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Hello' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'hello' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
/*

export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
    baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
        HelloDocument,
        options
    );
}
export function useHelloLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
        HelloDocument,
        options
    );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<
    HelloQuery,
    HelloQueryVariables
>;
