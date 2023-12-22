import React from 'react'

export const Delete = ({action}) => {
    return (
        <div className="delete" onClick={action}>
            Eliminar <i className="fas fa-times"></i>
        </div>
    )
}
