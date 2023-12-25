import { useEffect, useState } from 'react'
import { getProjectById } from '../../helpers/getProjectById'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { Delete } from '../ui/Delete';
import { swalConfirm } from '../../helpers/swalConfirm';
import { useSelector } from 'react-redux';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { Loading } from '../ui/Loading';
import { startAddRemuneration, startDeleteProject } from '../../actions/projectsActions';
import { Navigate, useNavigate, useParams } from 'react-router';
import { getAuth } from '@firebase/auth';
import { ClientHeader } from '../files/ClientHeader';
import { AdminResume } from '../dashboard/AdminResume';
import Swal from 'sweetalert2';

export const Project = () => {


    const params = useParams();
    const {projectID} = params;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects);

    const [project, setProject] = useState(null);

    

    useEffect(() => {
        const auth = getAuth();

        return () => {
        }
    }, [dispatch, projectID])

    
    useEffect(() => {
        if(projects.length > 0) {
            setProject(getProjectById(projectID, projects));
        }
    }, [projects, projectID]);

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const handleDeleteProject = () => {
        swalConfirm('¿Seguro que quieres eliminar el cliente? Se borrarán todos los datos', 'Se ha eliminado el formulario', () => {
            dispatch(startDeleteProject(project.id));
            navigate('/', {replace: true});
        });

    }

    const addRemuneration = () => {

        let nombreInput;
        let cedulaInput;
        let motoInput;
        let montoInput;

        Swal.fire({
            title: `Añadir remuneración de 20$ a ${project.nombre}`,
            html: `
              <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del cliente">
              <input type="number" id="cedula" class="swal2-input" placeholder="Cédula del cliente">
              <input type="text" id="moto" class="swal2-input" placeholder="Modelo de moto">
              <input type="number" id="monto" class="swal2-input" placeholder="Monto en $USD">
            `,
            confirmButtonText: 'Añadir',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            focusConfirm: false,
            didOpen: () => {
              const popup = Swal.getPopup();

              nombreInput = popup.querySelector('#nombre');
              cedulaInput = popup.querySelector('#cedula');
              motoInput = popup.querySelector('#moto');
              montoInput = popup.querySelector('#monto');

              nombreInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
              cedulaInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
              motoInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
              montoInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            },
            preConfirm: () => {
              const nombre = nombreInput.value;
              const cedula = cedulaInput.value;
              const moto = motoInput.value;
              const monto = montoInput.value;
              if (!nombre || !cedula || !moto || !monto) {
                Swal.showValidationMessage(`Por favor, Ingresa todos los datos.`);
              }
              return { nombre, cedula, moto, monto }
            },
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startAddRemuneration(project.id, project, {...result.value, fecha: new Date(), remuneracion: 20}));
            }
            
            navigate('/', {replace: true});    
        })
    }
    
    useEffect(() => {
        if(project === null) return;
        addRemuneration()
    }, [project]);

    if(project === null) {
        return <Loading />
    }

    if(!project) {
        return <Navigate to='/' />
    }


    return (
        <>
            <AdminResume />
        </>

    )
}
