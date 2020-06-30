// 3 - Salaries must have empId, salary, from_date, to_date
import React from "react";

const salarios = [
  {
    id: 0,
    empId: 0,
    salary: 80000,
    from_date: Date.now(),
    to_date: Date.now(),
  },
  {
    id: 1,
    empId: 1,
    salary: 65000,
    from_date: Date.now(),
    to_date: Date.now(),
  },
  {
    id: 2,
    empId: 2,
    salary: 75000,
    from_date: Date.now(),
    to_date: Date.now(),
  },
  {
    id: 3,
    empId: 3,
    salary: 90000,
    from_date: Date.now(),
    to_date: Date.now(),
  },
];

const Salarios = () => {
  return (
    <div>
      {/* //Title */}
      <div>
        <h1>Salarios</h1>
      </div>

      {/* //Table */}
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Id</th>
              <th class="px-4 py-2">empId</th>
              <th class="px-4 py-2">Salario</th>
              <th class="px-4 py-2">From_Date</th>
              <th class="px-4 py-2">To_Date</th>
              <th class="px-4 py-2"> - </th>
              
            </tr>
          </thead>
          <tbody>
            {salarios.map( (salario) => (
                <tr>
                <td class="border px-4 py-2">{ salario.id }</td>
                <td class="border px-4 py-2">{ salario.empId}</td>
                <td class="border px-4 py-2">{ salario.salary }</td>
                <td class="border px-4 py-2">{ salario.from_date }</td>
                <td class="border px-4 py-2">{ salario.to_date }</td>
                <td class="border px-4 py-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button> 
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Emilinar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salarios;
