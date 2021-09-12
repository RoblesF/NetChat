import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Dropdown, Grid, Header, Icon, Message } from "semantic-ui-react"
import { RootStoreContext } from "../../stores/rootStore"

export const UserPanel = () => {
    const rootStore = useContext(RootStoreContext)
    const { user } = rootStore.userStore

    const dropdownOptions = () => [{
        key: 'user',
        text: (
            <span>
                Logged as: <strong>{user?.email}</strong>
            </span>
        ),
        disabled: true
    }, {
        key: 'avatar',
        text: (
            <span>
                Change avatar
            </span>
        )
    }
    ]
    return (
        <Grid style={{ background: '#4c3c4c', margin: 0 }}>
            <Grid.Column>
                <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <Header.Content>NetChat</Header.Content>
                    </Header>
                </Grid.Row>
                <Header style={{ padding: '.25em' }} as="h4" inverted>
                    <Dropdown
                        trigger={<span>{user?.userName}</span>}
                        options={dropdownOptions()}
                    ></Dropdown>
                    <Message>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </Message>
                </Header>
            </Grid.Column>
        </Grid>
    )
}
