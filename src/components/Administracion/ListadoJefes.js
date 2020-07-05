import React, { useState } from 'react';
import ListadoEmpleados from './ListadoEmpleados';

const ListadoJefes = () => {

    const [listadoempleados, guardarListadoEmpleados] = useState(false);

    const handleListadoEmpleados = () => {
        guardarListadoEmpleados(true);
    }

    return (
        <>
            <h2 className="py-5 pl-8 text-2xl">Listado de Jefes</h2>
            <div className="m-5">
                <table className="table-auto w-full">
                    <thead className="bg-yellow-600">
                        <tr>
                            <th className="px-4 py-2 text-white">Nro</th>
                            <th className="px-4 py-2 text-white">Departamento</th>
                            <th className="px-4 py-2 text-white">DNI</th>
                            <th className="px-4 py-2 text-white">Apellido/s</th>
                            <th className="px-4 py-2 text-white">Nombre/s</th>
                            <th className="px-4 py-2 text-white">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2 font-bold">Ingenieria</td>
                            <td className="border px-4 py-2">36844431</td>
                            <td className="border px-4 py-2">Leiva Ceballos</td>
                            <td className="border px-4 py-2">Matías Martín</td>
                            <td className="border px-4 py-2">
                                <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ml-6 mr-6 shadow-md" onClick={handleListadoEmpleados}>
                                    Asignar Nuevo Jefe
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {listadoempleados ? (
                <ListadoEmpleados />
            ) : null}
        </>
    );
};

export default ListadoJefes;