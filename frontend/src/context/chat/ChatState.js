/* eslint-disable no-tabs */
import React, { useReducer } from 'react';
import ChatContext from './ChatContext';
import ChatReducer from './ChatReducer';
import socket from 'lib/socket/index';

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
  SET_SHOW_USER_LIST,
  SHOW_DETAIL_SIDEBAR,
  SET_TARGET_DETAILS_INFO,
  CHANGE_IMAGE_HASH,
  CHANGE_PROFILE_IMAGE
} from '../types';

const ChatState = props => {
  const initialState = {
    signedInUser: {},
    targetUser: {},
    targetUserDetails: {},
    usersList: [],
    chatData: {},
    filterCategory: 'all',
    isSelectedUser: false,
    showSettingsModal: false,
    showUserList: true,
    detailMode: '',
    iamgeHash: new Date(),
    error: false,
    errorMessage: ''
  };

  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const handleSignIn = async data => {
    try {
      socket.emit('sign-in', data);
    } catch {}
  };

  const handleSetSignedInUser = async data => {
    try {
      dispatch({
        type: SET_SIGNEDIN_USER,
        data
      });
    } catch (err) {}
  };

  const handleLoadUsersList = async data => {
    try {
      dispatch({
        type: LOAD_USERS_LIST,
        data
      });
    } catch (err) {}
  };

  const handleActiveUser = async userId => {
    try {
      dispatch({
        type: SET_USER_ACTIVE,
        userId
      });
    } catch {}
  };

  const handleSetTargetUser = async (signedInUser, targetUser) => {
    socket.emit('load-chat-history', {
      signedInUserId: signedInUser.id,
      targetUserId: targetUser.id
    });
    try {
      dispatch({
        type: SET_TARGET_USER,
        data: targetUser
      });
    } catch {}
  };

  const handleLoadChatData = async data => {
    try {
      dispatch({
        type: LOAD_CHAT_DATA,
        data
      });
    } catch {}
  };

  const handleSendChatData = async data => {
    try {
      socket.emit('message', data);
    } catch {}
  };

  const handleAddChatData = async data => {
    try {
      dispatch({
        type: SET_NEW_CHAT_DATA,
        data
      });
    } catch {}
  };

  const handleSetFilterCategory = async data => {
    try {
      dispatch({
        type: SET_FILTER_CATEGORY,
        data
      });
    } catch {}
  };

  const handleBlockUser = async (signedInUserId, targetUserId) => {
    socket.emit('block-user', { signedInUserId, targetUserId });
    try {
      dispatch({
        type: SET_BLOCK_USER,
        signedInUserId,
        targetUserId
      });
    } catch {}
  };

  const handleBlockUserSuccess = async targetUserId => {
    try {
      dispatch({
        type: SET_BLOCK_USER,
        targetUserId
      });
    } catch {}
  };

  const handleReceivedMessageSave = async data => {
    socket.emit('received-message-save', data);
  };

  const handleChangeUsersList = async data => {
    try {
      dispatch({
        type: CHANGE_USERS_LIST,
        data
      });
    } catch {}
  };

  const handleInActiveUser = async userId => {
    try {
      dispatch({
        type: SET_USER_IN_ACTIVE,
        userId
      });
    } catch {}
  };

  const handleShowUserList = async e => {
    try {
      dispatch({
        type: SET_SHOW_USER_LIST,
        data: e
      });
    } catch {}
  };

  const handleUserDetail = async (mode, show) => {
    try {
      dispatch({
        type: SHOW_DETAIL_SIDEBAR,
        data: { show, mode }
      });
    } catch {}
  };

  const handleTargetDetailsInfo = async userInfo => {
    try {
      dispatch({
        type: SET_TARGET_DETAILS_INFO,
        data: userInfo
      });
    } catch {}
  };

  const handleChangeImageHash = async data => {
    try {
      dispatch({
        type: CHANGE_IMAGE_HASH,
        data
      });
    } catch {}
  };

  const handleChangeProfileImage = async data => {
    try {
      dispatch({
        type: CHANGE_PROFILE_IMAGE,
        data
      });
    } catch {}
  };

  const handleSetErrorMessage = async data => {
    try {
    } catch {}
  };

  const handleSetError = async data => {
    try {
    } catch {}
  };

  return (
    <ChatContext.Provider
      value={{
        chatState: state, // Test for development mode
        signedInUser: state.signedInUser,
        targetUser: state.targetUser,
        targetUserDetails: state.targetUserDetails,
        usersList: state.usersList,
        chatData: state.chatData,
        filterCategory: state.filterCategory,
        isSelectedUser: state.isSelectedUser,
        error: state.error,
        errorMessage: state.errorMessage,
        showSettingsModal: state.showSettingsModal,
        showUserList: state.showUserList,
        showDetail: state.showDetail,
        detailMode: state.detailMode,
        imageHash: state.imageHash,
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
        handleUserDetail,
        handleTargetDetailsInfo,
        handleChangeImageHash,
        handleChangeProfileImage,
        handleSetErrorMessage,
        handleSetError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatState;
