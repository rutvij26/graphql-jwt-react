import React from 'react';
import {
    BrowserRouter as Router,
    Routes as _Routes,
    Route,
    Link,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Bye } from './pages/Bye';

export const Routes: React.FC = () => {
    return (
        <Router>
            <header>
                <div className="">
                    <Link to="/"> home</Link>
                </div>
                <div className="">
                    <Link to="/register"> register</Link>
                </div>
                <div className="">
                    <Link to="/login"> login</Link>
                </div>
                <div className="">
                    <Link to="/bye"> bye</Link>
                </div>
            </header>
            <_Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/bye" element={<Bye />} />
            </_Routes>
        </Router>
    );
};
