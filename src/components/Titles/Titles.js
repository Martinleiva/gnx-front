import React, { useState, Fragment } from 'react';
import AddTitleForm from './addTitleForm';
import { useQuery } from '@apollo/client';
import gql from "graphql-tag";

const TITLES_QUERY = gql`
    query {
        titles {
            id
            title
            from_date
            to_date
        }
    }
`;

const Titles = () => {

    const { data, loading } = useQuery(TITLES_QUERY);

    console.log(data);

    const [Titulos, guardarTitulos] = useState([]);

    const crearTitulo = titulo => {
        guardarTitulos([
            ...Titulos,
            titulo
        ])
    }

    const onSutmit = id => {

        const eliminados = Titulos.filter(titulo => titulo.id !== id)

        guardarTitulos(eliminados);


    }

    if (loading) return "Cargando...";
    return (
        <Fragment>
            {/* <div>
                <AddTitleForm
                    crearTitulo={crearTitulo}
                />
            </div>
            <div>
                <h1 className="px-7 text-xl text-center h-10 ">{mensaje}</h1>

             
                {Titulos.map(title => (
                    <div className="px-2" key={Titulos.id}>
                        <div className="flex -mx-2 text-sm">
                            <div className="w-1/2 px-5 text-center py-3" > Nombre
                                <div className="bg-gray-400 text-center font-semibold h-12 rounded-t px-4 py-2">{title.titleName}</div>
                            </div>
                            <div className="w-1/2 px-5 text-sm text-center py-3">Desde
                                <div className="bg-gray-500 text-center h-12 rounded-t px-4 py-2"> {title.fromDate}</div>
                            </div>
                            <div className="w-1/2 px-5 text-sm text-center py-3">Hasta
                                <div className="bg-gray-400 text-center font-semibold h-12 rounded-t px-4 py-2">  {title.toDate}</div>
                            </div>

                            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => onSutmit(title.id)}
                                type="button">Eliminar</button>
                        </div>


                    </div>
                ))}
            </div> */}
            <div className="mt-5 w-4/5">
                <h1 className="py-5 pl-8 text-center"><u>Listado de Titulos</u></h1>
                <div className="m-5 flex justify-center">
                    <table className="table-auto w-full">
                        <thead className="bg-yellow-600">
                            <tr>
                                <th className="px-4 py-2 text-white">Nro</th>
                                <th className="px-4 py-2 text-white">Titulo</th>
                                <th className="px-4 py-2 text-white">Fecha Desde</th>
                                <th className="px-4 py-2 text-white">Fecha Hasta</th>
                                <th className="px-4 py-2 text-white">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                        {data.titles.map((title, index) => (
                            <tr className="text-center" key={title.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{title.title}</td>
                                <td className="border px-4 py-2">{title.from_date}</td>
                                <td className="border px-4 py-2">{title.to_date}</td>
                                <td className="border px-4 py-2">
                                <button
                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md"
                                >
                                    Modificar
                                </button>
                                <button
                                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-1 shadow-md"
                                >
                                    Eliminar
                                </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <AddTitleForm
                    crearTitulo={crearTitulo}
                />

                
            </div>
        </Fragment>
    );
};


export default Titles;


