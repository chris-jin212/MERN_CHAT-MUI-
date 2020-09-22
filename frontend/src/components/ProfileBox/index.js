import React, { useContext, Fragment } from 'react';
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
  const {
    targetUser,
    targetUserDetails,
    showTargetDetail,
    handleTargetUserDetail
  } = chatContext;

  const onCloseProfileDetails = () => {
    handleTargetUserDetail(targetUser.id, false);
  };

  return (
    <div>
      <Drawer
        anchor={'right'}
        open={showTargetDetail}
        onClose={() => handleTargetUserDetail(targetUser.id, false)}
      >
        <Grid container spacing={1} className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.header}>
              <Title size={1.25} weight={500}>
                Contact Info
              </Title>
              <CloseButton onClick={() => onCloseProfileDetails()} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.avatarName}>
              <Avatar
                src={`${process.env.REACT_APP_SERVER_URI}/public/avatar/${targetUserDetails.Avatar}`}
                size={9.375}
              />
              <Title size={1.5} weight={600} py={0.8}>
                {targetUserDetails.Name}
              </Title>
              <Title size={0.75} transform={'uppercase'}>
                {targetUserDetails.Occupation}
              </Title>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.body}>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Email" arrow>
                  <Fragment>
                    <Icon
                      path={mdiEmail}
                      title="User Email"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Email" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.ConfirmEmail}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Birthday" arrow>
                  <Fragment>
                    <Icon
                      path={mdiCalendarRange}
                      title="User Birthday"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Birthday" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.DOB}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Education" arrow>
                  <Fragment>
                    <Icon
                      path={mdiCastEducation}
                      title="User Education"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Education" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Education}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Religion" arrow>
                  <Fragment>
                    <Icon
                      path={mdiBuddhism}
                      title="User Religion"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Religion" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Religion}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Language" arrow>
                  <Fragment>
                    <Icon
                      path={mdiTranslate}
                      title="User Language"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Language" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Language}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Height" arrow>
                  <Fragment>
                    <Icon
                      path={mdiHumanMaleHeight}
                      title="User Height"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Height" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Height}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Weight" arrow>
                  <Fragment>
                    <Icon
                      path={mdiWeight}
                      title="User Weight"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Weight" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Weight}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User City" arrow>
                  <Fragment>
                    <Icon
                      path={mdiHomeCity}
                      title="User City"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User City" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.City}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User State" arrow>
                  <Fragment>
                    <Icon
                      path={mdiStateMachine}
                      title="User State"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User State" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.State}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Country" arrow>
                  <Fragment>
                    <Icon
                      path={mdiWeb}
                      title="User Country"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Country" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Country}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Phone" arrow>
                  <Fragment>
                    <Icon
                      path={mdiPhoneClassic}
                      title="User Phone"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Phone" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Phone}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container className={classes.body_item}>
              <Grid item xs={2}>
                <Tooltip title="User Mobile" arrow>
                  <Fragment>
                    <Icon
                      path={mdiCellphone}
                      title="User Mobile"
                      size={1}
                      color="gray"
                    />
                  </Fragment>
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="User Mobile" arrow>
                  <Fragment>
                    <Title size={1}>{targetUserDetails.Mobile}</Title>
                  </Fragment>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
