import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';
import Swal from 'sweetalert2';
import { swalConfirm } from '../../helpers/swalConfirm';
import { useDispatch } from 'react-redux';
import { startUpdateProject } from '../../actions/projectsActions';

export const ProjectHeader = ({project}) => {

    const dispatch = useDispatch();
    
    const [editTitle, setEditTitle] = useState(false);
    const [editBudget, setEditBudget] = useState(false);

    
    const [{name, budget, paid, passwordsPanel}, handleInputChange] = useForm({
        ...project
    });

    const handleUploadProject = (e) => {
        e.preventDefault();

        dispatch(startUpdateProject(project.id, {
            name,
            budget: parseFloat(budget),
            paid: parseFloat(paid),
            passwordsPanel
        }));

        setEditTitle(false);
        setEditBudget(false);
    }

    const handleUploadPaid = (e) => {

        handleInputChange(e);

        dispatch(startUpdateProject(project.id, {
            paid: e.target.value,
        }));

    }

    const handleCloseProject = () => {
        swalConfirm(
            project.closed ? '¿Seguro que quieres pasar este formulario a Desarrollo?' : '¿Seguro que quieres Completar este formulario?',
            project.closed ? 'El formulario se ha Completado' : 'EL formulario se ha puesto en Desarrollo',
            () => {
                dispatch(startUpdateProject(project.id, {
                    closed: !project.closed
                }));
            }
        )
    }


    return (
        <>
            <div className="project__header">
                <Link
                    className="btn btn-less-deep auth__button-back project__back"
                    to='/formularios'
                >
                    <i className="fas fa-arrow-left"></i>
                </Link>

                

                {
                    !editTitle 
                    ? (
                        <h1 className='shadow-text main__title' onClick={() => !editTitle && !editBudget && setEditTitle(true)}>
                            {name}
                            <i
                                className={`fas fa-pencil project__edit ${editTitle || editBudget ? 'hidden': ''}`}
                                onClick={() => setEditTitle(true)}
                            ></i>
                        </h1>
                    )
                    : (
                        <Form
                            className='project__title-form'
                            handleSubmit={handleUploadProject}
                            handleInputChange={handleInputChange}
                            setter={setEditTitle}
                            name='name'
                            value={name} /> 
                    )
                }

                {
                    !editBudget
                    ? (
                        <>
                        <div className="project__budget" onClick={() => !editTitle && !editBudget && setEditBudget(true)}>
                            {budget}$
                            <i
                                className={`fas fa-pencil project__edit ${editTitle || editBudget ? 'hidden': ''}`}
                                onClick={() => setEditBudget(true)}
                            ></i>
                        </div>
                        </>
                    )
                    : (
                        <Form
                            className='project__budget-form'
                            handleSubmit={handleUploadProject}
                            handleInputChange={handleInputChange}
                            setter={setEditBudget}
                            name='budget'
                            value={budget} />
                    )
                }

                <select
                    name="paid"
                    id=""
                    className='project__percentage'
                    value={paid}
                    onChange={handleUploadPaid}
                >
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                    <option value="80">80%</option>
                    <option value="90">90%</option>
                    <option value="100">100%</option>
                </select>
                <button className={project.closed ? 'task__status project__status btn completed' : 'task__status project__status btn'} onClick={handleCloseProject}>
                    { project.closed ? 'Completado' : 'Por Completar' }
                </button>
            </div>
            <div className="project__header-description">
                <p className='color-blue'>Tareas: {project.tasks}</p>
                <p className='color-light-green'>Pagado: {paid}% ({budget * (paid / 100)}$)</p>
                <p className='color-red'>Por Pagar: {100 - paid}% ({budget * ((100 - paid) / 100)}$)</p>
            </div>

        </>
    )
}
