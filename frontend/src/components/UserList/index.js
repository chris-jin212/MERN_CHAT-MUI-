import React, { useContext, Fragment } from 'react';
import {
  ChatList,
  Navbar as NavbarContainer,
  Avatar
} from 'react-chat-elements';
import {
  mdiMessageText,
  mdiAccountTie,
  mdiFaceWoman,
  mdiHumanGreeting
} from '@mdi/js';
import Icon from '@mdi/react';

import ChatContext from 'context/chat/ChatContext';

const UserList = props => {
  const chatContext = useContext(ChatContext);
  const {
    usersList,
    filterCategory,
    signedInUser,
    showUserList,
    imageHash,
    handleSetTargetUser,
    handleSetFilterCategory,
    handleShowUserList,
    handleUserDetail
  } = chatContext;

  const getFilteredUserList = () => {
    switch (filterCategory) {
      case 'all':
        return usersList;
      case 'male':
        return usersList.filter(user => user.Gender === 'Male');
      case 'female':
        return usersList.filter(user => user.Gender === 'Female');
      case 'online':
        return usersList.filter(user => user.Active === 1);
      default:
        return usersList;
    }
  };

  const onUserClicked = e => {
    const selUser = { ...e };
    handleSetTargetUser(signedInUser, selUser.user);
    handleShowUserList(!showUserList);
  };

  const onClickFilterItem = category => {
    handleSetFilterCategory(category);
  };

  var users = getFilteredUserList();
  return (
    <Fragment>
      <NavbarContainer
        left={
          <div>
            <Avatar
              src={
                signedInUser.Avatar !== undefined
                  ? `${process.env.REACT_APP_SERVER_URI}/public/avatar/${
                      signedInUser.Avatar === ''
                        ? `${
                            signedInUser.Gender === 'Male'
                              ? 'male.png'
                              : 'female.png'
                          }`
                        : signedInUser.Avatar
                    }?${imageHash}`
                  : ``
              }
              alt={'logo'}
              size="large"
              type="circle flexible"
            />
            <div
              className="user-info"
              onClick={() => handleUserDetail('signed-in', true)}
            >
              <p className="navBarText">{signedInUser.Name}</p>
            </div>
          </div>
        }
      />
      <div className="filter-container">
        <div className="filter-item" onClick={() => onClickFilterItem('all')}>
          <Icon
            path={mdiMessageText}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'all' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'all' ? 'filter-name' : ''}>All</p>
        </div>
        <div className="filter-item" onClick={() => onClickFilterItem('male')}>
          <Icon
            path={mdiAccountTie}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'male' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'male' ? 'filter-name' : ''}>Male</p>
        </div>
        <div
          className="filter-item"
          onClick={() => onClickFilterItem('female')}
        >
          <Icon
            path={mdiFaceWoman}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'female' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'female' ? 'filter-name' : ''}>
            Female
          </p>
        </div>
        <div
          className="filter-item"
          onClick={() => onClickFilterItem('online')}
        >
          <Icon
            path={mdiHumanGreeting}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'online' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'online' ? 'filter-name' : ''}>
            Online
          </p>
        </div>
      </div>

      {users.length ? (
        <ChatList
          className="chat-list"
          dataSource={users.map((f, i) => {
            return {
              avatar:
                f.Avatar !== null
                  ? `${process.env.REACT_APP_SERVER_URI}/public/avatar/${
                      f.Avatar === ''
                        ? `${f.Gender === 'Male' ? 'male.png' : 'female.png'}`
                        : f.Avatar
                    }?${imageHash}`
                  : ``,
              alt: f.id,
              title: f.Name,
              subtitle: f.lastMessage,
              unread: f.unread,
              user: f,
              statusColor: f.Active ? '#25c193' : '#6c757d',
              statusColorType: 'badge',
              dateString: f.lastTime ? f.lastTime : ' '
            };
          })}
          onClick={e => onUserClicked(e)}
        />
      ) : (
        <div className="text-center no-users">No users to show.</div>
      )}
    </Fragment>
  );
};

export default UserList;
