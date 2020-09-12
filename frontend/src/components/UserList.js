import React, { useState, useContext, Fragment } from 'react'
import { ChatList, Navbar as NavbarContainer, Avatar } from 'react-chat-elements'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import { mdiPaperclip, mdiDotsVertical, mdiMessageText, mdiAccountTie, mdiFaceWoman, mdiHumanGreeting } from '@mdi/js'
import Icon from '@mdi/react'

import ChatContext from '../context/chat/ChatContext'

const UserList = (props) => {
  const [searchQuery, setSearchQuery] = useState()

  const chatContext = useContext(ChatContext)
  const {
    usersList,
    filterCategory,
    signedInUser,
    handleSetTargetUser,
    handleSetFilterCategory
  } = chatContext

  const searchInput = (e) => {
    const value = e.target.value
    let searchQuery = null
    if (value) {
      searchQuery = value
    }
    setSearchQuery(searchQuery)
  }

  const getFilteredUserList = () => {
    switch (filterCategory) {
      case 'all':
        return usersList
      case 'male':
        return usersList.filter(user =>
          user.Gender === 'Male'
        )
      case 'female':
        return usersList.filter(user =>
          user.Gender === 'Female'
        )
      case 'online':
        return usersList.filter(user =>
          user.Active === 1
        )
    }
  }

  const onUserClicked = (e) => {
    const selUser = { ...e }
    handleSetTargetUser(selUser.user)
  }

  const onClickFilterItem = (category) => {
    handleSetFilterCategory(category)
  }

  var users = getFilteredUserList()
  return (
    <Fragment>
      {/* <FormGroup>
        <FormControl
          type="text"
          placeholder="Search for a user here..."
          onInput={() => searchInput()}
        />
      </FormGroup> */}

      <NavbarContainer
        left={
          <div>
            <Avatar
              src={`${process.env.REACT_APP_SERVER_URI}/public/avatar/${signedInUser.Avatar}`}
              alt={'logo'}
              size="large"
              type="circle flexible"
            />
            <div className="user-info">
              <p className="navBarText">{signedInUser.Name}</p>
            </div>
          </div>
        }
        right={
          <div>
            <Icon path={mdiDotsVertical}
              size={1}
              horizontal
              vertical
              rotate={180}
              color={'#949aa2'}
            />
          </div>
        }
      />

      {/* <NavbarContainer
        center={ */}
      <div className="filter-container">
        <div className='filter-item' onClick={() => onClickFilterItem('all')} >
          <Icon path={mdiMessageText}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'all' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'all' ? 'filter-name' : ''}>All</p>
        </div>
        <div className='filter-item' onClick={() => onClickFilterItem('male')} >
          <Icon path={mdiAccountTie}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'male' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'male' ? 'filter-name' : ''}>Male</p>
        </div>
        <div className='filter-item' onClick={() => onClickFilterItem('female')} >
          <Icon path={mdiFaceWoman}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'female' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'female' ? 'filter-name' : ''}>Female</p>
        </div>
        <div className='filter-item' onClick={() => onClickFilterItem('online')}>
          <Icon path={mdiHumanGreeting}
            size={1}
            horizontal
            vertical
            rotate={180}
            color={filterCategory === 'online' ? '#007bff' : '#949aa2'}
          />
          <p className={filterCategory === 'online' ? 'filter-name' : ''}>Online</p>
        </div>
      </div>
      {/* }
      /> */}

      {users.length ? (
        <ChatList
          className="chat-list"
          dataSource={users.map((f, i) => {
            let subtitle = 'Hello'
            if (
              f.messages &&
              f.messages.length
            ) {
              const lastMessage = f.messages[f.messages.length - 1]
              subtitle = lastMessage.text
            }
            return {
              // avatar: require(`../static/images/avatar/${f.id}.jpg`),
              avatar: `${process.env.REACT_APP_SERVER_URI}/public/avatar/${f.Avatar}`,
              alt: f.id,
              title: f.Name,
              subtitle: f.lastMessage,
              date: new Date(),
              unread: f.unread,
              user: f,
              statusColor: f.Active ? '#25c193' : '#6c757d',
              statusColorType: 'badge'
            }
          })}
          onClick={
            (e) => onUserClicked(e)
          }
        />
      ) : (
        <div className="text-center no-users">No users to show.</div>
      )}
    </Fragment>
  )
}

export default UserList
