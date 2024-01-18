import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
                <p className="text-gray-600">Sorry, the page you are looking for might be in another castle.</p>
                <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Back to Home</Link>
            </div>
        </div>
    );
};



export default React.memo(Page404);
