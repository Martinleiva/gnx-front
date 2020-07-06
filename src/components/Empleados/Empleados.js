import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Empleado from './Empleado';

const LISTADO_EMPLEADOS = gql`
    query employess {
        employess {
            id
            dni
            first_name
            last_name
            gender
            birth_date
            hire_date
        }
    }
`;

const Empleados = () => {

    // eslint-disable-next-line
    const { data, loading, error} = useQuery(LISTADO_EMPLEADOS);

    if(loading) return 'Cargando...';

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 pl-8 text-center"><u>Empleados</u></h1>
                
            <div className="m-5">
                <h2 className="text-2xl">Listado de Empleados</h2>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-3 rounded">
                    <Link to="/nuevo-empleado">Agregar Nuevo Empleado</Link>
                </button>
                <table className="table-auto w-full">
                    <thead className="bg-yellow-600">
                        <tr>
                            <th className="px-4 py-2 text-white">Nro</th>
                            <th className="px-4 py-2 text-white">DNI</th>
                            <th className="px-4 py-2 text-white">Nombre</th>
                            <th className="px-4 py-2 text-white">Género</th>
                            <th className="px-4 py-2 text-white">Nacimiento</th>
                            <th className="px-4 py-2 text-white">Contratación</th>
                            <th className="px-4 py-2 text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.employess.map((empleado, index) => (
                        <Empleado 
                            key={empleado.id}
                            empleado={empleado}
                            index={index}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default Empleados;