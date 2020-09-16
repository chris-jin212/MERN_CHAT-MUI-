import React, { Fragment, useState, useEffect, useContext } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import renderHtml from 'react-render-html'
import axios from 'axios'
import moment from 'moment'
import 'react-notifications/lib/notifications.css'
import 'react-chat-elements/dist/main.css'
import './index.css'

import { fetchUsers } from '../../../lib/api/request'
import ioSocket from '../../../lib/socket/index'
import ChatContext from '../../../context/chat/ChatContext'

import UserList from '../../../components/UserList'
import ChatBox from '../../../components/ChatBox'
import ChatState from '../../../context/chat/ChatState'
// import ErrorModal from '../../../components/common/ErrorModal'
// import LoadingModal from '../../../components/common/LoadingModal'

const ChatPage = (props) => {
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showChatBox, setShowChatBox] = useState(false)
  const [showChatList, setShowChatList] = useState(true)

  const chatContext = useContext(ChatContext)
  const {
    chatState,
    signedInUser,
    targetUser,
    usersList,
    chatData,
    handleSignIn,
    handleSetSignedInUser,
    handleLoadUsersList,
    handleActiveUser,
    handleAddChatData,
    handleBlockUserSuccess,
    handleReceivedMessageSave,
    handleChangeUsersList,
    handleLoadChatData,
    handleInActiveUser,
    handleSetErrorMessage,
    handleSetError
  } = chatContext

  useEffect(() => {
    initAxios()
    fetchSession()
    fetchUsers(window.localStorage.getItem('userId'))
      .then(
        users => {
          console.log("console users", users)
          users.map((user) => {
            var subTitle
            if (user.content && user.content != null) {
              subTitle = user.content
              subTitle = subTitle.replace('<p>', '')
              subTitle = subTitle.replace('</p>', '')
              if (subTitle.indexOf('<img') >= 0) {
                subTitle = 'PHOTO'
              }
            }
            user.id = user.uniId
            user.unread = Number(user.sum_unread)
            user.lastMessage = subTitle
            user.lastTime = user.time ? moment(user.time).format('hh:mm A') : ''
          })
          handleLoadUsersList(users)
        }
      )
    initialSocketConnection()
    // return () => {
    //   socket.off()
    // }
  }, [])

  useEffect(() => {
    if (socket !== null) {
      socket.off()
      setupSocketListeners()
    }
  }, [socket, targetUser, chatData, usersList])

  const initAxios = () => {
    axios.interceptors.request.use(
      config => {
        setLoading(true)
        return config
      },
      error => {
        setLoading(false)
        handleSetErrorMessage('Could not connect to server. try refreshing the page.')
        handleSetError(true)
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      response => {
        setLoading(false)
        return response
      },
      error => {
        setLoading(false)
        handleSetErrorMessage('Some error occured. try after sometime')
        return Promise.reject(error)
      }
    )
  }

  const fetchSession = () => {
    const userId = window.localStorage.getItem('userId')
    const userEmail = window.localStorage.getItem('myusername')
    const userName = localStorage.getItem('name')
    const signedInUser = {
      id: userId,
      email: userEmail,
      name: userName
    }
    // const signedInUser = {
    //   id: 55472,
    //   email: 'pakistaniproposal@gmail.com',
    //   name: 'Dejan Stankovic'
    // }
    handleSignIn(signedInUser)
  }

  const initialSocketConnection = () => {
    setSocket(ioSocket)
  }

  const onClientDisconnected = () => {
    NotificationManager.error(
      'Connection Lost from server please check your connection.',
      'Error!'
    )
  }

  const onReconnection = () => {
    if (signedInUser) {
      socket.emit('sign-in', signedInUser)
      NotificationManager.success('Connection Established.', 'Reconnected!')
    }
  }

  const setupSocketListeners = () => {
    socket.on('sign-in-confirm', (e) => onSignedInUserConfirm(e))
    socket.on('user-active', (e) => onHandleActiveUser(e))
    socket.on('load-chat-history', (e) => onLoadChatHistory(e))
    socket.on('message', (e) => onMessageRecieved(e))
    socket.on('block-user-success', (e) => onBlockUserSuccess(e))
    socket.on('in-active', (e) => onHandleInActiveUser(e))
    socket.on('reconnect', () => onReconnection())
    socket.on('disconnect', () => onClientDisconnected())
  }

  const onSignedInUserConfirm = (user) => {
    handleSetSignedInUser(user)
  }

  const onMessageRecieved = (message) => {
    var userChatData = { ...chatData }
    var messageData = message.message
    var messageDataText = messageData.text
    var displayMode = false

    var userId = message.from
    var lastTime = moment(new Date()).format('hh:mm A')
    var lastMessage = message.message.text.replace('<p>', '')

    lastMessage = lastMessage.replace('</p>', '')
    if (lastMessage.indexOf('<img') >= 0) {
      lastMessage = 'PHOTO'
    }

    if (Number(message.from) === Number(signedInUser.id)) {
      messageData.position = 'right'
      messageData.renderAddCmp = () => {
        return renderHtml(`<div className="message-text message-text-right">${messageDataText}</div>`)
      }
      messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${signedInUser.Avatar}`
      userId = message.to
      displayMode = true
    } else if (Number(message.from) === Number(targetUser.id)) {
      messageData.position = 'left'
      messageData.renderAddCmp = () => {
        return renderHtml(`<div className="message-text message-text-left">${messageDataText}</div>`)
      }
      messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${targetUser.Avatar}`
      handleReceivedMessageSave(message)
      displayMode = true
    } else {
      displayMode = false
    }

    /* Mark for message DateString */
    messageData.dateString = moment(message.time).format('hh:mm A')

    if (!userChatData.messages) {
      userChatData.messages = []
    } else {
      if (userChatData.messages.length > 0) {
        if (messageData.position === userChatData.messages[userChatData.messages.length - 1].position) {
          var prevMessage = userChatData.messages[userChatData.messages.length - 1]
          prevMessage.dateString = ''
          prevMessage.date = ''
          prevMessage.avatar = ''
        }
      }
    }

    if (displayMode === true) {
      handleAddChatData(messageData)
    }
    handleChangeUsersList({ lastMessage, userId, lastTime, unread: !displayMode })
  }

  const onBlockUserSuccess = (e) => {
    handleBlockUserSuccess(e)
  }

  const onLoadChatHistory = (chatHistory) => {
    console.log("chat history", chatHistory)
    var tempChatData = []

    chatHistory.map((data, id) => {
      var messageData = {}
      messageData.type = 'text'
      messageData.text = data.content
      messageData.className = 'message'
      // messageData.date = ''
      if (Number(data.from) === Number(signedInUser.id)) {
        messageData.position = 'right'
        messageData.renderAddCmp = () => {
          return renderHtml(`<div className="message-text message-text-right">${data.content}</div>`)
        }
        if (chatHistory[id + 1] && Number(chatHistory[id + 1].from) === Number(signedInUser.id)) {
          messageData.date = ''
          messageData.dateString = ''
          messageData.avatar = ''
        } else {
          messageData.dateString = moment(data.time).format('hh:mm A')
          messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${signedInUser.Avatar}`
        }
      } else {
        messageData.position = 'left'
        messageData.renderAddCmp = () => {
          return renderHtml(`<div className="message-text message-text-left">${data.content}</div>`)
        }
        if (chatHistory[id + 1] && Number(chatHistory[id + 1].from) === Number(data.from)) {
          messageData.date = ''
          messageData.dateString = ''
          messageData.avatar = ''
        } else {
          messageData.dateString = moment(data.time).format('hh:mm A')
          messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${targetUser.Avatar}`
        }
      }
      tempChatData = [...tempChatData, messageData]
    })

    handleLoadChatData(tempChatData)
  }

  const onHandleActiveUser = (e) => {
    handleActiveUser(e)
  }

  const onHandleInActiveUser = (e) => {
    handleInActiveUser(e)
  }

  const toggleViews = () => {
    setShowChatBox(!showChatBox)
    setShowChatList(!showChatList)
  }

  var chatBoxProps = showChatBox
    ? {
      xs: 12,
      sm: 12
    }
    : {
      xsHidden: true,
      smHidden: true
    }

  var chatListProps = showChatList
    ? {
      xs: 12,
      sm: 12
    }
    : {
      xsHidden: true,
      smHidden: true
    }
  return (
    <Fragment>
      <Grid style={{ width: '100%' }}>
        <Row className="show-grid">
          <Col {...chatListProps} className="user-list-sidebar" md={3}>
            {usersList ? (
              <UserList />
            ) : ''}
          </Col>
          <Col {...chatBoxProps} className="chat-body" md={9}>
            <ChatBox
              onBackPressed={() => toggleViews()}
            />
          </Col>
        </Row>
      </Grid>

      {/* <ErrorModal
        show={error}
        errorMessage={errorMessage}
      />
      <LoadingModal show={loading} />
      <NotificationContainer /> */}
    </Fragment>
  )
}

export default ChatPage
