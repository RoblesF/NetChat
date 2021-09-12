import React from "react"
import { FieldRenderProps } from "react-final-form"
import { Form, FormFieldProps } from "semantic-ui-react"

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {

}
export const TextInput: React.FC<IProps> = ({ placeholder, type, icon, input }) => {
    return (
        <Form.Input fluid iconPosition="left" type={type} placeholder={placeholder}>
            <input {...input} />
            <i aria-hidden="true" className={icon}></i>
        </Form.Input>
    )
}