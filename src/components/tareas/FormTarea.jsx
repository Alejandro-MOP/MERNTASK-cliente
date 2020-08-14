import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext'; //importamos el context para consumirlo en este componente
import tareaContext from '../../context/Tareas/tareaContext';

const FormTarea = () => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext; 

    //Obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

        //useEffect que detecta si hay una tarea seleccionada
        useEffect( () =>{

            if( tareaseleccionada !== null ){
                guardarTarea(tareaseleccionada)
            } else {
                guardarTarea({
                    nombre: ''
                })
            }

        }, [tareaseleccionada]);

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''

    })

    //extraer el nombre del proyecto
    const { nombre } = tarea;

        //Si no hay proyecto seleccionado
        if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();        

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Condicional para Agregar ó Editar una tarea
        if( tareaseleccionada === null ){
            //agregar la nueva tarea al state de tareas
            /*tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;*///Se remplazan lineas de proyecto por las siguientes a motivo de backend
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //Actualizar tarea existente
            actualizarTarea(tarea);

            //Elimina tarea seleccionada del estate 
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        //reiniciar el Form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">

            <form
                onSubmit={onSubmit}
            >

                <div className="contenedor-input">

                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />

                </div>

                <div className="contenedor-input">
                    
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={ tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />

                </div>

            </form>
            
            {(errortarea)
                ?<p className="mensaje error">El nombre de la tarea es obligatorio</p>
                :null
            }

        </div>
     );
}
 
export default FormTarea;