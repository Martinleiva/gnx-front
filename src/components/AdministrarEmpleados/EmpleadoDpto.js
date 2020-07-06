import React from 'react';

const EmpleadoDpto = ({empleadoDpto, dptoId}) => {
    return (
        <tr className="text-center">
            <td className="border px-4 py-2">{empleadoDpto.employee.first_name} {empleadoDpto.employee.last_name}</td>
            <td className="border px-4 py-2">{empleadoDpto.from_date}</td>
            <td className="border px-4 py-2">{empleadoDpto.to_date}</td>
            <td className="border px-4 py-2">
                <div className="inline-block pr-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    Modificar
                    </button>
                </div>

                <div className="inline-block">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" >
                    Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default EmpleadoDpto;