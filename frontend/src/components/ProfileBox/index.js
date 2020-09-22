import React, { useState, useEffect, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Drawer, Divider } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiEmail,
  mdiCalendarRange,
  mdiCastEducation,
  mdiBuddhism,
  mdiTranslate,
  mdiHumanMaleHeight,
  mdiWeight,
  mdiWeb,
  mdiHomeCity,
  mdiStateMachine,
  mdiPhoneClassic,
  mdiCellphone
} from '@mdi/js';

import CloseButton from 'components/common/CloseButton';
import Title from 'components/common/Title';
import Avatar from 'components/common/Avatar';

import ChatContext from 'context/chat/ChatContext';

const formRows = [
  { title: 'User Email', value: 'ConfirmEmail', icon: mdiEmail },
  { title: 'User Birthday', value: 'DOB', icon: mdiCalendarRange },
  { title: 'User Education', value: 'Education', icon: mdiCastEducation },
  { title: 'User Religion', value: 'Religion', icon: mdiBuddhism },
  { title: 'User Language', value: 'Language', icon: mdiTranslate },
  { title: 'User Height', value: 'Height', icon: mdiHumanMaleHeight },
  { title: 'User Weight', value: 'Weight', icon: mdiWeight },
  { title: 'User City', value: 'City', icon: mdiHomeCity },
  { title: 'User State', value: 'State', icon: mdiStateMachine },
  { title: 'User Country', value: 'Country', icon: mdiWeb },
  { title: 'User Phone', value: 'Phone', icon: mdiPhoneClassic },
  { title: 'User Mobile', value: 'Mobile', icon: mdiCellphone }
];

const useStyles = makeStyles(theme => ({
  container: {
    width: '350px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '73px',
    alignItems: 'center',
    padding: '0px 20px !important'
  },
  avatarName: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '30px 0px !important'
  },
  body: {
    padding: '0px 30px !important'
  },
  body_item: {
    paddingTop: '17px'
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const chatContext = useContext(ChatContext);
  const [user, setUser] = useState({});
  const {
    targetUserDetails,
    signedInUser,
    detailMode,
    imageHash,
    showDetail,
    handleUserDetail,
    handleChangeImageHash,
    handleChangeProfileImage
  } = chatContext;

  let uploadInput = null;

  useEffect(() => {
    if (detailMode === 'signed-in') {
      setUser(signedInUser);
    } else if (detailMode === 'target') {
      setUser(targetUserDetails);
    }
  }, [detailMode, targetUserDetails, signedInUser]);

  const handleUploadImage = ev => {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', uploadInput.files[0]);
    data.append('fileName', signedInUser.Avatar);
    data.append('userId', signedInUser.id);

    fetch(`${process.env.REACT_APP_SERVER_URI}/api/profile/image`, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(json => {
        if (json.status) {
          handleChangeProfileImage(json.fileName);
          handleChangeImageHash(new Date());
        } else {
          alert('Server Error');
        }
      });
  };
  return (
    <div>
      <Drawer
        anchor={'right'}
        open={showDetail}
        onClose={() => handleUserDetail(detailMode, false)}
      >
        <Grid container spacing={1} className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.header}>
              <Title size={1.25} weight={500}>
                {detailMode === 'target' ? 'Contact Info' : 'Personal Info'}
              </Title>
              <CloseButton
                onClick={() => handleUserDetail(detailMode, false)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.avatarName}>
              <label htmlFor="imageUpload">
                <Avatar
                  src={`${process.env.REACT_APP_SERVER_URI}/public/avatar/${
                    user.Avatar === ''
                      ? `${user.Gender === 'Male' ? 'male.png' : 'female.png'}`
                      : user.Avatar
                  }?${imageHash}`}
                  size={9.375}
                />
              </label>
              {detailMode === 'signed-in' ? (
                <input
                  ref={ref => (uploadInput = ref)}
                  onChange={e => handleUploadImage(e)}
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  style={{ display: 'none' }}
                />
              ) : (
                ''
              )}
              <Title size={1.5} weight={600} py={0.8}>
                {user.Name}
              </Title>
              <Title size={0.75} transform={'uppercase'}>
                {user.Occupation}
              </Title>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.body}>
            {formRows.map(row => {
              return (
                <Grid container className={classes.body_item} key={row.title}>
                  <Grid item xs={2}>
                    <Tooltip title={row.title} arrow>
                      <Fragment>
                        <Icon
                          path={row.icon}
                          title={row.title}
                          size={1}
                          color="gray"
                        />
                      </Fragment>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={10}>
                    <Tooltip title={row.title} arrow>
                      <Fragment>
                        <Title size={1}>{user[row.value]}</Title>
                      </Fragment>
                    </Tooltip>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
