import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const LISTADO_SALARIOS = gql`
    query salaries {
        salaries {
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

const ELIMINAR_SALARIO = gql`
    mutation deletesalary($id: ID!) {
        deletesalary(id: $id) {
            id
        }
    }
`;

const Salario = ({ salario, index }) => {

    const history = useHistory();

    const { id, salary, from_date, to_date, employee } = salario;

    const [deletesalary] = useMutation(ELIMINAR_SALARIO, {
        update(cache) {
            // Obtener copia del objeto cache
            const { salaries } = cache.readQuery({
                query: LISTADO_SALARIOS
            });

            //Reescribir cache
            cache.writeQuery({
                query: LISTADO_SALARIOS,
                data: {
                    salaries: salaries.filter(salarioActual => salarioActual.id !== id)
                }
            });
        }
    });

    //Elimina un Salaio
    const confirmarEliminarSalario = () => {
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
                    const { data } = await deletesalary({
                        variables: {
                            id
                        }
                    });

                    console.log(data);

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        'El Salario fue Eliminado',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Problema!',
                        'Asegurese de haber eliminado toda relación asociada al Salario',
                        'error'
                    )
                }
            }
        })
    }

    const editarSalario = () => {
        history.push(`/editar-salario/${id}`);
    }

    return (
        <tr className="text-center">
            <td className="border px-4 py-2">{ index + 1}</td>
            <td className="border px-4 py-2">{salary}</td>
            <td className="border px-4 py-2">{employee.first_name} {employee.last_name}</td>
            <td className="border px-4 py-2">{from_date}</td>
            <td className="border px-4 py-2">{to_date}</td>
            <td className="border px-4 py-2">
                <div className="inline-block pr-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={() => editarSalario() }>
                    Modificar
                    </button>
                </div>

                <div className="inline-block">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => confirmarEliminarSalario()}>
                    Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Salario;