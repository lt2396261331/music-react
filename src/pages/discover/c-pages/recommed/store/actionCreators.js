import * as actionTypes from './constants'

import { getTopBanners, getHotRecommends } from '@/services/recommend'

export const ChangeTopBannerAction = res => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

export const getTopBannerAction = () => {
  return dispath => {
    getTopBanners().then((res) => {
      dispath(ChangeTopBannerAction(res))
    })
  }
}

export const ChangeHotRecommendAction = res => ({
  type: actionTypes.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result
})

export const getHotRecommendAction = (limit) => {
  return async (dispatch) => {
    const res = await getHotRecommends(limit)
    dispatch(ChangeHotRecommendAction(res))
  }
}

