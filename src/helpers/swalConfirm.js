import Swal from 'sweetalert2';

export const swalConfirm = (title, confirmation, action) => {
    Swal.fire({
        title,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
        }).then((result) => {
        if (result.isConfirmed) {

            // action
            action();

        }
        })
}