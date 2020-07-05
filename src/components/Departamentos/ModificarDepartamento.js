import React from 'react';
import { gql, useQuery } from '@apollo/client';

const OBTENER_DPTO = gql`
    query department($id: ID!) {
        department(id: $id) {
            id
            dept_name
        }
    }
`;

const ModificarDepartamento = ({ dpto, modificarDpto }) => {

    const { id } = dpto;

    //Consultar para obtener el dpto
    const { data, loading } = useQuery(OBTENER_DPTO, {
        variables: {
            id
        }
    });

    const modificarDpto2 = () => {
        modificarDpto(data.department);
    }

    if(loading) {
        return 'Cargando...';
    }

    return (                                    
        <div className="inline-block pr-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => modificarDpto2()}>
                Modificar
            </button>
        </div>
    );
};

export default ModificarDepartamento;