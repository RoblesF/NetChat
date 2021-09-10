import React, { useEffect, useContext } from "react"
import { Icon, Menu } from "semantic-ui-react"
import { IChannel } from '../../models/channels'
import { ChannelItem } from "./ChannelItem"
import ChannelForm from "./ChannelForm"
import ChannelStore from "../../stores/ChannelStore"
import { observer } from 'mobx-react-lite'

const Channels = () => {
    // const [channels, setChannels] = useState<IChannel[]>([])
    const { loadChannels, setModalVisible, channelsMobx } = useContext(ChannelStore)

    useEffect(() => {
        loadChannels()
    }, [loadChannels])

    const displayChannels = (channels: IChannel[]) => {
        return (
            channels.length > 0 &&
            channels.map((channel) => {
                const { id } = channel;
                return (
                    <ChannelItem key={id} channel={channel} />
                )
            })
        )
    }

    return (
        <React.Fragment>
            <Menu.Menu style={{ paddingBottom: '2em' }}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANNELS
                    </span>{' '}
                    ({channelsMobx.length}) <Icon name="add" onClick={() => setModalVisible(true)} style={{ cursor: 'pointer' }} />
                </Menu.Item>
                {displayChannels(channelsMobx)}
            </Menu.Menu>
            <ChannelForm />
        </React.Fragment>
    )
}

export default observer(Channels)