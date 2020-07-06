import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, gql } from '@apollo/client';
import EliminarDepartamento from './EliminarDepartamento';
import ModificarDepartamento from './ModificarDepartamento';
import { Formik } from 'formik';

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

const MODIFICAR_DPTO = gql`
    mutation updatedepartment($input:DepartmentTypeInputForUpdate!){
        updatedepartment(input: $input) {
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

    //Mutation para modificar dpto
    const [updatedepartment] = useMutation(MODIFICAR_DPTO);


    //States para mensajes de error y confirmacion
    const [departamento, guardarDepartamento] = useState(false);
    const [agregado, guardarAgregado] = useState(false);
    const [modificar, guardarModificar] = useState(false);
    const [mensaje, guardarMensaje] = useState(null);
    const [depto, guardarDepto] = useState({});

    //Funcion para levantar vista de departamento
    const handleClick = () => {
        guardarDepartamento(true);
        guardarModificar(false);
        formik.values.nuevodpto = '';
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

    //Mensaje de Error
    const mostrarMensaje = () => {
        return (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                <p className="font-bold">Error</p>
                <p>{mensaje}</p>
            </div>
        )
    }

    const modificarDpto = (department) => {
        guardarDepto(department);
        guardarDepartamento(false);
        guardarModificar(true);
    }

    //Schema para validar Modificacion
    const schemaValidacion = Yup.object({
        dept_name: Yup.string().required('El nombre del departamento es obligatorio')
    });

    //Para modificar campo nombre departamento
    const handleChange = (e) => {
        guardarDepto({
            id: depto.id,
            __typename: depto.__typename,
            [e.target.name] : e.target.value
        });
    }

    //Modificacion para la BD
    const modificarInfoDpto = async (valores) => {
    
        const { id } = depto;

        try {
            const { data } = await updatedepartment({
                variables: {
                    input: {
                        id,
                        dept_name: valores.dept_name
                    }
                }
            });
            guardarAgregado(true);
            console.log(data);
            setTimeout(() => {
                guardarModificar(false);
                guardarAgregado(false);
                guardarDepartamento(false);
            }, 1000);

        } catch (error) {
            console.log(error);
            if(error.message === 'DepartmentType') {
                guardarMensaje('Ya hay un Departamento con ese Nombre!');   

                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    }

    return (
        <>
            <div className="mt-5 w-2/5">
            <h1 className="py-5 pl-5"><u>Departamentos</u></h1>
                <div className="m-5">
                <h2 className="text-2xl">Listado de Departamentos</h2>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-3 rounded" onClick={handleClick}>
                        Agregar Departamento
                    </button>
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

                                        <ModificarDepartamento 
                                            dpto={dpto}
                                            modificarDpto={modificarDpto}
                                        />

                                        <EliminarDepartamento 
                                            dpto={dpto}
                                        />
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            { departamento ? (
                <div className="mt-5 pl-8 w-1/3">
                    <h1 className="py-5 px-5"><u>Agregar Departamento</u></h1>
                    <form 
                        className="bg-yellow-600 shadow-md rounded py-5 px-5"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block font-semibold block text-white p-2" htmlFor="nuevodpto">
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
                <div className="mt-5 pl-8 w-1/3">
                    <h1 className="py-5 px-5"><u>Modificar Departamento</u></h1>
                    <Formik
                        validationSchema={schemaValidacion}
                        enableReinitialize
                        initialValues = { depto }
                        onSubmit = { (valores) => {
                            modificarInfoDpto(valores);
                        }}
                    >
                        {props => {
                            return (
                                <form 
                                    className="bg-yellow-600 shadow-md rounded py-5 px-5"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block font-semibold block text-white p-2" htmlFor="modifidpto">
                                            Nombre del Departamento
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            id="dept_name"
                                            type="text"
                                            name="dept_name"
                                            placeholder="Nombre Departamento"
                                            onChange={handleChange}
                                            value={props.values.dept_name}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <input 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" 
                                            value="Modificar"    
                                        />
                                    </div>

                                    {mensaje && mostrarMensaje()}

                                    { props.touched.dept_name && props.errors.dept_name  ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.dept_name}</p>
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
                            )
                        }}
                    </Formik>
                    
                </div>
            ) : null}
        </>
        
    );
};

export default Departamentos;