import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { getAccessToken } from './accessToken';
import { setContext } from '@apollo/client/link/context';
import App from './App';

const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    const accessToken = getAccessToken();

    return {
        headers: {
            ...headers,
            authorization: accessToken ? `bearer ${accessToken}` : '',
        },
    };
});

const client = new ApolloClient({
    // uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    // credentials: 'include',
    link: authLink.concat(link),
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
