import React from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { Field, Form as FinalForm } from 'react-final-form'
import { IMessageForm } from "../../models/messages"
import { TextInput } from "../Common/Form/TextInput"

export const MessageForm = () => {
    const handleFormSubmit = async (values: IMessageForm) => {

    }
    return (
        <FinalForm
            onSubmit={handleFormSubmit}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Segment>
                        <Field
                            fluid
                            name="content"
                            style={{ marginBottom: '0.7em' }}
                            iconLabel
                            labelPosition="left"
                            placeholder="Write your messages"
                            component={TextInput}
                        ></Field>
                        <Button.Group icon widths="2">
                            <Button
                                color="orange"
                                content="Add reply"
                                labelPosition="left"
                                icon="edit" />
                            <Button
                                color="teal"
                                content="Upload media"
                                labelPosition="right"
                                icon="cloud upload" />
                        </Button.Group>
                    </Segment>
                </Form>
            )}></FinalForm>
    )
}