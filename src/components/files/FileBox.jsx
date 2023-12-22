import { getAuth } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addViewFile, startDeleteFile } from '../../actions/filesActions'
import { excelExts, imageExts, pdfExts, videoExts, wordExts } from '../../helpers/fileExts'
import { swalConfirm } from '../../helpers/swalConfirm'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const FileBox = ({name, file, id, fileName, clientID, uploadedBy, views}) => {

    const dispatch = useDispatch();
    const auth = getAuth();
    auth.languageCode = 'es';

    const {displayName, email, role, uid} = useSelector(state => state.auth);

    const [fileExt, setFileExt] = useState('');

    useEffect(() => {
        const fileSplit = fileName.split('.');
        setFileExt(fileSplit[fileSplit.length - 1]);
    }, [fileName]);

    const handleDeleteFile = () => {
        swalConfirm('¿Seguro que quieres eliminar el formulario? Se borrarán todos los datos', 'Se ha eliminado el formulario', () => {
            dispatch(startDeleteFile(id, fileName, clientID));
        });
    }

    const onDownload = () => {
        window.open(file,'_blank', 'rel=noopener noreferrer');
        if(role!== 'admin') {
            dispatch(addViewFile(id, displayName, email, uid));
        }
    }

    const onViews = () => {

        if(views !== undefined) {
            let output = views.map(view => {
                return `<li class="list-group-item">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${view.name}</h5>
                                <small>${view.email}</small>
                            </div>
                        </li>`
            });
            Swal.fire({
                title: "<h3>Visualizaciones del archivo</h3>", 
                html: `<ul class="list-group list-group-flush views-ul">${output.join('')}</ul>`,
                confirmButtonText: "Cerrar",
                confirmButtonColor: '#35b6b3'
            });
        } else {
            Swal.fire({
                title: "<h3>Visualizaciones del archivo</h3>", 
                html: `<p>Aún no hay visualizaciones</p>`,
                confirmButtonText: "Cerrar",
                confirmButtonColor: '#35b6b3'
            });
        }


        
    }

    return (
        <div className="project__box-container">
            <div className='dashboard__box project__box'>
                <div className="dashboard__box-main">
                    <h3>
                        {
                            name.length > 20
                            ? name.slice(0, 20) + '...'
                            : name
                        }
                    </h3>
            
                    <p className='color-blue'>Archivo: {
                        fileName.length > 15
                        ? fileName.slice(0, 15) + '... ' + fileExt
                        : fileName
                    }</p>

                    {/* <p className='color-blue'>Subido por: {uploadedBy}</p> */}
                </div>
                <div className="files__box-icon">
                    {
                        wordExts.includes(fileExt) ? <i className="fas fa-file-word"></i> :
                        excelExts.includes(fileExt) ? <i className="fas fa-file-excel"></i> :
                        pdfExts.includes(fileExt) ? <i className="fas fa-file-pdf"></i> :
                        videoExts.includes(fileExt) ? <i className="fas fa-video"></i> :
                        imageExts.includes(fileExt) ? <i className="fas fa-image"></i> :
                        <i className="fas fa-file"></i>
                    }
                </div>
                <span onClick={() => onDownload()} className={`dashboard__box-footer ${role === 'admin' && ' dashboard__box-footer-top'}`}>
                    Descargar Archivo
                    <i className="fas fa-download"></i>
                </span>
                {
                    role === 'admin' &&
                    <span onClick={() => onViews()} className="dashboard__box-footer">Ver visualizaciones <i className="fas fa-eye"></i></span>
                }
            </div>
            {
                role === 'admin' &&
                <i className="fas fa-times" onClick={handleDeleteFile}></i>
            }
        </div>
    )
}
