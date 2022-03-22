import React from 'react';
import classes from "../Cart/Cart.module.css";

const Button = (props) => {
    return (
        <button className={classes.button} onClick={props.action} >{props.children}</button>
    );
};

export default Button;
