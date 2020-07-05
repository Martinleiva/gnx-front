import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const LISTADO_JEFES = gql`
    query deptManagers {
        deptManagers {
            id
            from_date
            to_date
            employee{
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

const ELIMINAR_JEFE = gql`
    mutation deletedeptManager($id: ID!) {
        deletedeptManager(id: $id) {
            id
        }
    }
`;

const Jefe = ({ jefe, index }) => {

    //const history = useHistory();

    const { id, employee, department, from_date, to_date } = jefe;

    const [deletedeptManager] = useMutation(ELIMINAR_JEFE, {
        update(cache) {
            // Obtener copia del objeto cache
            const { deptManagers } = cache.readQuery({
                query: LISTADO_JEFES
            });

            //Reescribir cache
            cache.writeQuery({
                query: LISTADO_JEFES,
                data: {
                    deptManagers: deptManagers.filter(jefeActual => jefeActual.id !== id)
                }
            });
        }
    });

    //Elimina un Jefe
    const confirmarEliminarJefe = () => {
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
                    const { data } = await deletedeptManager({
                        variables: {
                            id
                        }
                    });

                    console.log(data);

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        'El Jefe de departamento fue Eliminado',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Problema!',
                        'Asegurese de haber eliminado toda relación asociada al Jefe',
                        'error'
                    )
                }
            }
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2 text-center">{ index + 1}</td>
            <td className="border px-4 py-2">{employee.dni}</td>
            <td className="border px-4 py-2">{employee.first_name} {employee.last_name}</td>
            <td className="border px-4 py-2 text-center"><span className="font-bold">{department.dept_name}</span></td>
            <td className="border px-4 py-2 text-center">{from_date}</td>
            <td className="border px-4 py-2 text-center">{to_date}</td>
            <td className="border px-4 py-2 text-center">
                <div className="inline-block pr-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" >
                    Modificar
                    </button>
                </div>

                <div className="inline-block">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => confirmarEliminarJefe()}>
                    Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Jefe;