import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import ThemeHeaderRCM from '@/components/theme-hander-rcm'
import AlbumCover from '@/components/album-cover'

import { AlbumWrapper } from './style'

const NewAlbum = memo(() => {
  // state

  // redux hooks
  const { newAlbums } = useSelector((state) => ({
    newAlbums: state.getIn(['recommend', 'newAlbums'])
  }), shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNewAlbumAction())
  }, [dispatch])
  
  // other
  const pageRef = useRef()

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <div
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></div>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return <AlbumCover key={iten.id} info={iten} size={100} width={118} bgp="-570px"/>
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <div
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></div>
      </div>
    </AlbumWrapper>
  )
})

export default NewAlbum