import React, { useContext, useEffect } from "react"
import { Segment, Comment } from "semantic-ui-react"
import { RootStoreContext } from "../../stores/rootStore"
import { MessageForm } from "./MessageForm"
import { MessagesHeader } from "./MessagesHeader"

export const Messages = () => {
    const rootStore = useContext(RootStoreContext)
    const { messages, loadMessages } = rootStore.messageStore
    const { getCurrentChannel, isChannelLoaded } = rootStore.channelStore

    useEffect(() => {
        if (isChannelLoaded) {
            loadMessages(getCurrentChannel()?.id!)
        }
    }, [loadMessages, getCurrentChannel, isChannelLoaded])
    return (
        <React.Fragment>
            {/*Header*/}
            <MessagesHeader />
            <Segment>
                <Comment.Group>

                </Comment.Group>
            </Segment>
            <MessageForm />
        </React.Fragment>
    )
}
