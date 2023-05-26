import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { setAccessToken } from 'src/accessToken';
import { useLoginMutation } from 'src/gql/graphql';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                console.log('Form Submitted');
                console.log(email, password);
                const response = await login({
                    variables: {
                        email,
                        password,
                    },
                });

                console.log(response);

                if (response && response.data) {
                    setAccessToken(response.data.login.accessToken);
                }
                navigate('/');
            }}
        >
            <div className="">
                <input
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="">
                <input
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};
