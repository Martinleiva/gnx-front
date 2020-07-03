import React, { Fragment } from 'react';
//import AddTitleForm from './addTitleForm';
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

    //const [Titulos, guardarTitulos] = useState([]);

    // const crearTitulo = titulo => {
    //     guardarTitulos([
    //         ...Titulos,
    //         titulo
    //     ])
    // }

    // const onSutmit = id => {

    //     const eliminados = Titulos.filter(titulo => titulo.id !== id)

    //     guardarTitulos(eliminados);


    // }

    if (loading) return "Cargando...";
    return (
        <Fragment>
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

                {/* <AddTitleForm
                    crearTitulo={crearTitulo}
                /> */}

                
            </div>
        </Fragment>
    );
};


export default Titles;


