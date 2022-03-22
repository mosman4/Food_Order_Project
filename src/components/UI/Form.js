import React from 'react';

const Form = (props) => {
    return (
        <form className="form" id="my-form" onSubmit={props.formSubmission}>
            <div className="control">
                <div className={props.firstName}>
                    <label htmlFor='name'>Your name</label>
                    <input onBlur={props.nameBlur} type='text' id='name' onChange={props.nameChanger} />
                </div>
                <div className={props.streetName}>
                    <label htmlFor='street'>Street</label>
                    <input onBlur={props.streetBlur} type='text' id='street' onChange={props.streetChanger} />
                </div>
                <div className={props.codeClass}>
                    <label htmlFor='code'>Postal Code</label>
                    <input onBlur={props.codeBlur} type='text' id='code' onChange={props.codeChanger} />
                </div>
                <div className={props.cityClass}>
                    <label htmlFor='city'>City</label>
                    <input onBlur={props.cityBlur} type='text' id='city' onChange={props.cityChanger} />
                </div>
                {props.error && <p>An error has occurred</p>}
            </div>
        </form>
    );
};

export default Form;
