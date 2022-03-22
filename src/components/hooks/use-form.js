import React, {useState} from 'react';

const useForm = (validate) => {
    const [input, setInput] = useState("");
    const [isTouched,setTouch] = useState(false)

    const validInput = validate(input);
    const HasError = !validInput && isTouched;

    const inputHandler = (event) => {
      setInput(event.target.value)
      setTouch(false)
    }
    const blurHandler = () => {
        setTouch(true)
    }
    return {
        input,
        HasError,
        blurHandler,
        ChangeHandler:inputHandler,
        inputValid:validInput
    }

};

export default useForm;
