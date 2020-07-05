import React from 'react';
import ListadoJefes from './ListadoJefes';

const Administrar = () => {

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 pl-8 text-center"><u>Administrar Jefes</u></h1>
                
            <ListadoJefes />
            
        </div>
    );
};

export default Administrar;