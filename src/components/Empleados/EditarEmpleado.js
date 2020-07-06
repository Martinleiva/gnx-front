import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_EMPLEADO = gql`
    query employee($id: ID) {
        employee(id: $id) {
            dni
            first_name
            last_name
            gender
            birth_date
            hire_date
        }
    }
`;

const MODIFICAR_EMPLEADO = gql`
    mutation updateemployee($input: EmployeeTypeInputForUpdate!) {
        updateemployee(input: $input) { 
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

const EditarEmpleado = () => {

    const { id } = useParams();
    const history = useHistory();

    //Consultar para obtener el Empleado
    // eslint-disable-next-line
    const { data, loading, error } = useQuery(OBTENER_EMPLEADO, {
        variables: {
            id
        }
    });

    //Actualizar Empleado
    const [updateemployee] = useMutation(MODIFICAR_EMPLEADO);

    //Schema de validacion
    const schemaValidacion = Yup.object({
        dni: Yup.string().required('El DNI es obligatorio'),
        first_name: Yup.string().required('El Nombre es obligatorio'),
        last_name: Yup.string().required('El Apellido es obligatorio'),
        gender: Yup.string().required('El Género es obligatorio'),
        birth_date: Yup.date().required('La Fecha de Nacimiento es obligatoria'),
        hire_date: Yup.date().required('La Fecha de Contratación es obligatoria'),
    });

    if(loading) return 'Cargando...';

    const { employee } = data;

    //Modifica el empleado de la BD
    const actualizarEmpleado = async (valores) => {
        const { dni, first_name, last_name, gender, birth_date, hire_date } = valores;

        try {
            // eslint-disable-next-line
            const { data } = await updateemployee({
                variables: {
                    input: {
                        id,
                        dni,
                        first_name,
                        last_name,
                        gender,
                        birth_date,
                        hire_date
                    }
                }
            });

            //Poner alerta
            Swal.fire(
                'Empleado Modificado',
                'El Empleado se actualizó correctamente',
                'success'
            );
            
            //Redireccionar al usuario
            history.push('/empleados');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 text-center"><u>Modificar Empleado</u></h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={schemaValidacion}
                        enableReinitialize
                        initialValues={employee}
                        onSubmit={( valores ) => {
                            actualizarEmpleado(valores);
                        }}
                    >
                        {props => {
                            return (
                                <form 
                                    className="bg-yellow-600 shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.dni}
                                        />
                                    </div>

                                        {props.touched.dni && props.errors.dni ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.dni}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.first_name}
                                        />
                                    </div>

                                    {props.touched.first_name && props.errors.first_name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.first_name}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.last_name}
                                        />
                                    </div>

                                    {props.touched.last_name && props.errors.last_name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.last_name}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="gender">
                                            Género
                                        </label>

                                        <select 
                                            id="gender" 
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.gender} 
                                        >
                                            <option value="">-Seleccionar-</option>
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                        </select>
                                    </div>

                                    {props.touched.gender && props.errors.gender ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.gender}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.birth_date}
                                        />
                                    </div>

                                    {props.touched.birth_date && props.errors.birth_date ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.birth_date}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.hire_date}
                                        />
                                    </div>

                                    {props.touched.hire_date && props.errors.hire_date ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.hire_date}</p>
                                        </div>
                                    ) : null}

                                    <input 
                                        type="submit"
                                        className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 p-2 uppercase"
                                        value="Modificar Empleado"
                                    />
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditarEmpleado;