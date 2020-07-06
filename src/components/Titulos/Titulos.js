import React from 'react';
import Hero from '../../assets/Hero.gif';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Titulo from './Titulo';

const LISTADO_TITULOS = gql`
    query titles {
        titles {
            id
            title
            from_date
            to_date
            employee {
                id
                first_name
                last_name
            }
        }
    }
`;

const Titulos = () => {

    // eslint-disable-next-line
    const { data, loading, error} = useQuery(LISTADO_TITULOS);

    if(loading) return 'Cargando...';

    return (
        <>
            {data ? (
                <div className="mt-5 w-4/5">
                    <h1 className="py-5 pl-8 text-center"><u>Títulos</u></h1>
                        
                    <div className="m-5">
                        <h2 className="text-2xl">Listado de Títulos de Empleados</h2>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-3 rounded">
                            <Link to="/nuevo-titulo">Agregar Título</Link>
                        </button>
                        <table className="table-auto w-full">
                            <thead className="bg-yellow-600">
                                <tr>
                                    <th className="px-4 py-2 text-white">Nro</th>
                                    <th className="px-4 py-2 text-white">Título</th>
                                    <th className="px-4 py-2 text-white">Empleado</th>
                                    <th className="px-4 py-2 text-white">Desde</th>
                                    <th className="px-4 py-2 text-white">Hasta</th>
                                    <th className="px-4 py-2 text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.titles.map((titulo, index) => (
                                <Titulo 
                                    key={titulo.id}
                                    titulo={titulo}
                                    index={index}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="mt-5 w-4/5">
                    <h1 className="py-5 pl-8 text-center"><u>Títulos</u></h1>
                    <h1 className="pl-8 text-center text-blue-700">Asegurarse de estar conectado con el servidor!</h1>
                    <div className="flex justify-center">
                        <img src={Hero} alt="Hero" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Titulos;