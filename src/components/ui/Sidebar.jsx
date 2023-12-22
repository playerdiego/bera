import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/authActions';
import { swalConfirm } from '../../helpers/swalConfirm';
import Logo from '../../assets/logo.png';

export const Sidebar = () => {

    const dispatch = useDispatch();
    
    const {open} = useSelector(state => state.ui);
    const {role} = useSelector(state => state.auth);

    const handleLogout = () => {
        swalConfirm('¿Seguro que quieres cerrar sesión?', '', () => dispatch(startLogout()))
    }

    return (
        <div className={open ? 'sidebar__container open': 'sidebar__container'} id="nav-bar">
            <nav className="sidebar__nav">
                <div>

                    <span className="sidebar__nav-logo">
                        <Link to='/'><img className='sidebar__logo' src={Logo} alt="Bera" /></Link>
                        <span className="sidebar__nav-logo-name">Bera</span>
                    </span>

                    <div className="sidebar__nav-menu">

                        <Link to="/" className="sidebar__nav-link">
                            <i className='fas fa-columns'></i>
                            <span className={!open ? 'hide' : ''}>Dashboard</span>
                        </Link>

                        <Link to="/files" className="sidebar__nav-link">
                            <i className='fas fa-briefcase'></i>
                            <span className={!open ? 'hide' : ''}>Archivos</span>
                        </Link>

                        {
                            role === 'admin' &&
                            (
                                <>
                                    <Link to="/representantes" className="sidebar__nav-link">
                                        <i className='fas fa-users'></i>
                                        <span className={!open ? 'hide' : ''}>Representantes</span>
                                    </Link>
                                </>
                            )
                        }

                        {
                            role !== 'admin' &&
                            <Link to="/formularios" className="sidebar__nav-link">
                                <i className='fas fa-pencil-alt'></i>
                                <span className={!open ? 'hide' : ''}>Formularios</span>
                            </Link>

                        }

                        

                    </div>
                </div>

                <div>
                    
                    <Link to='/account' className="sidebar__nav-link">
                        <i className='fas fa-user'></i>
                        <span className={!open ? 'hide' : ''}>Mi Cuenta</span>
                    </Link>
                    <button className="sidebar__nav-link logout btn" onClick={handleLogout}>
                        <i className='fas fa-sign-out-alt'></i>
                        <span className={!open ? 'hide' : ''}>Cerrar Sesión</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}
