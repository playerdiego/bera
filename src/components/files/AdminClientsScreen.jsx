import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { useSelector } from 'react-redux';
import { ClientsBox } from '../clients/ClientsBox';

export const AdminClientsScreen = () => {

    const dispatch = useDispatch();
    
    const clients = useSelector(state => state.clients);
    const {loading} = useSelector(state => state.ui);
    const {uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Representantes</h1>

            <div className="files-boxes__container">
            {
                clients.length > 1
                ? (
                    clients.map(client => client.id !== uid ? <ClientsBox key={client.id} {...client} /> : null)
                )
                : loading ? (
                    <h4 className='shadow-text'>Cargando...</h4>
                )
                : (
                    <h4 className='shadow-text'>No tienes representantes por ahora</h4>
                )
            }
            </div>
        </>
    )
}
