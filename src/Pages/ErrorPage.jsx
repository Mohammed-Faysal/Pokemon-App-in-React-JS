import React from 'react';

const ErrorPage = () => {
    return (
        <div className='w-full m-auto mt-32'>
            <h1 className='text-8xl font-bold text-center'>404</h1>
            <p className='text-xl text-red-600 italic mt-8 text-center'>The page you are looking for does not exist or has been moved.</p>
        </div>
    );
};

export default ErrorPage;