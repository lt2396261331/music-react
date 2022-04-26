import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getHotRecommendAction } from '../../store/actionCreators'

import { HotRecommendWrapper } from './style'

import ThemeHeaderRCM from '@/components/theme-hander-rcm'

import SongsCover from '@/components/song-cover'

const HotRecommend = memo(() => {
  // state

  // redux hooks
  const { hotRecommends } = useSelector((state) => ({
    hotRecommends: state.getIn(['recommend', 'hotRecommends'])
  }), shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHotRecommendAction())
  }, [dispatch])

  // other hooks
  
  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '民谣', '摇滚', '电子']}
      />
      <div className='recommend-list'>{hotRecommends.map((item, index) => {
        return <SongsCover info={item} key={item.picUrl}/>
      })}</div>
    </HotRecommendWrapper>
  )
})

export default HotRecommend