// 3 - Salaries must have empId, salary, from_date, to_date
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const SALARY_LIST = gql`
  query {
    salaries {
      id
      employee {
        id
        dni
      }
      salary
      from_date
      to_date
    }
  }
`;

const Salaries = () => {

  const { data, loading } = useQuery(SALARY_LIST);

  const [salaries, setSalaries] = useState({});
  const [error, setError] = useState(false);

  // const handleChange = (event) => {
  //   setSalaries({
  //     ...salaries,
  //     [event.target.value]: event.target

  //   })
  // }

  // useEffect( () => {

  // })
  

  // There aren't Salaries
  const notSalaries = 0;

  if (loading) return "Cargando...";

  return (
    <div className="">

      <h1>Salaries xd</h1>

      {!data.salaries ? "No cargaste nada wn xd" : (<table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Id</th>
          <th className="px-4 py-2">Emp DNI</th>
          <th className="px-4 py-2">Salary U$D</th>
          <th className="px-4 py-2">From_Date</th>
          <th className="px-4 py-2">To_Date</th>
          <th className="px-4 py-2"> - </th>

        </tr>
      </thead>
      <tbody>
        {data.salaries.map( (salary) => (
          <tr>
            <td className="border px-4 py-2">{salary.id}</td>
            <td className="border px-4 py-2">{salary.employee.dni}</td>
            <td className="border px-4 py-2">{salary.salary}</td>
            <td className="border px-4 py-2">{salary.from_date}</td>
            <td className="border px-4 py-2">{salary.to_date}</td>
            <td className="border px-4 py-2">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 mr-6 shadow-md">Edit</button>
              <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-1 shadow-md">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>)}
    

      


    </div>
  );
};

export default Salaries;
