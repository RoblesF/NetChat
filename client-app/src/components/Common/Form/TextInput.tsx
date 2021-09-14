import React from "react"
import { FieldRenderProps } from "react-final-form"
import { Form, FormFieldProps, Label } from "semantic-ui-react"

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {

}
export const TextInput: React.FC<IProps> = ({ placeholder, type, icon, input, meta: { touched, error }, iconLabel }) => {
    return (
        <Form.Input fluid iconPosition="left" type={type} placeholder={placeholder}>
            {iconLabel && (
                <button className="ui icon button label button__icon"><i aria-hidden="true" className="add icon"></i></button>
            )}
            <input {...input} className={iconLabel ? 'input__icon' : ''} />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
            <i aria-hidden="true" className={icon}></i>
        </Form.Input>
    )
}