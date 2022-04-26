import React, { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './route'

import HYAppHeader from './components/app-header'
import HYAppFooter from './components/app-footer'

const App = memo(() => {
  return (
    <>
      <HYAppHeader />
      {useRoutes(routes)}
      <HYAppFooter />
    </>
  )
})

export default App
