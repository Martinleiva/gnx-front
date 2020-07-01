import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, gql } from '@apollo/client';

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

    const handleClick = () => {
        guardarDepartamento(true);
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
                }, 2000);
                

            } catch (error) {
                console.log(error);
            }
        }
    });

    if(loading) return 'Cargando...';

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
                                        <div>
                                            <div className="inline-block pr-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Modificar
                                                </button>
                                            </div>
                                            
                                            <div className="inline-block">
                                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    Eliminar
                                                </button>
                                            </div>
                                            
                                        </div>
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
                        <h1 className="py-5 px-5 inline-block">Agregar Departamento</h1>
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

                            { formik.touched.nuevodpto && formik.errors.nuevodpto  ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nuevodpto}</p>
                                </div>
                            ) : null
                            }

                            { agregado ? 
                                    (
                                        <div className="my-2 bg-red-100 border-l-4 border-green-500 text-green-700 p-2">
                                            <p className="font-bold">Agregado!</p>
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