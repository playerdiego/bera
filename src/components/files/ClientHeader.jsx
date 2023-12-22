import { Link } from 'react-router-dom';

export const ClientHeader = ({client}) => {

    const {nombre, email, cedula, telefono, direccion, pago} = client;

    return (
        <>
            <div className="project__header">
                <Link
                    className="btn btn-less-deep auth__button-back project__back"
                    to='/'
                >
                    <i className="fas fa-arrow-left"></i>
                </Link>

                <h1 className='shadow-text main__title client-name'>
                   {nombre} 
                </h1>


            </div>

        </>
    )
}
