import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/Alertas/alertaContext';
import AuthContext from '../../context/Autenticacion/authContext';

const NuevaCuenta = ( props ) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario se haya autenticado o registrado  o sea primer registro
     useEffect( ()=>{

        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        // eslint-disable-next-line
     }, [mensaje, autenticado, props.history]);

    //State para inicio de Sesion
    const [ usuario, guardarUsuario] = useState ({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //Destructuring del state
    const { nombre, email, password, confirmar } = usuario;

    //Funcion para cambiar el state
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    //Cuando el usuario inicia sesion
    const onSubmit = e => {
        e.preventDefault();

        //validación campos vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Pasword minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser minimo de 6 caracteres', 'alerta-error');
            return;
        }

        //Pasword's iguales
        if(password !== confirmar){
            mostrarAlerta('El password debe ser identico', 'alerta-error');
            return;
        }

        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }


    return ( 
        <div className="form-usuario">
            
            {(alerta)
                ?( <div className={ `alerta ${alerta.categoria}` }> { alerta.msg } </div> )
                :null
            }
            
            <div className="contenedor-form sombre-dark">
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                    
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;