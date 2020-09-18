/* eslint-disable no-tabs */
import React, { useReducer } from 'react'
import ChatContext from './ChatContext'
import ChatReducer from './ChatReducer'
import socket from '../../lib/socket/index'

import {
  LOAD_USERS_LIST,
  LOAD_CHAT_DATA,
  SET_TARGET_USER,
  SET_SIGNEDIN_USER,
  SET_NEW_CHAT_DATA,
  SET_FILTER_CATEGORY,
  SET_BLOCK_USER,
  CHANGE_USERS_LIST,
  SET_USER_IN_ACTIVE,
  SET_USER_ACTIVE,
  SET_SHOW_USER_LIST
} from '../types'

const ChatState = props => {
  const initialState = {
    signedInUser: {},
    targetUser: {},
    usersList: {},
    chatData: {},
    filterCategory: 'all',
    isSelectedUser: false,
    showSettingsModal: false,
    showUserList: true,
    error: false,
    errorMessage: ''
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
    }
  }

  const handleActiveUser = async (userId) => {
    try {
      dispatch({
        type: SET_USER_ACTIVE,
        userId
      })
    } catch {

    }
  }

  const handleSetTargetUser = async (signedInUser, targetUser) => {
    socket.emit('load-chat-history', { signedInUserId: signedInUser.id, targetUserId: targetUser.id })
    try {
      dispatch({
        type: SET_TARGET_USER,
        data: targetUser
      })
    } catch {

    }
  }

  const handleLoadChatData = async (data) => {
    try {
      dispatch({
        type: LOAD_CHAT_DATA,
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

  const handleBlockUser = async (signedInUserId, targetUserId) => {
    socket.emit('block-user', { signedInUserId, targetUserId })
    try {
      dispatch({
        type: SET_BLOCK_USER,
        signedInUserId,
        targetUserId
      })
    } catch {

    }
  }

  const handleBlockUserSuccess = async (targetUserId) => {
    try {
      dispatch({
        type: SET_BLOCK_USER,
        targetUserId
      })
    } catch {
    }
  }

  const handleReceivedMessageSave = async (data) => {
    socket.emit('received-message-save', data)
  }

  const handleChangeUsersList = async (data) => {
    try {
      dispatch({
        type: CHANGE_USERS_LIST,
        data
      })
    } catch {

    }
  }

  const handleInActiveUser = async (userId) => {
    try {
      dispatch({
        type: SET_USER_IN_ACTIVE,
        userId
      })
    } catch {

    }
  }

  const handleShowUserList = async (e) => {
    try {
      dispatch({
        type: SET_SHOW_USER_LIST,
        data: e
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
        showUserList: state.showUserList,
        handleSignIn,
        handleSetSignedInUser,
        handleLoadUsersList,
        handleActiveUser,
        handleSetTargetUser,
        handleLoadChatData,
        handleSendChatData,
        handleAddChatData,
        handleSetFilterCategory,
        handleBlockUser,
        handleBlockUserSuccess,
        handleReceivedMessageSave,
        handleChangeUsersList,
        handleInActiveUser,
        handleShowUserList,
        handleSetErrorMessage,
        handleSetError
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatState
