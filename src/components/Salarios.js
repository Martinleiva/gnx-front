// 3 - Salaries must have empId, salary, from_date, to_date
import React from 'react';
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

  console.log(data);

  // const [salaries, setSalaries] = useState({});
  // const [error, setError] = useState(false);

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
            {data.salaries.map( (salary, index) => (
              <tr className="text-center" key={salary.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">36235123</td>
                <td className="border px-4 py-2">{salary.salary}</td>
                <td className="border px-4 py-2">{salary.from_date}</td>
                <td className="border px-4 py-2">2020-02-09</td>
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
