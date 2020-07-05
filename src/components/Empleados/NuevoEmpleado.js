import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

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

const NUEVO_EMPLEADO = gql`
    mutation addemployee($input: EmployeeTypeInput!) {
        addemployee(input: $input) {
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

const NuevoEmpleado = () => {

    const history = useHistory();

    //Mensaje de la BD
    const [mensaje, guardarMensaje] = useState(null);

    //Mutation para crear Empleados
    const [ addemployee ] = useMutation(NUEVO_EMPLEADO, {
        update(cache, { data: { addemployee }}) {
            //Obtener el objeto de cache que deaseamos actualizar
            const { employess } = cache.readQuery({ query:  LISTADO_EMPLEADOS });

            //Reescribimos el cache (cache nunca se debe modificar direactamente)
            cache.writeQuery({
                query: LISTADO_EMPLEADOS,
                data: {
                    employess: [...employess, addemployee]
                }
            });
        }
    });

    const formik = useFormik({
        initialValues: {
            dni: '',
            first_name: '',
            last_name: '',
            gender: '',
            birth_date: '',
            hire_date: ''
        },
        validationSchema: Yup.object({
            dni: Yup.string().required('El DNI es obligatorio'),
            first_name: Yup.string().required('El Nombre es obligatorio'),
            last_name: Yup.string().required('El Apellido es obligatorio'),
            gender: Yup.string().required('El Género es obligatorio'),
            birth_date: Yup.date().required('La Fecha de Nacimiento es obligatoria'),
            hire_date: Yup.date().required('La Fecha de Contratación es obligatoria'),
        }),
        onSubmit: async valores => {

            const { dni, first_name, last_name, gender, birth_date, hire_date } = valores;

            try {
                // eslint-disable-next-line
                const { data } = await addemployee({
                    variables: {
                        input: {
                            dni,
                            first_name,
                            last_name,
                            gender,
                            birth_date,
                            hire_date
                        }
                    }
                });

                Swal.fire(
                    'Empleado Agregado',
                    'El Empleado se agregó correctamente',
                    'success'
                );
                history.push('/empleados');
                
            } catch (error) {
                console.log(error);
                if(error.message === 'EmployeeType') {
                    guardarMensaje('Ese Empleado ya está registrado');

                    setTimeout(() => {
                        guardarMensaje(null)
                    }, 3000);
                }
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="py-2 px-3 w-full my-3 max-w-sm text-center mx-auto bg-red-300 border-l-4 border-red-500 text-red-700">
                <p>{mensaje}</p>
            </div>
        );
    }

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 text-center"><u>Nuevo Empleado</u></h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        className="bg-yellow-600 shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="dni">
                                DNI
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="dni"
                                type="text"
                                placeholder="DNI Empleado"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dni}
                            />
                        </div>

                        {formik.touched.dni && formik.errors.dni ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.dni}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="first_name">
                                Nombre/s
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="first_name"
                                type="text"
                                placeholder="Nombre/s Empleado"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                            />
                        </div>

                        {formik.touched.first_name && formik.errors.first_name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.first_name}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="last_name">
                                Apellidos/s
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="last_name"
                                type="text"
                                placeholder="Apellido/s Empleado"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name}
                            />
                        </div>

                        {formik.touched.last_name && formik.errors.last_name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.last_name}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="gender">
                                Género
                            </label>

                            <select 
                                id="gender" 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender} 
                            >
                                <option value="">-Seleccionar-</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>

                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.gender}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="birth_date">
                                Fecha de Nacimiento
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="birth_date"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.birth_date}
                            />
                        </div>

                        {formik.touched.birth_date && formik.errors.birth_date ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.birth_date}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="hire_date">
                                Fecha de Contratación
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="hire_date"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hire_date}
                            />
                        </div>

                        {formik.touched.hire_date && formik.errors.hire_date ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.hire_date}</p>
                            </div>
                        ) : null}

                        <input 
                            type="submit"
                            className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 p-2 uppercase"
                            value="Crear Empleado"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevoEmpleado;