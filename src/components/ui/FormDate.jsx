import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormDate = ({handleSubmit, date, setDate, setter}) => {
    return (
        <form className='task__deadLine project__title-form' onSubmit={handleSubmit}>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)} />
            <div className='form__buttons-container'>
                <button className='form__btn' type='submit'><i className='fas fa-check'></i></button>
                <button className='form__btn' onClick={() => setter(false)}><i className='fas fa-times'></i></button>
            </div>
        </form>
    )
}
