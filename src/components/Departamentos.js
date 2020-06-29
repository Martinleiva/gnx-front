import React from 'react';

const Departamentos = () => {

    const departamentos = [
        { id: 0, nombre: 'Prueba 0'},
        { id: 1, nombre: 'Prueba 1'},
        { id: 2, nombre: 'Prueba 2'},
        { id: 3, nombre: 'Prueba 3'},
    ]

    return (
        <div className="mt-5">
            <h1 className="p-5"><u>Listado de Departamentos</u></h1>
            <div className="m-5 pl-5">
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">Nombre</th>
                            <th class="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {departamentos.map( dpto => (
                                <tr>
                                    <td class="border px-4 py-2">
                                        {dpto.id}
                                    </td>
                                    <td class="border px-4 py-2">
                                        {dpto.nombre}
                                    </td>
                                    <td class="border px-4 py-2">
                                        <div>
                                            <div className="inline-block pr-4">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Modificar
                                                </button>
                                            </div>
                                            
                                            <div className="inline-block">
                                                <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    Eliminar
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </td>
                                </tr>   
                            ))}
                    </tbody>
                </table>
                <div className="py-5">
                    <button class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        Agregar Departamento
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default Departamentos;