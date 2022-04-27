import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import ThemeHeaderRCM from '@/components/theme-hander-rcm'
import TopRanking from '@/components/top-ranking'

import { getTopListAction } from '../../store/actionCreators'

import { RankingWrapper } from './style'

const RecommendRanking = memo(() => {
  // state和redux数据
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
      originRanking: state.getIn(['recommend', 'originRanking'])
    }),
    shallowEqual
  )


  // redux hooks
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))
  }, [dispatch])

  // other
  

  return (
    <div>
      <ThemeHeaderRCM title="推荐歌曲" />
      <RankingWrapper>
        <div className="tops">
          <TopRanking info={upRanking} />
          <TopRanking info={newRanking} />
          <TopRanking info={originRanking} />
        </div>
      </RankingWrapper>
    </div>
  )
})

export default RecommendRanking