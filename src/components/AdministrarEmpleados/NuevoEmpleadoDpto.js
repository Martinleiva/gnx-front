import React, { useState } from 'react';
import Select from 'react-select';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';

const LISTADO_EMPLEADOS = gql`
    query employess {
        employess {
            id
            first_name
            last_name
        }
    }
`;

const LISTADO_EMPLEADOS_DPTO = gql`
    query deptEmployess{
        deptEmployess {
            id
            from_date
            to_date
            employee {
                id
                first_name
                last_name
            }
            department {
                id
                dept_name
            }
        }
    }
`;

const OBTENER_DPTO = gql`
    query department($id: ID!) {
        department(id: $id) {
            id
            dept_name
        }
    }
`;

const NUEVO_EMPLEADO_DPTO = gql`
    mutation adddeptEmployee($input: DeptEmployeeInput!) {
        adddeptEmployee(input: $input) {
            id
            from_date
            to_date
            employee {
                id
                dni
                first_name
                last_name
            }
            department {
                id
                dept_name
            }
        }
    }
`;

const NuevoEmpleadoDpto = () => {

    const history = useHistory();
    const { id } = useParams();

    const [empleado, setEmpleado] = useState([]);
    const [mensaje, guardarMensaje] = useState(null);

    //Consultar empleados de la BD
    // eslint-disable-next-line
    const { data, loading, error } = useQuery(LISTADO_EMPLEADOS);

    //Consultar para obtener el dpto
    const { data: dataD, loading: loagingD } = useQuery(OBTENER_DPTO, {
        variables: {
            id
        }
    });

    //Mutation para crear Empleados Dpto
    const [ adddeptEmployee ] = useMutation(NUEVO_EMPLEADO_DPTO, {
        update(cache, { data: { adddeptEmployee }}) {
            //Obtener el objeto de cache que deaseamos actualizar
            const { deptEmployess } = cache.readQuery({ query:  LISTADO_EMPLEADOS_DPTO });

            //Reescribimos el cache (cache nunca se debe modificar direactamente)
            cache.writeQuery({
                query: LISTADO_EMPLEADOS_DPTO,
                data: {
                    deptEmployess: [...deptEmployess, adddeptEmployee]
                }
            });
        }
    });

    const formik = useFormik({
        initialValues: {
            from_date: '',
            to_date: '',
        },
        validationSchema: Yup.object({
            from_date: Yup.date().required('La Fecha Desde es obligatoria'),
            to_date: Yup.date().required('La Fecha Hasta es obligatoria'),
        }),
        onSubmit: async valores => {

            const { from_date, to_date } = valores

            try {
                // eslint-disable-next-line
                const { data } = await adddeptEmployee({
                    variables: {
                        input: {
                            from_date,
                            to_date,
                            employee: {
                                id: empleado.id
                            },
                            department: {
                                id
                            }
                        }
                    }
                });

                Swal.fire(
                    'Empleado Asignado',
                    `El Empleado se asignó al departamento correctamente`,
                    'success'
                );
                history.push('/administrar-empleados');
            } catch (error) {
                guardarMensaje('Debe especificar un Empleado');

                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000);

            }
        }
    });

    const seleccionarEmpleado = (empleados) => {
        setEmpleado(empleados);
    }

    if (loading) return null;

    if (loagingD) return null;

    const { employess } = data;

    const mostrarMensaje = () => {
        return (
            <div className="py-2 px-3 w-full my-3 max-w-sm text-center mx-auto bg-red-300 border-l-4 border-red-500 text-red-700">
                <p>{mensaje}</p>
            </div>
        );
    }

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 text-center"><u>Nuevo Título</u></h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        className="bg-yellow-600 shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Nombre Departamento
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="first_name"
                                type="text"
                                value={dataD.department.dept_name}
                                disabled
                            />

                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">
                                Seleccionar Empleado
                            </label>

                            <Select 
                                options={employess}
                                onChange={(empleado) => seleccionarEmpleado(empleado)}
                                getOptionValue={(empleados) => empleados.id}
                                getOptionLabel={(empleados) => `${empleados.first_name} ${empleados.last_name}`}
                                placeholder='Buscar o Seleccionar Empleado'
                                noOptionsMessage={() => 'No hay resultados'}

                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="from_date">
                                Fecha Desde
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="from_date"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.from_date}
                            />
                        </div>

                        {formik.touched.from_date && formik.errors.from_date ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.from_date}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="to_date">
                                Fecha Hasta
                            </label>

                            <input 
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                id="to_date"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.to_date}
                            />
                        </div>

                        {formik.touched.to_date && formik.errors.to_date ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.to_date}</p>
                            </div>
                        ) : null}

                        <input 
                            type="submit"
                            className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 p-2 uppercase"
                            value="Agregar Empleado"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevoEmpleadoDpto;