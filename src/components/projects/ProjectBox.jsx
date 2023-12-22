import { getAuth } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { db } from '../../firesbase/firebase-config'
import { swalConfirm } from '../../helpers/swalConfirm'
import { startDeleteProject } from '../../actions/projectsActions'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export const ProjectBox = ({
    nombre, 
    email, 
    telefono, 
    direccion, 
    cedula, 
    pago,
    date,
    remuneracion,
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

    const onOpenForm = () => {
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
        `;

        Swal.fire({
            title: "<h3>Datos del cliente</h3>", 
            html: `<ul class="list-group list-group-flush views-ul">${output}</ul>`,
            confirmButtonText: "Cerrar",
            confirmButtonColor: '#35b6b3'
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
                <span className="dashboard__box-footer dashboard__box-footer-top" onClick={() => navigate('/cliente/'+id)}>Añadir remuneración <i className="fas fa-plus"></i></span>
                <span className="dashboard__box-footer" onClick={() => onOpenForm()}>Ver datos del cliente <i className="fas fa-arrow-circle-right"></i></span>
            </span>
            <i className="fas fa-times" onClick={handleDeleteProject}></i>
        </div>
    )
}
