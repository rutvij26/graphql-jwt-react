import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRegisterMutation } from 'src/gql/graphql';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                console.log('Form Submitted');
                console.log(email, password);
                const response = await register({
                    variables: {
                        email,
                        password,
                    },
                });

                console.log(response);
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
            <button type="submit">Register</button>
        </form>
    );
};
