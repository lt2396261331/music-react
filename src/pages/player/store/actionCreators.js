import { getSongDetail, getLyric } from '@/services/player'
import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'

import * as actionTypes from './constants'

export const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})

export const getSongDetailAction= (ids) => {
  return async (dispatch, getState) => {
    // 1.根据id查找playList中是否已经有了该歌曲
    const playList = getState().getIn(['player', 'playList'])
    const songIndex = playList.findIndex(song => song.id === ids)
    let song = null
    if(songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex))
      song = playList[songIndex]
      dispatch(changeCurrentSongAction(song))
    } else {
      // 没有找到
      const res = await getSongDetail(ids)
      song = res.songs && res.songs[0]
      if (!song) return

      // 将最新请求要的歌曲添加到播放列表中
      const newPlayList = [...playList]
      newPlayList.push(song)

      // 跟新 redux
      dispatch(changePlayListAction(newPlayList))
      dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
      dispatch(changeCurrentSongAction(song))
    }

    // 3.请求歌曲歌词
    if (!song) return
    dispatch(getLyricAction(song.id))
  }
}

export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(['player', 'playList'])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    switch(sequence) {
      case 1:
        let randomIndex = getRandomNumber(playList.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length)
        }
        currentSongIndex = randomIndex
        break;
      default:
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) currentSongIndex = 0
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1
    }

    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changeCurrentSongIndexAction(currentSongIndex))

    // 请求歌词
    dispatch(getLyricAction(currentSong.id))
  }
}

export const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
})

export const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
})

export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})

export const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRICS_LIST,
  lyricList
})

export const getLyricAction = (id) => {
  return async dispatch => {
    const res = await getLyric(id)
    const lyricList = parseLyric(res.lrc.lyric)
    dispatch(changeLyricListAction(lyricList))
  }
}

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHNAGE_LYRICE_INDEX,
  index
})
