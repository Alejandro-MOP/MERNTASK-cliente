import React,{ useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/Proyectos/proyectoContext'; //importamos el context para consumirlo en este componente
import AlertaContext from '../../context/Alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {
   
    //Obtener desde el state , los proyectos desde el context proyectoState
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext; //este context esta disponible en todos lo componentes y podra mostrar el formulario en el aside
    
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta  } = alertaContext;

        //Obtener proyectos cuando carga el componente
        useEffect(() => {

            //Si existe un error
            if(mensaje){

                mostrarAlerta(mensaje.msg, mensaje.categoria);
            }

            obtenerProyectos();
            //eslint-disable-next-line
        }, [mensaje])
    

        //revisar si tiene contenido proyectos
        if(proyectos.length === 0) return <p>No hay proyectos, crea uno nuevo</p>;

    

    return ( 

        <ul className="listado-proyectos">

            {(alerta)
                ? ( <div className={ `alerta ${alerta.categoria}` }>{ alerta.msg }</div> )
                : null
            }

            <TransitionGroup>

                {proyectos.map(proyecto =>(
                
                    <CSSTransition
                        key={proyecto._id}
                        timeout={800}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />

                    </CSSTransition>

                ))}

            </TransitionGroup>

        </ul>
     );
}
 
export default ListadoProyectos;