import React, { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './route'

import HYAppHeader from './components/app-header'
import HYAppFooter from './components/app-footer'
import AppPlayerBar from './pages/player/app-player-bar'

const App = memo(() => {
  return (
    <>
      <HYAppHeader />
      {useRoutes(routes)}
      <HYAppFooter />
      <AppPlayerBar/>
    </>
  )
})

export default App
