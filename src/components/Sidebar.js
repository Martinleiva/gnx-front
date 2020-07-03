import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";
import Departamentos from './Departamentos';
import Titles from './Titles/Titles';
  
  const routes = [
    {
      path: "/",
      exact: true,
      main: () => <></>
    },
    {
      path: "/empleados",
      main: () => <></>
    },
    {
      path: "/salarios",
      main: () => <></>
    },
    {
      path: "/titulos",
      main: () => <Titles/>
    },
    {
      path: "/departamentos",
      main: () => <Departamentos />
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
                </nav>
            </aside>

            <Switch>
                {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.main />}
                    />
                ))}
            </Switch>
        </Router>
    );
};

export default Sidebar;