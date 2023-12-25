import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { AdminResume } from './AdminResume';
import { ClientBoxes } from './ClientBoxes';
import { ClientResume } from './ClientResume';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getProjectById } from '../../helpers/getProjectById';
import { swalConfirm } from '../../helpers/swalConfirm';
import { startAddRemuneration } from '../../actions/projectsActions';
import Swal from 'sweetalert2'


export const DashboardScreen = () => {

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.auth);

    const params = useSearchParams();
    const {projectID} = params;

    const navigate = useNavigate();

    const projects = useSelector(state => state.projects);

    const [project, setProject] = useState(null);

    

    useEffect(() => {
        const auth = getAuth();

        return () => {
        }
    }, [dispatch, projectID])

    
    useEffect(() => {
        if(projects.length > 0 && projectID) {
            setProject(getProjectById(projectID, projects));
        }
    }, [projects, projectID]);

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const addRemuneration = () => {

        let usernameInput;
        let passwordInput;

        Swal.fire({
            title: `Añadir remuneración de 20$ a ${project.nombre}`,
            html: `
              <input type="text" id="username" class="swal2-input" placeholder="Username">
              <input type="password" id="password" class="swal2-input" placeholder="Password">
            `,
            confirmButtonText: 'Añadir',
            cancelButtonText: "Cancelar",
            focusConfirm: false,
            didOpen: () => {
              const popup = Swal.getPopup();
              usernameInput = popup.querySelector('#username');
              passwordInput = popup.querySelector('#password');
              usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
              passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            },
            preConfirm: () => {
              const username = usernameInput.value
              const password = passwordInput.value
              if (!username || !password) {
                Swal.showValidationMessage(`Please enter username and password`)
              }
              return { username, password }
            },
          }).then((result) => {
            if (result.isConfirmed) {
    
                dispatch(startAddRemuneration(project.id, project));
                navigate('/', {replace: true});
    
            }
        })
    }
    
    useEffect(() => {
        if(project === null) return;
        addRemuneration()
    }, [project]);


    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    return (
        <>
            <AdminResume />  
        </>
    )
}
