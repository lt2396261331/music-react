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