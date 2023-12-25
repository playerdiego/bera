import { getAuth } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { db } from '../../firesbase/firebase-config'
import { swalConfirm } from '../../helpers/swalConfirm'
import { startDeleteProject, startPayRemuneration } from '../../actions/projectsActions'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { createRoot } from 'react-dom/client';

export const ProjectBox = ({
    nombre, 
    email, 
    telefono, 
    direccion, 
    cedula, 
    pago,
    date,
    remuneracion,
    historial,
    id
}) => {

    const dispatch = useDispatch();
    const auth = getAuth();
    auth.languageCode = 'es';

    const handleDeleteProject = () => {
        swalConfirm('¿Seguro que quieres eliminar el formulario? Se borrarán todos los datos', 'Se ha eliminado el formulario', () => {
            dispatch(startDeleteProject(id));
        });
    }

    const onOpenHistory = () => {
        let output = historial.map((compra, i) => (
            `
              <tr>
                <th scope="row">${i+1}</th>
                <td>${compra.nombre}</td>
                <td>${compra.cedula}</td>
                <td>${compra.moto}</td>
                <td>${compra.monto}</td>
                <td>${compra.remuneracion}</td>
                <td>${compra.fecha.toLocaleString()}</td>
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
                    ${output.join()}
                    </tbody>
                </table>`,
            customClass: 'swal-wide',
            confirmButtonText: "Cerrar",
            confirmButtonColor: '#35b6b3'
        });

    }

    const onOpenData = () => {
        let output = `
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Nombre: ${nombre}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Email: ${email}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Telefono: ${telefono}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Dirección: ${direccion}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Cédula: ${cedula}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Método de pago: ${pago}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Cédula: ${cedula}</h5>
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">Remuneración: $${remuneracion}</h5>
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
                value={`http://192.168.1.101:5173/cliente/${id}`}
                viewBox={"0 0 256 256"}
                />
            </div>
        );

    }

    const onPayRemuneration = () => {
        swalConfirm(`¿Seguro que quieres marcar la remuneración de ${nombre} como pagada?`, 'Se ha marcado la remuneración como pagada', () => {
            dispatch(startPayRemuneration(id));
        });
    }

    const navigate = useNavigate();


    return (
        <div className="project__box-container">
            <span className={closed ? 'dashboard__box project__box closed' : 'dashboard__box project__box'}>
                <div className="dashboard__box-main">
                    <h3>
                        {
                            nombre.length > 20
                            ? nombre.slice(0, 20) + '...'
                            : nombre
                        }
                    </h3>
                    <p className='color-green'>Cédula: {cedula}</p>
                    <p className='color-green'>Remuneración: ${remuneracion}</p>
                </div>
                <span className="dashboard__box-footer dashboard__box-footer-top" onClick={() => navigate('/cliente/'+id)}>
                    Añadir remuneración <i className="fas fa-plus"></i>
                </span>
                <span className="dashboard__box-footer dashboard__box-footer-top" onClick={() => onPayRemuneration()}>
                    Pagar remuneración <i className="fas fa-money-check-alt"></i>
                </span>
                <span className="dashboard__box-footer dashboard__box-footer-top" onClick={() => onOpenHistory()}>
                    Ver historial de referidos <i className="fas fa-history"></i>
                </span>
                <span className="dashboard__box-footer" onClick={() => onOpenData()}>Ver datos del cliente <i className="fas fa-arrow-circle-right"></i></span>
            </span>
            <i className="fas fa-times" onClick={handleDeleteProject}></i>
        </div>
    )
}
