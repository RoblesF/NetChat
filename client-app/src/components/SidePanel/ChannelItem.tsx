import React from "react"
import { Menu } from "semantic-ui-react"
import { IChannel } from "../../models/channels"

interface IProps {
    channel: IChannel
}

export const ChannelItem: React.FC<IProps> = ({ channel }) => {
    const { id, name } = channel
    return (
        <Menu.Item
            key={id}
            onClick={() => console.log(channel)}
            name={name}
            style={{ opacity: 0.7 }}
        >
            # {name}
        </Menu.Item>
    )
}