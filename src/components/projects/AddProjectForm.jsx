import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startAddProject, startUpdateProject } from '../../actions/projectsActions';
import { useForm } from '../../hooks/useForm'

export const AddProjectForm = ({setAddProject, initNombre = '', initEmail = '', initTelefono = '', initDireccion = '', initCedula = '', initPago = '', edit = false, historial = [], pagos = [], remuneracion, id}) => {

    const dispatch = useDispatch();

    const [{
        nombre, email, telefono, direccion, cedula, pago
    }, handleInputChange, reset] = useForm({
        nombre: initNombre,
        email: initEmail,
        telefono: initTelefono,
        direccion: initDireccion,
        cedula: initCedula,
        pago: initPago
    });

    const toggleCheck = (e, value) => {
        console.log(e.target.nombre, value);
        handleInputChange({
            target: {
                nombre: e.target.nombre,
                value: !value
            }
        });
    };


    const handleAddForm = (e) => {
        e.preventDefault();
        if(checkForm()) {
            const formulario = {
                nombre, email, telefono, direccion, cedula, pago,
                historial,
                pagos,
                remuneracion: remuneracion || 0,
                date: new Date()
            };

            if(edit) {
                dispatch(startUpdateProject(id, formulario));
            } else {
                dispatch(startAddProject(formulario));
            }

            setAddProject(false);

            reset();
        }
          
    };

    const checkForm = () => {

        if(nombre === '' || email === '' || telefono === '' || direccion === '' || cedula === '' || pago === '') {
            Swal.fire('Todos los campos son son obligatorios', '', 'error');
            return false;
        }

        return true;

    }

    return (
        <div className='dashboard__box project__add-form'>
            <form onSubmit={handleAddForm}>
                <input
                    type='text'
                    name='nombre'
                    value={nombre}
                    onChange={handleInputChange}
                    placeholder='Nombre:'
                />
                <input
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                    placeholder='Email:'
                    inputMode='email'
                />
                <input
                    type='text'
                    name='telefono'
                    value={telefono}
                    onChange={handleInputChange}
                    placeholder='Teléfono:'
                    inputMode='tel'
                />
                <input
                    type='text'
                    name='direccion'
                    value={direccion}
                    onChange={handleInputChange}
                    placeholder='Dirección:'
                />
                <input
                    type='text'
                    name='cedula'
                    value={cedula}
                    onChange={handleInputChange}
                    placeholder='Cédula:'
                    inputMode='numeric'
                />
                <textarea
                    type='text'
                    name='pago'
                    value={pago}
                    onChange={handleInputChange}
                    placeholder='Método/s de pago:'
                    rows={8}
                />
            
                <div className='password__buttons'>
                    <button
                        className='btn'
                        type='submit'
                        >

                        {edit ? 'Editar' : 'Añadir'} <i className='fas fa-plus'></i>
                        
                    </button>
                    <button
                        className='btn'
                        onClick={() => setAddProject(false)}>
                            Cancelar <i className='fas fa-times'></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
