import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FileBox } from '../files/FileBox';
import { AddProjectBox } from '../projects/AddProjectBox';
import { ProjectBox } from '../projects/ProjectBox';

export const ClientResume = () => {

    const files = useSelector(state => state.files);
    const projects = useSelector(state => state.projects);
    const {loading} = useSelector(state => state.ui);

    let filesCount = 0;

  return (
    <>
    <h2 className='shadow-text main__subtitle'>Archivos</h2>
    <div className="files-boxes__container">

        {
            files.length > 0
            ? (
                files.map(file => {
                    filesCount += 1;
                    return filesCount <= 4 ? <FileBox key={file.id} {...file} clientID={getAuth().currentUser.uid} /> :  null
                })
            )
            : loading ? (
                <h4 className='shadow-text'>Cargando...</h4>
            )
            : (
                <h4 className='shadow-text'>No tienes archivos</h4>
            )
        }
    </div>
    <div className="projects__btn-container">
        <Link to='/files' className='btn'>
            Ver todos los archivos <i className="fas fa-arrow-circle-right"></i>
        </Link>
    </div>

    <h2 className='shadow-text main__subtitle'>Formularios</h2>
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
    <div className="projects__btn-container">
        <Link to='/formularios' className='btn'>
            Ver todos los archivos <i className="fas fa-arrow-circle-right"></i>
        </Link>
    </div>
    </>
  )
}
