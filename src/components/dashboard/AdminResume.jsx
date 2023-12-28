import { useSelector } from 'react-redux';
import { AddProjectBox } from '../projects/AddProjectBox';
import { ProjectBox } from '../projects/ProjectBox';

export const AdminResume = () => {

    const projects = useSelector(state => state.projects);
    const {uid} = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.ui);

  return (
    <>
    <div className="project__main">
    
        <h3>Todos los clientes</h3>

        <div className="files-boxes__container">
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
                <h4 className='shadow-text'>No hay clientes por ahora</h4>
            )
        }
        </div>

    </div>
    </>
  )
}
