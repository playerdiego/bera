import React, { useEffect, useState } from 'react'
import { getClientById } from '../../helpers/getClientById'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { useSelector } from 'react-redux';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { Loading } from '../ui/Loading';
import { cleanFiles, startLoadFiles } from '../../actions/filesActions';
import { Navigate, useParams } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firesbase/firebase-config';
import { AddFileBox } from './AddFileBox';
import { FileBox } from './FileBox';
import { ClientHeader } from './ClientHeader';
import { cleanProjects, startLoadProjects } from '../../actions/projectsActions';
import { ProjectBox } from '../projects/ProjectBox';

export const Client = () => {


    const params = useParams();
    const {clientID} = params;

    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.ui);
    const clients = useSelector(state => state.clients);
    const projects = useSelector(state => state.projects);

    const [client, setClients] = useState(null);

    useEffect(() => {
        dispatch(cleanProjects());
        dispatch(startLoadProjects(clientID));
        setClients(getClientById(clientID, clients));

        dispatch(closeSidebar());
        scrolltoTop();


        return () => {
            dispatch(cleanProjects());
        }
    }, [dispatch, clientID, clients]);
    

    if(client === null) {
        return <Loading />
    }

    if(!client) {
        return <Navigate to='/' />
    }

    return (
        <>
            <ClientHeader client={{...client, formsLength: projects.length}} />
            <hr />

            <div className="project__main">
            
                <h3>Todos los formularios</h3>

                <div className="files-boxes__container">
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
                        <h4 className='shadow-text'>Este representante no tiene formularios</h4>
                    )
                }
                </div>

            </div>

        </>

    )
}
