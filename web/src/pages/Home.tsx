import React from 'react';
import { useUsersQuery } from 'src/gql/graphql';

export const Home: React.FC = () => {
    const { data } = useUsersQuery({ fetchPolicy: 'network-only' });

    if (!data) {
        return <div>loading</div>;
    }

    return (
        <div>
            <div className="">users:</div>
            <ul>
                {data.users.map((user) => (
                    <li key={user.id}>
                        {user.email}, {user.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};
