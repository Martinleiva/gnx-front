import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

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

const ELIMINAR_EMPLEADO = gql`
    mutation deleteemployee($id: ID!) {
        deleteemployee(id: $id) {
            id
        }
    }
`;

const Empleado = ({ empleado, index }) => {

    const history = useHistory();

    const [deleteemployee] = useMutation(ELIMINAR_EMPLEADO, {
        update(cache) {
            // Obtener copia del objeto cache
            const { employess } = cache.readQuery({
                query: LISTADO_EMPLEADOS
            });

            //Reescribir cache
            cache.writeQuery({
                query: LISTADO_EMPLEADOS,
                data: {
                    employess: employess.filter(empleadoActual => empleadoActual.id !== id)
                }
            });
        }
    });

    const {id, dni, first_name, last_name, gender, birth_date, hire_date} = empleado;

    //Elimina un Empleado
    const confirmarEliminarEmpleado = () => {
        Swal.fire({
            title: 'Está seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.value) {
                
                try {

                    //Eliminar por ID
                    const { data } = await deleteemployee({
                        variables: {
                            id
                        }
                    });

                    console.log(data);

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        'El Empleado fue Eliminado',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Problema!',
                        'Asegurese de haber eliminado toda relación asociada al Empleado',
                        'error'
                    )
                }
            }
        })
    }

    const editarEmpleado = () => {
        history.push(`/editar-empleado/${id}`);
    }

    return (
        <tr>
            <td className="border px-4 py-2 text-center">{ index + 1}</td>
            <td className="border px-4 py-2">{dni}</td>
            <td className="border px-4 py-2">{first_name} {last_name}</td>
            <td className="border px-4 py-2 text-center">{gender}</td>
            <td className="border px-4 py-2 text-center">{birth_date}</td>
            <td className="border px-4 py-2 text-center">{hire_date}</td>
            <td className="border px-4 py-2 text-center">
                <div className="inline-block pr-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => editarEmpleado() }>
                    Modificar
                    </button>
                </div>

                <div className="inline-block">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => confirmarEliminarEmpleado()}>
                    Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Empleado;