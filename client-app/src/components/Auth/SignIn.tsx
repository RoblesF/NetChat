import React from "react"
import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Icon, Label, Message, Segment } from "semantic-ui-react"
import { Form as FinalForm, Field } from 'react-final-form'
import { TextInput } from "../Common/Form/TextInput"
import { useContext } from "react"
import { RootStoreContext } from "../../stores/rootStore"
import { ISignForm } from "../../models/users"
import { FORM_ERROR } from "final-form"

export const SignIn = () => {
    const rootStore = useContext(RootStoreContext)
    const { signin } = rootStore.userStore

    const handleFormSubmit = async (values: ISignForm) => {
        return signin(values).catch((error) => ({ [FORM_ERROR]: error }))
    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" /> SignIn to NetChat
                </Header>
                <FinalForm
                    onSubmit={handleFormSubmit}
                    render={({ handleSubmit, submitting, form, submitError }) => (
                        <Form size="large" onSubmit={handleSubmit}>
                            <Segment stacked>
                                <Field
                                    name="email"
                                    component={TextInput}
                                    placeholder="Email address"
                                    type="text"
                                    icon="mail icon"
                                />
                                <Field
                                    name="password"
                                    component={TextInput}
                                    placeholder="Password"
                                    type="text"
                                    icon="lock icon"
                                />
                                <Button color="violet" fluid size="large" disabled={submitting}>
                                    Submit
                                </Button>
                                {submitError && (<Label color="red" basic content={submitError.statusText} />)}
                                <pre style={{ textAlign: 'left' }}>{JSON.stringify(form.getState(), undefined, 2)}</pre>
                            </Segment>
                        </Form>
                    )} />
                <Message>
                    Don't have an account? <Link to="SignUp">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid >
    )
}