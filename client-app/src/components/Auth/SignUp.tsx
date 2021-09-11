import React from "react"
import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react"

export const SignUp = () => {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange" />
                    SignUp for NetChat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="username"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            type="text"
                        />
                        <Form.Input
                            fluid
                            name="email"
                            icon="email"
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
                        <Form.Input
                            fluid
                            name="passwordConfirmation"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="Confirm password"
                            type="password"
                        />
                        <Button color="orange" fluid size="large">
                            Submit
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already a user? <Link to="/signin">Sing In</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}