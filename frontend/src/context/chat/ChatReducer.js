import {
  LOAD_USERS_LIST,
  LOAD_CHAT_DATA,
  SET_TARGET_USER,
  SET_SIGNEDIN_USER,
  SET_NEW_CHAT_DATA,
  SET_FILTER_CATEGORY,
  SET_BLOCK_USER,
  CHANGE_USERS_LIST,
  SET_USER_ACTIVE,
  SET_USER_IN_ACTIVE
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

    case SET_USER_ACTIVE:
      return {
        ...state,
        usersList: state.usersList
          ? state.usersList.map(user =>
            Number(user.id) === Number(action.userId)
              ? {
                ...user,
                Active: 1
              }
              : user
          )
          : ''
      }
    case SET_TARGET_USER:
      return {
        ...state,
        targetUser: { ...action.data },
        isSelectedUser: true,
        usersList: state.usersList.map(user =>
          Number(user.id) === Number(action.data.id)
            ? { ...user, unread: 0 }
            : user
        ),
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
    case SET_BLOCK_USER:
      return {
        ...state,
        usersList: state.usersList.filter(({ id }) => id !== action.targetUserId)
      }
    case CHANGE_USERS_LIST:
      return {
        ...state,
        usersList: state.usersList.map(user =>
          Number(user.id) === Number(action.data.userId)
            ? {
              ...user,
              unread: action.data.unread ? user.unread + 1 : user.unread,
              lastMessage: action.data.lastMessage,
              lastTime: action.data.lastTime
            }
            : user
        )
      }
    case LOAD_CHAT_DATA:
      return {
        ...state,
        chatData: {
          messages: [...action.data]
        }
      }

    case SET_USER_IN_ACTIVE:
      return {
        ...state,
        usersList: state.usersList.map(user =>
          Number(user.id) === Number(action.userId)
            ? {
              ...user,
              Active: 0
            }
            : user
        )
      }
    default:
      return state
  }
}
