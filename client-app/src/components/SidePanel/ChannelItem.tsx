import { observer } from "mobx-react-lite"
import React from "react"
import { Menu } from "semantic-ui-react"
import { IChannel } from "../../models/channels"

interface IProps {
    channel: IChannel
    changeChannel: (channel: IChannel) => void
}

const ChannelItem: React.FC<IProps> = ({ channel, changeChannel }) => {
    const { id, name } = channel
    return (
        <Menu.Item
            key={id}
            onClick={() => changeChannel(channel)}
            name={name}
            style={{ opacity: 0.7 }}
        >
            # {name}
        </Menu.Item>
    )
}

export default observer(ChannelItem)