import request from './request'

export function getTopBanners() {
  return request({
    url: '/banner'
  })
}

export function getHotRecommends(limit = 8) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit = 10) {
  return request({
    url: '/top/album',
    params: {
      limit
    }
  })
}

export function getTopList(idx) {
  return request({
    url: '/top/list',
    params: {
      idx
    }
  })
}
