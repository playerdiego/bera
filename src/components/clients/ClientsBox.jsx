import { getAuth } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firesbase/firebase-config'

export const ClientsBox = ({name, email, id}) => {

    const auth = getAuth();
    auth.languageCode = 'es';

    return (
        <div className="project__box-container">
            <Link to={`/representante/${id}`} className='dashboard__box project__box'>
                <div className="dashboard__box-main">
                    <h3>{name}</h3>
                </div>
                <div className="files__box-icon">
                    <i className="fas fa-user"></i>
                </div>
                <small className='files_box-email'>{email}</small>

                <span className="dashboard__box-footer">Ver formularios <i className="fas fa-arrow-circle-right"></i></span>
            </Link>
        </div>
    )
}
