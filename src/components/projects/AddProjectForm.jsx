import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startAddProject } from '../../actions/projectsActions';
import { useForm } from '../../hooks/useForm'

export const AddProjectForm = ({setAddProject}) => {

    const dispatch = useDispatch();

    const [{
        nombre, email, telefono, direccion, cedula, pago
    }, handleInputChange, reset] = useForm({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        cedula: '',
        pago: ''
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
                remuneracion: 0,
                date: new Date()
            };

            console.log(formulario);

            dispatch(startAddProject(formulario))
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

                        Añadir <i className='fas fa-plus'></i>
                        
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
