import React from "react"
import { Segment, Comment } from "semantic-ui-react"
import { MessageForm } from "./MessageForm"
import { MessagesHeader } from "./MessagesHeader"

export const Messages = () => {
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
