import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import EmpleadoDpto from './EmpleadoDpto';

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

const ListadoEmpleadosDpto = ({departamento}) => {

    const { id } = departamento;

    // eslint-disable-next-line
    const { data, loading, error} = useQuery(LISTADO_EMPLEADOS_DPTO);

    if (loading) return 'Cargando...';

    return (
        <>
        <h2 className="text-xl mb-2">Empleados de <span className="text-blue-700 font-bold">{departamento.dept_name}</span></h2>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-3 rounded">
            <Link to={`/nuevo-empleado-dpto/${id}`}>Agregar Empleado</Link>
        </button>
        <table className="table-auto w-full">
            <thead className="bg-yellow-600">
                <tr>
                    <th className="px-4 py-2 text-white">Empleado</th>
                    <th className="px-4 py-2 text-white">Desde</th>
                    <th className="px-4 py-2 text-white">Hasta</th>
                    <th className="px-4 py-2 text-white">Acciones</th>
                </tr>
            </thead>
            <tbody>
                
                {// eslint-disable-next-line
                data.deptEmployess.map((empleadoDpto) => {
                    if (empleadoDpto.department.id === id) {
                        return (
                            <EmpleadoDpto 
                                key={empleadoDpto.id}
                                empleadoDpto={empleadoDpto}
                                dptoId={id}
                            />
                        );
                    }
                })}
                
            </tbody>
        </table>
        </>
    );
};

export default ListadoEmpleadosDpto;