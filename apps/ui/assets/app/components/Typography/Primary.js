import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import typographyStyle from 'jss/dashboard/typographyStyle';

function Primary({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={`${classes.defaultFontStyle} ${classes.primaryText}`}>
      {children}
    </div>
  );
}

Primary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(Primary);
