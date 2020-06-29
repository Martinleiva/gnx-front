import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Departamentos = () => {

    const departamentos = [
        { id: 0, nombre: 'Prueba 0'},
        { id: 1, nombre: 'Prueba 1'},
        { id: 2, nombre: 'Prueba 2'},
        { id: 3, nombre: 'Prueba 3'},
    ]

    const [departamento, guardarDepartamento] = useState(false);

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
        onSubmit: valores => {
            console.log('enviando...');
            console.log(valores);
        }
    });

    return (
        <>
            <div className="mt-5">
                <h1 className="p-5"><u>Listado de Departamentos</u></h1>
                <div className="m-5 pl-5">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {departamentos.map( dpto => (
                                    <tr key={dpto.id}>
                                        <td className="border px-4 py-2">
                                            {dpto.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {dpto.nombre}
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
                            className="bg-yellow-600 shadow-md rounded mt-8 py-5 px-5"
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

                            { formik.touched.nuevodpto && formik.errors.nuevodpto ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nuevodpto}</p>
                                </div>
                            ) : null }

                        </form>
                    </div>
                ) : null}
        </>
        
    );
};

export default Departamentos;