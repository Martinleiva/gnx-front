import React, { useState } from 'react';
import '../App.css';
import Error from './err/Error';
import { useQuery } from '@apollo/client';
import gql from "graphql-tag";

const EMPLOYEES_QUERY = gql`
  query {
    employess {
      id
      dni
      first_name
      last_name
    }
  }
`;

const Employees = () => {

    const { data, loading } = useQuery(EMPLOYEES_QUERY);
    
    const [ employees, setEmployees ] = useState({
       id:null, last_name:"", name:""
    });

    const [error, setError] = useState(false);

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

            //save in state
            
            //reset form
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteClick = id => {
        console.log("eliminando", id);
        setEmployees(EMPLOYEES_QUERY.filter((employee) => employee.id !== id));
    }

    //msg error
    const message = EMPLOYEES_QUERY.length === 0 ? "No hay empleados para mostrar" : null;

    if (loading) return "Cargando...";

    return (
      <div className="mt-5 w-4/5">
        <h1 className="py-5 pl-8 text-center"><u>Lista de empleados</u></h1>
        <div className="m-5 flex justify-center">
          {message ? (
            <Error
              typeMsg="Atencion. "
              msg=" Por el momento no hay empleados para mostrar."
            />
          ) : null}
        
        <table className="table-auto w-full">
          <thead className="bg-yellow-600">
            <tr>
              <th className="px-4 py-2 text-white">Nro</th>
              <th className="px-4 py-2 text-white">DNI</th>
              <th className="px-4 py-2 text-white">Apellido/s</th>
              <th className="px-4 py-2 text-white">Nombre/s</th>
              <th className="px-4 py-2 text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.employess.map((employee, index) => (
              <tr className="text-center" key={employee.dni}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{employee.dni}</td>
                <td className="border px-4 py-2">{employee.last_name}</td>
                <td className="border px-4 py-2">{employee.first_name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md"
                    // onClick= {() => editClick()}
                  >
                    Modificar
                  </button>
                  <button
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-1 shadow-md"
                    onClick={() => deleteClick(employee.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <form onSubmit={submitEmployee}>
          {error ? (
            <Error
              typeMsg="Error!. "
              msg="Todos los campos son obligatorios."
            />
          ) : null}
          <div>
            <input
              className="mx-4 bg-gray-200 focus:bg-white p-2"
              type="number"
              name="dni"
              placeholder="DNI"
              onChange={handleChange}
              // value={name}
            />
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

          <button 
            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white border border-green-500 hover:border-transparent rounded border-10px shadow-md mx-4 p-2">
              Crear nuevo empleado
            </button>
          </div>
          
        </form>
      </div>
    );
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
export default Employees;