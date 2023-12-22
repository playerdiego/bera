export const onlyNumber = (e, onChange) => {

    const re = /^[0-9\b]+$/;

    if(e.target.value === '' || re.test(e.target.value)) {
        onChange(e);
    }
}