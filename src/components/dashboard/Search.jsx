import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { ErrorForm } from "../ui/ErrorForm";
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import QRCode from "react-qr-code";


export const Search = () => {

    
    const [{cedula}, handleInputChange, reset] = useForm({
        cedula: ''
    });

    const projects = useSelector(state => state.projects);
    
    const [error, setError] = useState(false);


    const onSearch = (e) => {
        e.preventDefault();

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

            reset();
        }
    }

    const checkForm = () => {

        if(cedula === '') {
            setError('Ingresa la cédula');
            return false;
        }

        return true;

    }

  return (
    <>
        <h3>Buscar por número de cédula</h3>
        {
            error &&
            <ErrorForm msg={error} />
        }
        <form onSubmit={onSearch}>
            <input
                type="number"
                className="auth__input"
                name="cedula"
                placeholder='Ingresa la cédula del cliente'
                onChange={handleInputChange}
                value={cedula}
            />

            <button className='auth__login-button btn'><i className="far fa-search"></i> Buscar</button>
        </form>
    </>
  )
}
