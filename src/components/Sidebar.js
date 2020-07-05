import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";

import Inicio from './Inicio';

//Empleados
import Empleados from './Empleados/Empleados';
import NuevoEmpleado from './Empleados/NuevoEmpleado';
import EditarEmpleado from './Empleados/EditarEmpleado';

//Salarios
import Salarios from './Salarios/Salarios';
import NuevoSalario from './Salarios/NuevoSalario';
import EditarSalario from './Salarios/EditarSalario';

//Titulos
import Titulos from './Titulos/Titulos';
import NuevoTitulo from './Titulos/NuevoTitulo';
import EditarTitulo from './Titulos/EditarTitulo';

//Departamentos
import Departamentos from './Departamentos/Departamentos';

//Administrar
import Administrar from './Administracion/Administrar';

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Inicio />
  },
  {
    path: "/empleados",
    main: () => <Empleados />,
  },
  {
    path: "/nuevo-empleado",
    main: () => <NuevoEmpleado />
  },
  {
    path: "/editar-empleado/:id",
    main: () => <EditarEmpleado />
  },
  {
    path: "/salarios",
    main: () => <Salarios />
  },
  {
    path: "/nuevo-salario",
    main: () => <NuevoSalario />
  },
  {
    path: "/editar-salario/:id",
    main: () => <EditarSalario />
  },
  {
    path: "/titulos",
    main: () => <Titulos />
  },
  {
    path: "/nuevo-titulo",
    main: () => <NuevoTitulo />
  },
  {
    path: "/editar-titulo/:id",
    main: () => <EditarTitulo />
  },
  {
    path: "/departamentos",
    main: () => <Departamentos />
  },
  {
    path: "/administrar",
    main: () => <Administrar />
  }
];

const Sidebar = () => {

    return (
        <Router>
            <aside className="bg-yellow-600 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
                <nav className="mt-5 list-none">
                    <NavLink to="/" className="font-semibold block text-white p-2">Inicio</NavLink>
                    <NavLink to="/empleados" className="font-semibold text-white block p-2" activeClassName="bg-yellow-700">Empleados</NavLink>
                    <NavLink to="/salarios" className="font-semibold text-white block p-2" activeClassName="bg-yellow-700">Salarios</NavLink>
                    <NavLink to="/titulos" className="font-semibold text-white block p-2" activeClassName="bg-yellow-700">Titulos</NavLink>
                    <NavLink to="/departamentos" className="font-semibold text-white block p-2" activeClassName="bg-yellow-700">Departamentos</NavLink>
                    <NavLink to="/administrar" className="font-semibold text-white block p-2" activeClassName="bg-yellow-700">Administrar Jefes</NavLink>
                </nav>
            </aside>

            <Switch>
                {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        className={route.path}
                        exact={route.exact}
                        children={<route.main />}
                    />
                ))}
            </Switch>
        </Router>
    );
};

export default Sidebar;