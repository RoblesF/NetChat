import React from "react"
import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react"

export const SignIn = () => {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" /> SignIn to NetChat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email address"
                            type="email"
                        />
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                        <Button color="violet" fluid size="large">
                            Submit
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Don't have an account? <Link to="SignUp">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}