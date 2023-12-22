export const Footer = () => {

    const date = new Date();

    return (
        <footer className="footer__container">
            <strong>Todos los derechos reservados &copy; {date.getFullYear()} Bera</strong>
            <div>
                <b>Desarrollado por:</b> <a href='https://mucui.net' target='_blank' rel="noreferrer">Mucui Estuio</a>
            </div>
        </footer>
    )
}
