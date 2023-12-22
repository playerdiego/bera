import React, { useState } from 'react'
import { AddProjectForm } from './AddProjectForm'

export const AddProjectBox = () => {

    const [addProject, setAddProject] = useState(false)

    return (
        !addProject 
        ? (
            <div className="dashboard__box project__box add-project" onClick={() => setAddProject(true)}>
                <div className="dashboard__box-main">
                    <h3 className='shadow-text'>Agregar cliente</h3>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-plus"></i>
                </div>
            </div>
        )
        : (
            <AddProjectForm setAddProject={setAddProject} />
        )
    )
}
