import React, { Fragment } from 'react';
import { mdiClose } from '@mdi/js';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react';

const CloseButton = props => {
  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => props.onClick()}
        edge="start"
      >
        <Icon
          path={mdiClose}
          title="User Profile"
          size={1}
          color="rgb(162 162 162)"
        />
      </IconButton>
    </Fragment>
  );
};
export default CloseButton;
