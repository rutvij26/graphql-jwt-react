import React, { useState } from 'react';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log('Form Submitted');
                console.log(email, password);
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
