import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startAddFile } from '../../actions/filesActions';

export const AddFileForm = ({setAddFile}) => {

    const dispatch = useDispatch();

    const [values, setValues] = useState({name: '', file: ''});

    const {name, file} = values;

    const reset = () => {
        setValues({});
    };

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            'name': target.value
        });
    };

    const handleSelectFile = ({target}) => {
        setValues({
            ...values,
            'file': target.files[0]
        });
    }


    const handleAddFile = (e) => {
        e.preventDefault();

        if(checkForm()) {
            const fileData = {
                name,
                file,
                date: new Date()
            };

            dispatch(startAddFile(fileData));
            setAddFile(false);
            reset();
        }
          
    };

    const checkForm = () => {

        if(name === '' || file === '') {
            Swal.fire('Todos los campos son obligatorios', '', 'error');
            return false;
        }

        return true;

    }

    return (
        <div className='dashboard__box project__add-form'>
            <form onSubmit={handleAddFile}>
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleInputChange}
                    placeholder='Nombre del archivo'
                    />
                <input
                    type='file'
                    name='file'
                    onChange={handleSelectFile}
                    placeholder='Nombre del archivo'
                    />

                <div className='password__buttons'>
                    <button
                        className='btn'
                        type='submit'
                        >

                        Añadir <i className='fas fa-plus'></i>
                        
                    </button>
                    <button
                        className='btn'
                        onClick={() => setAddFile(false)}>
                            Cancelar <i className='fas fa-times'></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
