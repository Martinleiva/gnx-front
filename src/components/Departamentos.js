import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, gql } from '@apollo/client';
import Departamento from './Departamento';

const LISTADO_DPTOS = gql`
    query {
        departments{
        id
        dept_name
        }
    }
`;

const NUEVO_DPTO = gql`
    mutation adddepartment($input: DepartmentTypeInput!) {
        adddepartment(input: $input) {
            id
            dept_name
        }
    }
`;

const Departamentos = () => {

    //Obtener dptos de GraphQL
    const { data, loading } = useQuery(LISTADO_DPTOS);

    //Mutation para agregar Departamento
    const [ adddepartment ] = useMutation(NUEVO_DPTO, {
        update(cache, { data: adddepartment }) {
            //Obtener el objeto de cache que queremos actualizar
            const { departments } = cache.readQuery({ query: LISTADO_DPTOS});

            // Reescribimos el cache (el cache nunca se debe modificar)
            cache.writeQuery({
                query: LISTADO_DPTOS,
                data: {
                    departments: [...departments, adddepartment]
                }
            });
        }
    });

    const [departamento, guardarDepartamento] = useState(false);
    const [agregado, guardarAgregado] = useState(false);
    const [modificar, guardarModificar] = useState(false);
    const [mensaje, guardarMensaje] = useState(null);

    const handleClick = () => {
        guardarDepartamento(true);
        guardarModificar(false);
    }

    //Validar Form
    const formik = useFormik({
        initialValues: {
            nuevodpto: ''
        },
        validationSchema: Yup.object({
            nuevodpto: Yup.string().required('El nombre del departamento es obligatorio')
        }),
        onSubmit: async valores => {

            const { nuevodpto } = valores;

            try {
                const { data } = await adddepartment({
                    variables: {
                        input: {
                            dept_name: nuevodpto
                        }
                    }
                });

                guardarAgregado(true);
                
                console.log(data);
                setTimeout(() => {
                    guardarAgregado(false);
                    guardarDepartamento(false);
                    formik.values.nuevodpto = '';
                }, 1000);
                

            } catch (error) {
                
                if(error.message === 'DepartmentType') {
                    guardarMensaje('Ya hay un Departamento con ese Nombre!');   

                    setTimeout(() => {
                        guardarMensaje(null);
                    }, 3000);
                }
            }
        }
    });

    if(loading) return 'Cargando...';

    const mostrarMensaje = () => {
        return (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                <p className="font-bold">Error</p>
                <p>{mensaje}</p>
            </div>
        )
    }

    const modificarDpto = (id) => {
        
        guardarDepartamento(false);
        guardarModificar(true);
    }

    return (
        <>
            <div className="mt-5">
                <h1 className="py-5 pl-8"><u>Listado de Departamentos</u></h1>
                <div className="m-5 pl-5">
                    <table className="table-auto">
                        <thead className="bg-yellow-600">
                            <tr>
                                <th className="px-4 py-2 text-white">Nro</th>
                                <th className="px-4 py-2 text-white">Nombre</th>
                                <th className="px-4 py-2 text-white">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {data.departments.map( (dpto,index) => (

                                <tr key={dpto.id}>
                                    <td className="border px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {dpto.dept_name}
                                    </td>

                                    <td className="border px-4 py-2">                                       
                                        <div className="inline-block pr-4">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => modificarDpto(dpto.id)}>
                                                Modificar
                                            </button>
                                        </div>
                                        <Departamento 
                                            key={dpto.id}
                                            dpto={dpto}
                                            index={index}
                                        />
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    
                    <div className="py-5 text-center">
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                            Agregar Departamento
                        </button>
                    </div>
                </div>
            </div>

            { departamento ? (
                <div className="mt-5 pl-8">
                    <h1 className="py-5 px-5">Agregar Departamento</h1>
                    <form 
                        className="bg-yellow-600 shadow-md rounded py-5 px-5"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block font-semibold block text-white p-2" htmlFor="departamento">
                                Nombre del Departamento
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="nuevodpto"
                                type="text" 
                                placeholder="Nombre Departamento"
                                onChange={formik.handleChange}
                                value={formik.values.nuevodpto}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="text-center">
                            <input 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" 
                                value="Agregar"    
                            />
                        </div>

                        {mensaje && mostrarMensaje()}

                        { formik.touched.nuevodpto && formik.errors.nuevodpto  ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nuevodpto}</p>
                            </div>
                        ) : null
                        }

                        { agregado ? 
                                (
                                    <div className="my-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-2">
                                        <p className="font-bold">Agregado Correctamente!</p>
                                    </div>
                            ) : null
                        }

                    </form>
                </div>
            ) : null}

            { modificar ? (
                <div className="mt-5 pl-8">
                    <h1 className="py-5 px-5">Modificar Departamento</h1>
                    <form 
                        className="bg-yellow-600 shadow-md rounded py-5 px-5"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block font-semibold block text-white p-2" htmlFor="departamento">
                                Nombre del Departamento
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="nuevodpto"
                                type="text" 
                                placeholder="Nombre Departamento"
                                onChange={formik.handleChange}
                                value={formik.values.nuevodpto}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="text-center">
                            <input 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" 
                                value="Agregar"    
                            />
                        </div>

                        {mensaje && mostrarMensaje()}

                        { formik.touched.nuevodpto && formik.errors.nuevodpto  ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nuevodpto}</p>
                            </div>
                        ) : null
                        }

                        { agregado ? 
                                (
                                    <div className="my-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-2">
                                        <p className="font-bold">Agregado Correctamente!</p>
                                    </div>
                            ) : null
                        }

                    </form>
                </div>
            ) : null}
        </>
        
    );
};

export default Departamentos;