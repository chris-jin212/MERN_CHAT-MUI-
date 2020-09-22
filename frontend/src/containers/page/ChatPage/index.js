import React, { Fragment, useState, useEffect, useContext } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { NotificationManager } from 'react-notifications';
import renderHtml from 'react-render-html';
import moment from 'moment';
import 'react-chat-elements/dist/main.css';
import './index.css';

import { fetchUsers } from 'lib/api/request';
import ioSocket from 'lib/socket/index';
import ChatContext from 'context/chat/ChatContext';

import UserList from 'components/UserList/index';
import ChatBox from 'components/ChatBox/index';
import ProfileBox from 'components/ProfileBox';

const ChatPage = props => {
  const [socket, setSocket] = useState(null);

  const chatContext = useContext(ChatContext);
  const {
    signedInUser,
    targetUser,
    usersList,
    chatData,
    handleSignIn,
    showUserList,
    handleSetSignedInUser,
    handleLoadUsersList,
    handleActiveUser,
    handleAddChatData,
    handleBlockUserSuccess,
    handleReceivedMessageSave,
    handleChangeUsersList,
    handleLoadChatData,
    handleInActiveUser,
    handleTargetDetailsInfo
  } = chatContext;

  useEffect(() => {
    fetchSession();
    fetchUsers(window.localStorage.getItem('userId')).then(users => {
      users.map(user => {
        var subTitle;
        if (user.content && user.content != null) {
          subTitle = user.content;
          subTitle = subTitle.replace('<p>', '');
          subTitle = subTitle.replace('</p>', '');
          if (subTitle.indexOf('<img') >= 0) {
            subTitle = 'PHOTO';
          }
        }
        user.id = user.uniId;
        user.unread = Number(user.sum_unread);
        user.lastMessage = subTitle;
        user.lastTime = user.time ? moment(user.time).format('hh:mm A') : '';
        return false;
      });
      handleLoadUsersList(users);
    });
    initialSocketConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.off();
      setupSocketListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, targetUser, chatData, usersList]);

  const fetchSession = () => {
    const userId = window.localStorage.getItem('userId');
    const userEmail = window.localStorage.getItem('myusername');
    const userName = localStorage.getItem('name');
    const signedInUser = {
      id: userId,
      email: userEmail,
      name: userName
    };
    handleSignIn(signedInUser);
  };

  const initialSocketConnection = () => {
    setSocket(ioSocket);
  };

  const setupSocketListeners = () => {
    socket.on('sign-in-confirm', e => onSignedInUserConfirm(e));
    socket.on('user-active', e => onHandleActiveUser(e));
    socket.on('load-chat-history', e => onLoadChatHistory(e));
    socket.on('message', e => onMessageRecieved(e));
    socket.on('block-user-success', e => onBlockUserSuccess(e));
    socket.on('in-active', e => onHandleInActiveUser(e));
    socket.on('target-details', e => onHandleTargetDetailsInfo(e));
    socket.on('reconnect', () => onReconnection());
    socket.on('disconnect', () => onClientDisconnected());
  };

  const onSignedInUserConfirm = user => {
    handleSetSignedInUser(user);
  };

  const onHandleActiveUser = e => {
    handleActiveUser(e);
  };

  const onLoadChatHistory = chatHistory => {
    var tempChatData = [];

    chatHistory.map((data, id) => {
      var messageData = {};
      messageData.type = 'text';
      messageData.text = data.content;
      // messageData.className = 'message';
      if (Number(data.from) === Number(signedInUser.id)) {
        messageData.position = 'right';
        messageData.renderAddCmp = () => {
          return renderHtml(
            `<div className="message-text message-text-right">${data.content}</div>`
          );
        };
        if (
          chatHistory[id + 1] &&
          Number(chatHistory[id + 1].from) === Number(signedInUser.id)
        ) {
          messageData.date = '';
          messageData.dateString = '';
          messageData.avatar = '';
          messageData.className = '';
        } else {
          messageData.dateString = moment(data.time).format('hh:mm A');
          messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${signedInUser.Avatar}`;
          messageData.className = 'message';
        }
      } else {
        messageData.position = 'left';
        messageData.renderAddCmp = () => {
          return renderHtml(
            `<div className="message-text message-text-left">${data.content}</div>`
          );
        };
        if (
          chatHistory[id + 1] &&
          Number(chatHistory[id + 1].from) === Number(data.from)
        ) {
          messageData.date = '';
          messageData.dateString = '';
          messageData.avatar = '';
          messageData.className = '';
        } else {
          messageData.dateString = moment(data.time).format('hh:mm A');
          messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${targetUser.Avatar}`;
          messageData.className = 'message';
        }
      }
      tempChatData = [...tempChatData, messageData];
      return false;
    });

    handleLoadChatData(tempChatData);
  };

  const onMessageRecieved = message => {
    var userChatData = { ...chatData };
    var messageData = message.message;
    var messageDataText = messageData.text;
    var displayMode = false;

    var userId = message.from;
    var lastTime = moment(new Date()).format('hh:mm A');
    var lastMessage = message.message.text.replace('<p>', '');

    lastMessage = lastMessage.replace('</p>', '');
    if (lastMessage.indexOf('<img') >= 0) {
      lastMessage = 'PHOTO';
    }

    if (Number(message.from) === Number(signedInUser.id)) {
      messageData.position = 'right';
      messageData.renderAddCmp = () => {
        return renderHtml(
          `<div className="message-text message-text-right">${messageDataText}</div>`
        );
      };
      messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${signedInUser.Avatar}`;
      userId = message.to;
      displayMode = true;
    } else if (Number(message.from) === Number(targetUser.id)) {
      messageData.position = 'left';
      messageData.renderAddCmp = () => {
        return renderHtml(
          `<div className="message-text message-text-left">${messageDataText}</div>`
        );
      };
      messageData.avatar = `${process.env.REACT_APP_SERVER_URI}/public/avatar/${targetUser.Avatar}`;
      handleReceivedMessageSave(message);
      displayMode = true;
    } else {
      displayMode = false;
    }

    /* Mark for message DateString */
    messageData.dateString = moment(message.time).format('hh:mm A');

    if (!userChatData.messages) {
      userChatData.messages = [];
    } else {
      if (userChatData.messages.length > 0) {
        if (
          messageData.position ===
          userChatData.messages[userChatData.messages.length - 1].position
        ) {
          var prevMessage =
            userChatData.messages[userChatData.messages.length - 1];
          prevMessage.dateString = '';
          prevMessage.date = '';
          prevMessage.avatar = '';
          prevMessage.className = '';
        }
      }
    }

    if (displayMode === true) {
      handleAddChatData(messageData);
    }
    handleChangeUsersList({
      lastMessage,
      userId,
      lastTime,
      unread: !displayMode
    });
  };

  const onBlockUserSuccess = e => {
    handleBlockUserSuccess(e);
  };

  const onHandleInActiveUser = e => {
    handleInActiveUser(e);
  };

  const onHandleTargetDetailsInfo = e => {
    handleTargetDetailsInfo(e);
  };

  const onClientDisconnected = () => {
    NotificationManager.error(
      'Connection Lost from server please check your connection.',
      'Error!'
    );
  };

  const onReconnection = () => {
    if (signedInUser) {
      socket.emit('sign-in', signedInUser);
      NotificationManager.success('Connection Established.', 'Reconnected!');
    }
  };

  var chatBoxProps = !showUserList
    ? {
        xs: 12,
        sm: 12
      }
    : {
        xsHidden: true,
        smHidden: true
      };

  var chatListProps = showUserList
    ? {
        xs: 12,
        sm: 12
      }
    : {
        xsHidden: true,
        smHidden: true
      };
  return (
    <Fragment>
      <Grid style={{ width: '100%' }}>
        <Row className="show-grid">
          <Col {...chatListProps} className="user-list-sidebar" md={3}>
            {usersList ? <UserList /> : ''}
          </Col>
          <Col {...chatBoxProps} className="chat-body" md={9}>
            <ChatBox />
          </Col>
        </Row>
      </Grid>
      <ProfileBox />
    </Fragment>
  );
};

export default ChatPage;
