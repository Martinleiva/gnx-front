import React, { useState } from 'react';
import '../App.css';
import Error from './err/Error';
import { useQuery } from '@apollo/react-hooks';
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
      <div className="mt-12 mx-12">
        <div className="uppercase font-bold">
          <h1 className="text-center my-8">Lista de empleados</h1>
          {message ? (
            <Error
              typeMsg="Atencion. "
              msg=" Por el momento no hay empleados para mostrar."
            />
          ) : null}
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">DNI</th>
              <th className="px-4 py-2">APELLIDO/S</th>
              <th className="px-4 py-2">NOMBRE/S</th>
            </tr>
          </thead>
          <tbody>
            {data.employess.map((employee) => (
              <tr className="text-center">
                <td className="border px-4 py-2">{employee.dni}</td>
                <td className="border px-4 py-2">{employee.first_name}</td>
                <td className="border px-4 py-2">{employee.last_name}</td>
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md"
                  // onClick= {() => editClick()}
                >
                  - Modificar
                </button>
                <button
                  className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-1 shadow-md"
                  onClick={() => deleteClick(employee.id)}
                >
                  x Eliminar
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={submitEmployee}>
          {error ? (
            <Error
              typeMsg="Error!. "
              msg="Todos los campos son obligatorios."
            />
          ) : null}
          <div>
            <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mt-6 border-10px mx-2 shadow-md">
              + Crear nuevo empleado
            </button>

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
          </div>
        </form>
      </div>
    );
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
export default Employees;