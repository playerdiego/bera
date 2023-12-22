import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const ClientBoxes = () => {

    const files = useSelector(state => state.files);

    return (
        <>
        <h1 className='shadow-text main__title'>Panel de Representante</h1>
        <div className="dashboard__boxes">

            <Link to='/files' className="dashboard__box files">
                <div className="dashboard__box-main">
                    <h3>{files.length}</h3>

                    <p>{files.length > 1 ? 'Archivos' : 'Archivo'}</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-file"></i>
                </div>
                <span className="dashboard__box-footer">Ver todos <i className="fas fa-arrow-circle-right"></i></span>
            </Link>

            <Link to='/files' className="dashboard__box files">
                <div className="dashboard__box-main">
                    <h3>{files.length}</h3>

                    <p>{files.length > 1 ? 'Formularios' : 'Formulario'}</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-pencil-alt"></i>
                </div>
                <span className="dashboard__box-footer">Ver todos <i className="fas fa-arrow-circle-right"></i></span>
            </Link>

        </div>
        </>
    )
}
