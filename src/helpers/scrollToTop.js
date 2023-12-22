export const scrolltoTop = () => {
    document.querySelector("body").scrollTo({
        top: 0,
        behavior: "smooth"
    })
}