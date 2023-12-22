import { useSelector } from 'react-redux';
import { AddFileBox } from '../files/AddFileBox';
import { FileBox } from '../files/FileBox';

export const AdminBoxes = () => {

    const files = useSelector(state => state.files);
    const {loading} = useSelector(state => state.ui);


    return (
        <>
        <h1 className='shadow-text main__title'>Panel de Administrador</h1>

        <div className="project__main">
            
            <h3>Todos los Archivos</h3>

            <div className="files-boxes__container">
                <AddFileBox />
            {
                files.length > 0
                ? (
                    files.map(file => <FileBox key={file.id} {...file} />)
                )
                : loading ? (
                    <h4 className='shadow-text'>Cargando...</h4>
                )
                : (
                    <h4 className='shadow-text'>No has subido archivos aún</h4>
                )
            }
            </div>

        </div>
        </>
    )
}
