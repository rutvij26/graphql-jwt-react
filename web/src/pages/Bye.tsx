import React from 'react';
import { useByeQuery } from 'src/gql/graphql';

export const Bye = () => {
    const { data, error, loading } = useByeQuery({
        fetchPolicy: 'network-only',
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>Error</div>;
    }

    if (!data) {
        return <div>No data</div>;
    }

    return <div>{data.bye}</div>;
};
