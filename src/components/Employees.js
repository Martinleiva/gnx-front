import React, { useState } from 'react';
import '../App.css';
import Error from './err/Error';
import {v4} from 'uuid';

const Employees = () => {

    const [ employees, setEmployees ] = useState({
        last_name:"", name:""
    });

    const [error, setError] = useState(false);

    const EMPLOYEES = [
        { id:"1", last_name:"apellido prueba", name:"nombre prueba" },
        { id:"2", last_name: "apellido prueba", name: "nombre prueba" },
        { id:"3", last_name: "apellido prueba", name: "nombre prueba" }
    ];

    const handleChange = e => {
        setEmployees({
            ...employees,
            [e.target.value]: e.target.name
        })
    }

    const { last_name, name } = employees;

    //click in button save, submit employee
    const submitEmployee = e => {
        e.preventDefault()

        try {
            //validation
            if (last_name.trim() === '' || name.trim() === '') {
                setError(true)
                return;
            }
            //assing id
            EMPLOYEES.id = v4;

            //save in state
            
            //reset form
            
        } catch (error) {
            console.log(error);
        }
    }

    //msg error
    const message = EMPLOYEES.length === 0 ? 'No hay empleados para mostrar' : null;

    return ( 
        <div className = "mt-12 mx-12">
            <div className="uppercase font-bold">
                <h1 className="text-center my-8">Lista de empleados</h1>
                { message ? <Error typeMsg='Atencion. ' msg=' Por el momento no hay empleados para mostrar.' /> : null }
            </div>
            <table className="table-auto">
                <thead >
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Apellido</th>
                        <th className="px-4 py-2">Nombre</th>
                    </tr>
                </thead>
                <tbody>
                {EMPLOYEES.map( employee => (
                    <tr className="text-center">
                        <td className="border px-4 py-2">{employee.id}</td>
                        <td className="border px-4 py-2">{employee.last_name}</td>
                        <td className="border px-4 py-2">{employee.name}</td>
                        <button 
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md"
                            // onClick= {() => editClick()}
                        >
                           - Modificar
                        </button>
                        <button 
                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-1 shadow-md"
                            // onClick={() => deleteClick()}
                            >
                           x Eliminar
                        </button>
                    </tr>
                ))}
                </tbody>
            </table>
            <form onSubmit={submitEmployee}>
                {error ? <Error typeMsg='Error!. ' msg='Todos los campos son obligatorios.' /> : null }
                <button
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mt-6 border-10px mx-2 shadow-md"
                >
                    + Crear nuevo empleado
                </button>
                
                <input 
                    className="mx-4 bg-gray-200 focus:bg-white p-2" 
                    type="text" 
                    name="last_name" 
                    placeholder="Apellido" 
                    onChange={handleChange} 
                    // value={last_name}    
                />
                <input 
                    className="mx-4 bg-gray-200 focus:bg-white p-2"
                    type="text" 
                    name="name" 
                    placeholder="Nombre" 
                    onChange={handleChange}  
                    // value={name}
                />
            </form>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    );
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
export default Employees;