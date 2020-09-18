import React, { useState, useContext, Fragment } from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import { MessageList, Navbar as NavbarComponent, Avatar, Dropdown } from 'react-chat-elements'
import { mdiPaperclip, mdiDotsVertical, mdiArrowLeftBold } from '@mdi/js'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@mdi/react'
import { EditorState, convertToRaw, ContentState, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import ChatContext from '../context/chat/ChatContext'

const ChatBox = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const chatContext = useContext(ChatContext)
  const {
    signedInUser,
    targetUser,
    chatData,
    isSelectedUser,
    showUserList,
    handleSendChatData,
    handleBlockUser,
    handleShowUserList
  } = chatContext

  var setDomEditorRef = React.useRef()
  var attachFileRef = React.useRef()

  const keyBindingFunction = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.ctrlKey && event.key === 'Enter') {
      return getDefaultKeyBinding(event)
    }

    if (event.key === 'Enter') {
      onSendClicked()
      return
    }
    return getDefaultKeyBinding(event)
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  const onAttachFile = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('attachFile', e.target.files[0])

    fetch(`${process.env.REACT_APP_SERVER_URI}/api/attach-file`, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(json => {
        if (json.status) {
          const convertHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
          var subHtml = ''
          subHtml = convertHtml.substring(0, (convertHtml.length))

          const fileContainer = `<img src="${process.env.REACT_APP_SERVER_URI}/public/uploads/${json.fileName}" alt="${process.env.REACT_APP_SERVER_URI}/public/uploads/${json.fileName}">`
          const totalHtml = `${subHtml}${fileContainer}`

          const blocksFromHtml = htmlToDraft(totalHtml)
          const { contentBlocks, entityMap } = blocksFromHtml
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
          const editorStateChange = EditorState.createWithContent(contentState)
          setEditorState(editorStateChange)
        }
      })
  }

  const onSendClicked = () => {
    var messageText = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    if (messageText === '<p></p>\n') {
      return false
    }

    var message = {
      to: targetUser.id,
      message: {
        type: 'text',
        text: messageText,
        className: 'message'
      },
      from: signedInUser.id
    }
    handleSendChatData(message)
    setEditorState(EditorState.createEmpty())
    setDomEditorRef.current.focusEditor()
  }

  const onSelectDropdownItem = (e) => {
    switch (e) {
      case 0:
        return
      case 1:
        handleBlockUser(signedInUser.id, targetUser.id)
        break
      case 2:
        return
      default:
        return false
    }
  }

  return (
    <Fragment>
      {isSelectedUser ? (
        <div>
          <NavbarComponent
            left={
              <div>
                <Col mdHidden lgHidden>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => handleShowUserList(!showUserList)}
                    edge="start"
                    className="toggle-btn"
                  >
                    <Icon path={mdiArrowLeftBold }
                      title="User Profile"
                      size={1.3}
                      color="rgb(162 162 162)"
                      onClick={() => handleShowUserList(!showUserList)}
                    />
                  </IconButton>

                </Col>
                <Avatar
                  src={`${process.env.REACT_APP_SERVER_URI}/public/avatar/${targetUser.Avatar}`}
                  alt={'logo'}
                  size="large"
                  type="circle flexible"
                />
                <div className="user-info">
                  <p className="navBarText user-name">{targetUser.Name}</p>
                  <p className="navBarText user-title">{`${targetUser.Gender} ${targetUser.Age} ${targetUser.Country}`}</p>
                </div>
              </div>
            }
            right={
              <div>
                <Dropdown
                  buttonProps={{
                    text: <Icon path={mdiDotsVertical}
                      size={1}
                      horizontal
                      vertical
                      color={'#949aa2'}
                    />
                  }}
                  items={[
                    {
                      text: 'Your Profile'
                    },
                    {
                      text: ' Block'
                    },
                    {
                      text: 'Logout'
                    }
                  ]}
                  onSelect={(e) => onSelectDropdownItem(e)}
                />
              </div>
            }
          />
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={chatData.messages}
            downButton={true}
          />
          <FormGroup className="send-message-form">
            <Editor
              ref={setDomEditorRef}
              editorState={editorState}
              placeholder="Type a message..."
              wrapperClassName="demo-wrapper"
              toolbarClassName={'toggle-toolbar'}
              editorClassName="demo-editor"
              keyBindingFn={(e) => keyBindingFunction(e)}
              onEditorStateChange={(e) => onEditorStateChange(e)}
              toolbar={{
                options: [],
                inline: {
                  inDropdown: false,
                  options: []
                },
                image: { uploadEnabled: true },
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                fontSize: {
                  options: [8, 9, 10, 11, 12, 14, 16, 18, 20]
                }
              }}
            />
            <label htmlFor="attachFile" className="attach-file">
              <Icon path={mdiPaperclip}
                size={1}
                horizontal
                vertical
                rotate={225}
                color={'#949aa2'}
              />
              <i
                className="fas fa-paperclip toggle-icon"
              ></i>
            </label>
            <input
              ref={attachFileRef}
              onChange={(e) => onAttachFile(e)}
              type="file"
              id="attachFile"
              accept=".png, .jpg, .jpeg"
            />

            <div
              className="sendButton"
              onClick={() => onSendClicked()}
            >
              <svg className="jss4" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="#fff" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
            </div>
          </FormGroup>
        </div>
      ) : (
        <div className="landing-container">
          <Jumbotron>
            <img src={`${process.env.REACT_APP_SERVER_URI}/public/avatar/${signedInUser.Avatar}`} alt={signedInUser.Avatar}></img>
            <div className="landing-name">
              <h1>Welcome, { signedInUser ? signedInUser.Name : '' }!</h1>
              <p>Select a friend to start a chat.</p>
            </div>
          </Jumbotron>
        </div>
      )}
    </Fragment>
  )
}

export default ChatBox
