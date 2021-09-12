import React from "react"
import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react"
import { Form as FinalForm, Field } from 'react-final-form'
import { TextInput } from "../Common/Form/TextInput"

export const SignIn = () => {
    const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))
    const showResults = async (values: any) => {
        await sleep(1000)
        console.log(values)
    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" /> SignIn to NetChat
                </Header>
                <FinalForm
                    onSubmit={showResults}
                    render={({ handleSubmit, submitting, values }) => (
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
                                <pre>{JSON.stringify(values)}</pre>
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