import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext';


const NuevoProyecto = () => {

    //Obtener desde el state, el formulario desde el context proyectoState
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext; //este context esta disponible en todos lo componentes y podra mostrar el formulario en el aside

    //State para proyecto
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    });
    
    //destructuring
    const { nombre } = proyecto

    //funcion para leer contenido y guardar en State
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //cuando se guarda el proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //validar proyecto
        if (nombre === ''){
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el Form
        guardarProyecto({
            nombre: '',
        })
    }

    //Fn -> Mostrar el formulario al hacer click
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>

            {   (formulario)
                ?(  
                     <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
    
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
    
                    </form>
                )
                
                :null
            }

            {(errorformulario)
                ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
                : null
            }
           
        </Fragment>
     );
}
 
export default NuevoProyecto;