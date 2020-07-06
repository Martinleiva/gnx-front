import React from 'react';
import Hero2 from '../assets/Hero2.gif';

const Inicio = () => {
    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 pl-8 text-center text-blue-700 text-opacity-100"><u>Practica Front con Apollo Client y GNX</u></h1>

            <div className="flex justify-center border-2 border-blue-700 mx-5 my-4">
                <img src={Hero2} alt="Hero2" />
            </div>
        </div>
    );
};

export default Inicio;