import React from 'react';
import {
    BrowserRouter as Router,
    Routes as _Routes,
    Route,
} from 'react-router-dom';
export const Routes: React.FC = () => {
    return (
        <Router>
            <_Routes>
                <Route path="/" element={<div>hi</div>} />
            </_Routes>
        </Router>
    );
};
