import * as actionTypes from './constants'

import { getTopBanners, getHotRecommends, getNewAlbum, getTopList } from '@/services/recommend'

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

export const ChangeNewAlbum = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})

export const getNewAlbumAction = (limit) => {
  return async dispatch => {
    const res = await getNewAlbum(limit)
    dispatch(ChangeNewAlbum(res))
  }
}

export const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist
})
export const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})
export const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})

export const getTopListAction = idx => {
  return async dispatch => {
    const res = await getTopList(idx)
    switch(idx) {
      case 0:
        dispatch(changeUpRankingAction(res))
        break;
      case 2:
        dispatch(changeNewRankingAction(res))
        break;
      case 3:
        dispatch(changeOriginRankingAction(res))
        break
      default:
    }
  }
}

