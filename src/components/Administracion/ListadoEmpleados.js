import React from 'react';

const ListadoEmpleados = () => {
    return (
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
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md">
                            Asignar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ListadoEmpleados;