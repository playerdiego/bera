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

        Swal.fire({
            title: `¿Quieres añadir una remuneración de 20$ a ${project.nombre}?`,
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
            }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startAddRemuneration(project.id, project));
            }
            
            navigate('/', {replace: true});    
        });
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
