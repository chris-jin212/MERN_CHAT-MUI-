import {
  LOAD_USERS_LIST,
  SET_TARGET_USER,
  SET_SIGNEDIN_USER,
  SET_NEW_CHAT_DATA,
  SET_FILTER_CATEGORY
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case LOAD_USERS_LIST:
      return {
        ...state,
        usersList: action.data
      }
    case SET_SIGNEDIN_USER:
      return {
        ...state,
        signedInUser: { ...action.data }
      }
    case SET_TARGET_USER:
      return {
        ...state,
        targetUser: { ...action.data },
        isSelectedUser: true,
        chatData: {
          messages: []
        }
      }
    case SET_NEW_CHAT_DATA:
      return {
        ...state,
        chatData: {
          messages: [
            ...state.chatData.messages, action.data
          ]
        }
      }
    case SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.data
      }
    default:
      return state
  }
}
