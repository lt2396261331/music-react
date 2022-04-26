import React from 'react'

import { DiscoverWrapper, TopMenu } from './style'
import { NavLink, Outlet } from 'react-router-dom'

import { dicoverMenu } from '@/common/local-data'

export default function Discover() {

  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {
            dicoverMenu.map((item, index) => {
              return (
                <div key={item.title} className="item">
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      <Outlet />
    </DiscoverWrapper>
  )
}
