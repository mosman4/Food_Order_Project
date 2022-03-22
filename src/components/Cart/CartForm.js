import React from 'react';
import "./Form.css"
const CartForm = (props) => {

    return (
        <form className="form" id={props.id}  >
            <div className="control">
            <div>
                <label>Your name</label>
                <input type="text" />
            </div>
                </div>
        </form>

    );
};

export default CartForm;
