import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { ErrorForm } from '../ui/ErrorForm'
import Logo from '../../assets/logo.png';
import { Credits } from './Credits'
import { startLoadProjects } from '../../actions/projectsActions'
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import QRCode from "react-qr-code";


export const SearchScreen = () => {

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects);

    const [error, setError] = useState();

    const [{cedula}, handleInputChange, reset] = useForm({
        cedula: ''
    });

    const onSearchData = () => {

        if(checkForm()) {
            
            const cliente = projects.find(client => client.cedula === cedula);
            setError(false);

            if(!cliente) {
                Swal.fire("No se ha encontrado el cliente con esa cédula");
            } else {
                let output = `
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Nombre: ${cliente.nombre}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Email: ${cliente.email}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Telefono: ${cliente.telefono}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Dirección: ${cliente.direccion}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Cédula: ${cliente.cedula}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Método de pago: ${cliente.pago}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Cédula: ${cliente.cedula}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <h5 class="mb-1">Remuneración: $${cliente.remuneracion}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="d-flex w-100 justify-content-center">
                            <div id="container-qr">
                            </div>
                        </div>
                    </li>
                `;
        
                Swal.fire({
                    title: "<h3>Datos del cliente</h3>", 
                    html: `<ul class="list-group list-group-flush views-ul">${output}</ul>`,
                    confirmButtonText: "Cerrar",
                    confirmButtonColor: '#35b6b3'
                });
        
                const qr = createRoot(document.getElementById("container-qr"));
                qr.render(
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
                        <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`http://192.168.1.101:5173/cliente/${cliente.id}`}
                        viewBox={"0 0 256 256"}
                        />
                    </div>
                );
            }
        }
    }

    const onOpenPayments = () => {

        const cliente = projects.find(client => client.cedula === cedula);
        setError(false);

        if(!cliente) {
            Swal.fire("No se ha encontrado el cliente con esa cédula");
        } else {
            let output = cliente.historial.map((compra, i) => (
                `
                  <tr>
                    <th scope="row">${i+1}</th>
                    <td>${compra.nombre}</td>
                    <td>${compra.cedula}</td>
                    <td>${compra.moto}</td>
                    <td>${compra.monto}</td>
                    <td>${compra.remuneracion}</td>
                    <td>${compra.fecha.toDate ? compra.fecha.toDate().toLocaleString('es-VE') : compra.fecha.toLocaleString("es-VE")}</td>
                  </tr>
                `
            )) ;
    
            Swal.fire({
                title: "<h3>Datos del cliente</h3>", 
                html: `
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cédula</th>
                            <th scope="col">Modelo de Moto</th>
                            <th scope="col">Monto en $USD</th>
                            <th scope="col">Remuneración</th>
                            <th scope="col">Fecha</th>
                        </tr>
                        </thead>
                        <tbody>
                            ${output.join('')}
                        </tbody>
                    </table>`,
                customClass: 'swal-wide',
                confirmButtonText: "Cerrar",
                confirmButtonColor: '#35b6b3'
            });
        }

    }

    useEffect(() => {
        dispatch(startLoadProjects());
    }, []);
    

    const checkForm = () => {

        if(cedula === '') {
            setError('Ingresa la cédula');
            return false;
        }

        return true;

    }

    return (
        <div className='auth__container search_container'>
        <div className='auth__box'>
            {
                error && 
                <ErrorForm msg={error} />
            }
            <img className='auth__logo' src={Logo} alt='Bera' />
            <h1 className='auth__box-title'>Buscar cliente</h1>
                <input
                    type="text"
                    className="auth__input"
                    name="cedula"
                    placeholder='Número de cédula'
                    onChange={handleInputChange}
                    value={cedula}
                />

                <button className='auth__login-button btn' onClick={() => onSearchData()}><i className="far fa-user"></i> Ver datos y QR</button>
                <button className='auth__login-button btn' onClick={() => onOpenPayments()}><i className="far fa-list"></i> Ver referidos</button>
        </div>
        <Credits />
        </div>
    )
}
