import React, { useState, memo, useEffect, useRef, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils'

import {
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,
  changeCurrentLyricIndexAction
} from '../store/actionCreators'

import { Slider, message } from 'antd'

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'
import { NavLink } from 'react-router-dom'

const AppPlayerBar = memo(() => {
  // state and props
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  //  redux state
  const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(
    (state) => ({
      currentSong: state.getIn(['player', 'currentSong']),
      sequence: state.getIn(['player', 'sequence']),
      lyricList: state.getIn(['player', 'lyricList']),
      currentLyricIndex: state.getIn(['player', 'currentLyricIndex'])
    }),
    shallowEqual
  )

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongDetailAction(1819970423))
  }, [dispatch])
  // other
  const picUrl = (currentSong.al && currentSong.al.picUrl) || ''
  const duration = currentSong.dt || 0
  const showDeuation = formatDate(duration, 'mm:ss')
  const audioRef = useRef()
  const showCurrentTime = formatDate(currentTime, 'mm:ss')

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    })
  }, [currentSong])

  // handle function
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const timeUpdate = (e) => {
    const time = e.target.currentTime
    if (!isChanging) {
      setCurrentTime(time * 1000)
      setProgress((currentTime / duration) * 100)
    }

    // 获取当前歌词
    let lyricIndex = lyricList.findIndex(lyricItem => currentTime <= lyricItem.time) - 1
    // console.log(lyricList[currentLyricIndex])
    if (lyricIndex !== currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(lyricIndex))
      const content = lyricList[lyricIndex] && lyricList[lyricIndex].content
      message.open({
        content: content,
        duration: 0,
        key: "lyric",
        className: "lyric-class"
      })
    }
    
  }
  const handleMusicEnded = (e) => {
    if(sequence === 2) {
      // 单曲循环
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changeCurrentIndexAndSongAction(1))
    }
  }

  const changeSequence = () => {
    let currentSequence = sequence + 1
    if (currentSequence > 2) currentSequence = 0
    dispatch(changeSequenceAction(currentSequence))
  }

  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag))
  }

  const sliderChange = useCallback(
    (value) => {
      setIsChanging(true)
      const currentTime = (value / 100) * duration
      setCurrentTime(currentTime)
      setProgress(value)
    },
    [duration]
  )

  const afterChange = useCallback(
    (value) => {
      const currentTime = ((value / 100) * duration) / 1000
      audioRef.current.currentTime = currentTime
      setCurrentTime(currentTime * 1000)
      setIsChanging(false)

      if (!isPlaying) {
        playMusic()
      }
    },
    [duration, isPlaying, playMusic]
  )

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_player prev"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="sprite_player play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_player next"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="/todo" className="singer-name">
                {currentSong.ar && currentSong.ar[0].name}
              </a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onAfterChange={afterChange}
                onChange={sliderChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDeuation}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} onEnded={e => handleMusicEnded(e)}/>
    </PlaybarWrapper>
  )
})

export default AppPlayerBar
