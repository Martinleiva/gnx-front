import React, { useState, Fragment } from 'react';
import AddTitleForm from './addTitleForm'

const Titles = () => {

    const [Titulos, guardarTitulos] = useState([]);

    const crearTitulo = titulo => {
        guardarTitulos([
            ...Titulos,
            titulo
        ])
    }

    const onSutmit = id => {

        const eliminados = Titulos.filter(titulo => titulo.id !== id)

        guardarTitulos(eliminados);


    }





    const mensaje = Object.keys(Titulos).length === 0 ? 'No hay titulos' : 'Listado de titulos';

    return (
        <Fragment>
            <div>
                <AddTitleForm
                    crearTitulo={crearTitulo}
                />
            </div>
            <div>
                <h1 className="px-7 text-xl text-center h-10 ">{mensaje}</h1>

             
                    {Titulos.map(title => (
                        <div className="px-2" key={Titulos.id}>
                            <div class="flex -mx-2 text-sm">
                                <div class="w-1/2 px-5 text-center py-3" > Nombre
                                    <div class="bg-gray-400 text-center font-semibold h-12 rounded-t px-4 py-2">{title.titleName}</div>
                                </div>
                                <div class="w-1/2 px-5 text-sm text-center py-3">Desde
                                    <div class="bg-gray-500 text-center h-12 rounded-t px-4 py-2"> {title.fromDate}</div>
                                </div>
                                <div class="w-1/2 px-5 text-sm text-center py-3">Hasta
                                    <div class="bg-gray-400 text-center font-semibold h-12 rounded-t px-4 py-2">  {title.toDate}</div>
                                </div>

                                <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => onSutmit(title.id)}
                                    type="button">Eliminar</button>
                            </div>


                        </div>

                    ))}


            </div>


        </Fragment>
    );
};


export default Titles;


