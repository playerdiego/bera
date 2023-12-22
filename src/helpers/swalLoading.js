import Swal from "sweetalert2";

export const swalLoading = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });
}