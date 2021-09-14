import React, { ChangeEvent, useContext, useState } from "react"
import { Button, Form, Icon, Input, Modal } from "semantic-ui-react"
import { IChannel } from "../../models/channels"
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from "../../stores/rootStore"

const ChannelForm: React.FC = () => {
    const emptyChannel = {
        id: '',
        name: '',
        description: '',
        messages: []
    }

    const [channel, setChannel] = useState<IChannel>(emptyChannel)
    const rootStore = useContext(RootStoreContext)
    const { isModalVisible, setModalVisible, createChannel } = rootStore.channelStore
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChannel({ ...channel, [event.target.name]: event.target.value })
    }

    const handleSubmit = () => {
        const newChannel = {
            ...channel,
            id: uuid()
        }

        createChannel(newChannel)
        setModalVisible(false)
    }
    return (
        <Modal basic open={isModalVisible}>
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input
                            fluid
                            label="Channel Name"
                            name="name"
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label="Description"
                            name="description"
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='green' inverted onClick={handleSubmit}>
                    <Icon name='checkmark' /> Add
                </Button>
                <Button color='red' inverted onClick={() => setModalVisible(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default observer(ChannelForm)