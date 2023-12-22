import { useState } from 'react'
import { AddFileForm } from './AddFileForm'

export const AddFileBox = () => {

    const [addFile, setAddFile] = useState(false)

    return (
        !addFile 
        ? (
            <div className="dashboard__box project__box add-project" onClick={() => setAddFile(true)}>
                <div className="dashboard__box-main">
                    <h3>Agregar Archivo</h3>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-file"></i>
                </div>
            </div>
        )
        : (
            <AddFileForm setAddFile={setAddFile} />
        )
    )
}
