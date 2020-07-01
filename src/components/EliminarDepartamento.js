import React from 'react';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const LISTADO_DPTOS = gql`
    query {
        departments{
        id
        dept_name
        }
    }
`;

const ELIMINAR_DPTO = gql`
    mutation deletedepartment($id: ID!) {
        deletedepartment(id: $id) {
            id
            dept_name
        }
    }
`;

const EliminarDepartamento = ({ dpto, index }) => {

    const { id } = dpto;

    //Mutation para eliminar dpto
    const [deletedepartment] = useMutation(ELIMINAR_DPTO, {
        update(cache) {
            //Obtener una copia del objeto de cache
            const { departments } = cache.readQuery({ query: LISTADO_DPTOS });

            //Reescribir el cache
            cache.writeQuery({
                query: LISTADO_DPTOS,
                data: {
                    departments: departments.filter( 
                        dptoActual => dptoActual.id !== id 
                    )
                }
            });
        }
    });

    const eliminarDpto = (id) => {
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
                    const { data } = await deletedepartment({
                        variables: {
                            id
                        }
                    });

                    console.log(data);

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        'El Departamento fue Eliminado',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    return (

        <div className="inline-block">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => eliminarDpto(id)}>
                Eliminar
            </button>
        </div>
    );
};

export default EliminarDepartamento;