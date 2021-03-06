import React from "react";
import c from "./Input.module.css"

export const Input = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error;
    return (
        <div>
            <div>
                <input{...input} {...props}
                      className={isError
                          ? (props.className + ' ' + props.errorclassname)
                          : props.className}/>
            </div>
            {isError
                ? <span className={c.errorMessage}>
                    {meta.error}
                  </span>
                : <></>}
        </div>
    )
};

export default Input;