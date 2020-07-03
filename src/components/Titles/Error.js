import React from 'react'

const Error = () => {

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Todos los campos son obligatorios!</strong>
    
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            </span>
        </div>
    );
}

export default Error;