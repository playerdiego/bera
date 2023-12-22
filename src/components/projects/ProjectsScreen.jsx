import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { ProjectBox } from './ProjectBox';
import { AddProjectBox } from './AddProjectBox';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { useSelector } from 'react-redux';

export const ProjectsScreen = () => {

    const dispatch = useDispatch();
    
    const projects = useSelector(state => state.projects);
    const {loading} = useSelector(state => state.ui);


    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Formularios</h1>
            <div className="project-boxes__container">
                <AddProjectBox />
            {
                projects.length > 0
                ? (
                            projects.map(project => !project.closed && (
                                <ProjectBox key={project.id} {...project} />
                            ))
                )
                : loading ? (
                    <h4 className='shadow-text'>Cargando...</h4>
                )
                : (
                    <h4 className='shadow-text'>No tienes formularios. ¡Crea uno!</h4>
                )
            }
            </div>
        </>
    )
}
