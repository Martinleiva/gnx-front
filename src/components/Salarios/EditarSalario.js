import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_SALARIO = gql`
    query salary($id: ID) {
        salary(id: $id) {
            id
            salary
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

const MODIFICAR_SALARIO = gql`
    mutation updatesalary($input: SalaryTypeInputForUpdate!) {
        updatesalary(input: $input) {
            id
            salary
            from_date
            to_date
            employee {
                id
            }
        }
    }
  
`;

const EditarSalario = () => {

    const { id } = useParams();
    const history = useHistory();

    //Consultar para obtener el Salario
    // eslint-disable-next-line
    const { data, loading, error } = useQuery(OBTENER_SALARIO, {
        variables: {
            id
        }
    });

    //Actualizar Empleado
    const [updatesalary] = useMutation(MODIFICAR_SALARIO);

    //Schema de validacion
    const schemaValidacion = Yup.object({
        salary: Yup.number().required('El Salario es obligatorio'),
        from_date: Yup.date().required('La Fecha Desde es obligatoria'),
        to_date: Yup.date().required('La Fecha Hasta es obligatoria'),
    });

    if(loading) return 'Cargando...';

    const { salary } = data;
    console.log(data);

    //Modifica el Salario de la BD
    const actualizarSalario = async (valores) => {
        const { salary, from_date, to_date, employee } = valores;

        try {
            // eslint-disable-next-line
            const { data } = await updatesalary({
                variables: {
                    input: {
                        id,
                        salary,
                        from_date,
                        to_date,
                        employee: {
                            id: employee.id
                        }
                    }
                }
            });

            //Poner alerta
            Swal.fire(
                'Salario Modificado',
                'El Salario se actualizó correctamente',
                'success'
            );
            
            //Redireccionar al usuario
            history.push('/salarios');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 text-center"><u>Modificar Salario</u></h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={schemaValidacion}
                        enableReinitialize
                        initialValues={salary}
                        onSubmit={( valores ) => {
                            actualizarSalario(valores);
                        }}
                    >
                        {props => {
                            return (
                                <form 
                                    className="bg-yellow-600 shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2">
                                            Nombre Empleado
                                        </label>

                                        <input 
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                            id="first_name"
                                            type="text"
                                            value={`${props.values.employee.first_name} ${props.values.employee.last_name}`}
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="dni">
                                            Salario
                                        </label>

                                        <input 
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                            id="salary"
                                            type="number"
                                            placeholder="Salario del Empleado"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.salary}
                                        />
                                    </div>

                                    {props.touched.salary && props.errors.salary ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.salary}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="from_date">
                                            Fecha Desde
                                        </label>

                                        <input 
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700" 
                                            id="from_date"
                                            type="date"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.from_date}
                                        />
                                    </div>

                                    {props.touched.from_date && props.errors.from_date ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.from_date}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.to_date}
                                        />
                                    </div>

                                    {props.touched.to_date && props.errors.to_date ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.to_date}</p>
                                        </div>
                                    ) : null}

                                    <input 
                                        type="submit"
                                        className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 p-2 uppercase"
                                        value="Modificar Salario"
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

export default EditarSalario;