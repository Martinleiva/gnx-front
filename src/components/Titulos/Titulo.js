import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const LISTADO_TITULOS = gql`
    query titles {
        titles {
            id
            title
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

const ELIMINAR_TITULO = gql`
    mutation deletetitle($id: ID!) {
        deletetitle(id: $id) {
            id
        }
    }
`;

const Titulo = ({ titulo, index }) => {

    const history = useHistory();

    const { id, title, from_date, to_date, employee } = titulo;

    const [deletetitle] = useMutation(ELIMINAR_TITULO, {
        update(cache) {
            // Obtener copia del objeto cache
            const { titles } = cache.readQuery({
                query: LISTADO_TITULOS
            });

            //Reescribir cache
            cache.writeQuery({
                query: LISTADO_TITULOS,
                data: {
                    titles: titles.filter(tituloActual => tituloActual.id !== id)
                }
            });
        }
    });

    const confirmarEliminarTitulo = () => {
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
                    // eslint-disable-next-line
                    const { data } = await deletetitle({
                        variables: {
                            id
                        }
                    });

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        'El Título fue Eliminado',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Problema!',
                        'Asegurese de haber eliminado toda relación asociada al Título',
                        'error'
                    )
                }
            }
        })
    }

    const editarTitulo = () => {
        history.push(`/editar-titulo/${id}`);
    }

    return (
        <tr className="text-center">
        <td className="border px-4 py-2">{ index + 1}</td>
        <td className="border px-4 py-2">{title}</td>
        <td className="border px-4 py-2">{employee.first_name} {employee.last_name}</td>
        <td className="border px-4 py-2">{from_date}</td>
        <td className="border px-4 py-2">{to_date}</td>
        <td className="border px-4 py-2">
            <div className="inline-block pr-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => editarTitulo() } >
                Modificar
                </button>
            </div>

            <div className="inline-block">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => confirmarEliminarTitulo()}>
                Eliminar
                </button>
            </div>
        </td>
    </tr>
    );
};

export default Titulo;