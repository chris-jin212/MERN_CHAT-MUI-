/* eslint-disable no-tabs */
import React, { useReducer } from 'react'
import ChatContext from './ChatContext'
import ChatReducer from './ChatReducer'
import socket from '../../lib/socket/index'

import {
  LOAD_USERS_LIST,
  SET_TARGET_USER,
  SET_SIGNEDIN_USER,
  SET_NEW_CHAT_DATA,
  SET_FILTER_CATEGORY
} from '../types'

const ChatState = props => {
  const initialState = {
    signedInUser: {},
    targetUser: {},
    usersList: {},
    chatData: {},
    filterCategory: 'all',
    isSelectedUser: false,
    error: false,
    errorMessage: '',
    showSettingsModal: false
  }

  // eslint-disable-next-line react/prop-types
  const { children } = props
  const [state, dispatch] = useReducer(ChatReducer, initialState)

  const handleSignIn = async (data) => {
    try {
      socket.emit('sign-in', data)
    } catch {

    }
  }

  const handleSetSignedInUser = async (data) => {
    try {
      dispatch({
        type: SET_SIGNEDIN_USER,
        data
      })
    } catch (err) {

    }
  }

  const handleLoadUsersList = async (data) => {
    try {
      dispatch({
        type: LOAD_USERS_LIST,
        data
      })
    } catch (err) {
      // dispatch({
      // 	type:
      // 	data:
      // })
    }
  }

  const handleSetTargetUser = async (data) => {
    try {
      dispatch({
        type: SET_TARGET_USER,
        data
      })
    } catch {

    }
  }

  const handleSendChatData = async (data) => {
    try {
      socket.emit('message', data)
    } catch {

    }
  }

  const handleAddChatData = async (data) => {
    try {
      dispatch({
        type: SET_NEW_CHAT_DATA,
        data
      })
    } catch {

    }
  }

  const handleSetFilterCategory = async (data) => {
    try {
      dispatch({
        type: SET_FILTER_CATEGORY,
        data
      })
    } catch {

    }
  }

  const handleSetErrorMessage = async (data) => {
    try {

    } catch {

    }
  }

  const handleSetError = async (data) => {
    try {

    } catch {

    }
  }

  return (
    <ChatContext.Provider
      value={{
        chatState: state, // Test for development mode
        signedInUser: state.signedInUser,
        targetUser: state.targetUser,
        usersList: state.usersList,
        chatData: state.chatData,
        filterCategory: state.filterCategory,
        isSelectedUser: state.isSelectedUser,
        error: state.error,
        errorMessage: state.errorMessage,
        showSettingsModal: state.showSettingsModal,
        handleSignIn,
        handleSetSignedInUser,
        handleLoadUsersList,
        handleSetTargetUser,
        handleSendChatData,
        handleAddChatData,
        handleSetFilterCategory,
        handleSetErrorMessage,
        handleSetError
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatState
