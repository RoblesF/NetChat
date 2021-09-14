import React, { useContext } from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { Field, Form as FinalForm } from 'react-final-form'
import { IMessageForm } from "../../models/messages"
import { TextInput } from "../Common/Form/TextInput"
import { RootStoreContext } from "../../stores/rootStore"
import { FORM_ERROR } from "final-form"

export const MessageForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { sendMessage } = rootStore.messageStore
    const handleFormSubmit = async (values: IMessageForm) => {
        await sendMessage(values).catch((error) => ({ [FORM_ERROR]: error }))
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