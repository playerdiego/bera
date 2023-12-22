import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { FileBox } from './FileBox';
import { AddFileBox } from './AddFileBox';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

export const FilesScreen = () => {

    const dispatch = useDispatch();
    
    const files = useSelector(state => state.files);
    const {role} = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.ui);


    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Todos los Archivos</h1>

            <div className="files-boxes__container">
                {
                    role === 'admin' &&
                    <AddFileBox clientID={getAuth().currentUser.uid} />
                }
            {
                files.length > 0
                ? (
                            files.map(file => <FileBox key={file.id} {...file} clientID={getAuth().currentUser.uid} />)
                )
                : loading ? (
                    <h4 className='shadow-text'>Cargando...</h4>
                )
                : (
                    <h4 className='shadow-text'>No tienes archivos. ¡Crea uno!</h4>
                )
            }
            </div>
        </>
    )
}
