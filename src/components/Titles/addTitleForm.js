import React, { Fragment,useState } from 'react';
import Error from './Error';
import shortid from 'shortid';

const AddTitleForm = ({ crearTitulo }) => {


const [titulo,actualizartitulo] = useState({
    titleName:'',
    fromDate: '',
    toDate:''

});

    const { titleName, fromDate, toDate } = titulo;


    const actualizarState = e => {
        actualizartitulo({
            ...titulo,
            [e.target.name]: e.target.value
        })

    }


    const [error,guardarError]= useState(false);
    
    


    const sumittitulo = e => {
        e.preventDefault();


            if (titleName.trim() === '' || fromDate.trim() === '' || toDate.trim() === '') {
                guardarError(true)

                return;
            }
            
            guardarError(false)


        //agraga id
        titulo.id=shortid();

        crearTitulo(titulo);

        actualizartitulo({
            titleName:'',
            fromDate: '',
            toDate:''
        })

      
    }

    return (
        <Fragment>
            <div class="w-full max-w-xs"     >

                {error ? <Error/> : null}

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    
                >
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Titulo
      </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="titleName"
                            type="text"
                            placeholder="Titulo"
                            onChange={actualizarState}
                            value={titleName} />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="fromdate">
                            Desde cuando
      </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="fromDate"
                            type="date"
                            onChange={actualizarState}
                            value={fromDate} />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="fromdate">
                            hasta cuando
                        </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="toDate"
                            type="date"
                            onChange={actualizarState}
                            value={toDate} />
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

                            onClick={sumittitulo}
                            type="button">
                            Agregar</button>

                    </div>
                </form>

            </div>
        </Fragment>
    )

}

export default AddTitleForm;