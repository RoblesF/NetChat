import { useContext, useEffect } from 'react'
import './App.css'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import SidePanel from './components/SidePanel/SidePanel'
import { ColorPanel } from './components/ColorPanel/ColorPanel'
import { Messages } from './components/Message/Messages'
import MetaPanel from './components/MetaPanel/MetaPanel'
import { RootStoreContext } from './stores/rootStore'
import { LoadingComponent } from './components/LoadingComponent'
import { observer } from 'mobx-react-lite'

const App = () => {
  const rootStore = useContext(RootStoreContext)
  const { setAppLoaded, appLoaded, token } = rootStore.commonStore
  const { getUser } = rootStore.userStore
  
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    }
    else{ 
      setAppLoaded()
    }
    console.log(`is apploaded : ${appLoaded}`)
  }, [getUser, setAppLoaded, token, appLoaded])
    
    if(!appLoaded) return <LoadingComponent content="Loading app..." />
  return (
      <Grid columns="equal" className="app">
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    )
  
}

export default observer(App)
