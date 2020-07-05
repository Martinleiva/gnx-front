import React, { useState } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import ListadoEmpleadosDpto from './ListadoEmpleadosDpto';

const LISTADO_DPTOS = gql`
    query {
        departments{
            id
            dept_name
        }
    }
`;

const AdministrarEmpleados = () => {

    const [departamento, setDepartamento] = useState([]);
    const [listado, setListado] = useState(false);

    // eslint-disable-next-line
    const { data, loading, error } = useQuery(LISTADO_DPTOS);

    const seleccionarDepartamento = (departamentos) => {
        setDepartamento(departamentos);
        setListado(true);
    }

    if (loading) return null;

    const { departments } = data;

    return (
        <div className="mt-5 w-4/5">
            <h1 className="py-5 pl-8 text-center"><u>Administrar Empleados</u></h1>

            <div className="m-5">
                <h2 className="text-2xl mb-2">Seleccionar Departamento</h2>
                <div className="mb-4">
                    <Select 
                        options={departments}
                        onChange={(department) => seleccionarDepartamento(department)}
                        getOptionValue={(departamentos) => departamentos.id}
                        getOptionLabel={(departamentos) => departamentos.dept_name}
                        placeholder='Buscar o Seleccionar Departamento'
                        noOptionsMessage={() => 'No hay resultados'}
                    />
                </div>

                { listado ? (
                    <ListadoEmpleadosDpto
                        departamento={departamento}
                    />
                ) : null}

            </div>
        </div>
    );
};

export default AdministrarEmpleados;