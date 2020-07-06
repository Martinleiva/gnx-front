// 3 - Salaries must have empId, salary, from_date, to_date
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { Formik } from 'formik';


const SALARY_LIST = gql`
  query {
    salaries{
      id
      salary
      from_date
      to_date
      employee {
        id
        dni
        first_name
        last_name
      }
    }
  }
`;

const SALARY_ADD = gql`
  mutation addsalary($input: SalaryTypeInput!) {
    addsalary(input: $input){
      id
      employee {
        id
        dni
        first_name
        last_name
      }
      salary
      from_date
      to_date
    }
  }
`;

const Salaries = () => {

  // obtener datos del query
  const { data, loading } = useQuery(SALARY_LIST);
  // console.log(data);

  // Mutation para añadir un Salary
  const [ addSalary ] = useMutation( SALARY_ADD, {
    
    update(cache, { data: addSalary }) {
      
      // Obtener el obj de cache que queremos actualizar
      const { salaries } = cache.readQuery({ query: SALARY_LIST });

      // Reescribimos el cache
      cache.writeQuery({
        query: SALARY_LIST,
        data: {
          salaries: [ ...salaries, addSalary ]
        }
      });
    }
  });

  const [ salaries, setSalaries ] = useState({});
  const [ error, setError ] = useState(false);
  const [ message, setMessage ] = useState(null);
  const [ added, setAdded ] = useState(false);

  // const handleChange = (event) => {
  //   setSalaries({
  //     ...salaries,
  //     [event.target.value]: event.target

  //   })
  // }

  // useEffect( () => {

  // })


  // There aren't Salaries
  //const notSalaries = 0;

  if (loading) return "Cargando...";

  return (
    <div className="mt-5 w-4/5">
      <h1 className="py-5 pl-8 text-center"><u>Listado de Salarios</u></h1>
      <div className="m-5 flex justify-center">
        {!data.salaries ? "No cargaste nada wn xd" : (
          <table className="table-auto w-full">
            <thead className="bg-yellow-600">
              <tr>
                <th className="px-4 py-2 text-white">Nro</th>
                <th className="px-4 py-2 text-white">DNI</th>
                <th className="px-4 py-2 text-white">Salario</th>
                <th className="px-4 py-2 text-white">Fecha Desde</th>
                <th className="px-4 py-2 text-white">Fecha Hasta</th>
                <th className="px-4 py-2 text-white">Acciones</th>

              </tr>
            </thead>
            <tbody>
              {data.salaries.map((salary, index) => (
                <tr className="text-center" key={salary.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{salary.dni}</td>
                  <td className="border px-4 py-2">{salary.salary}</td>
                  <td className="border px-4 py-2">{salary.from_date}</td>
                  <td className="border px-4 py-2">{salary.to_date}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md">Modificar</button>
                    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-1 shadow-md">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Salaries;
