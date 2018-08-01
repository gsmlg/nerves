/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// creates a beautiful scrollbar
import { withStyles } from '@material-ui/core';

import {
  Header,
  Footer,
  Sidebar,
  Button,
} from 'components';

import appStyle from 'jss/dashboard/appStyle';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCode, makeSelectOutput } from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.init();
  }

  componentDidMount() {
    this.props.mount();
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  render() {
    const {
      classes,
      writeCode,
      runCode,
      code,
      output,
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref={(el) => { this.mainPanel = el; }}>
          <div className={classes.map}>
            <h3>Code:</h3>
            <textarea className={classes.textarea} onInput={(evt) => writeCode(evt.target.value)} value={code} />
            <br/>
            <Button onClick={runCode}>run</Button>
            <h3>Output:</h3>
            <pre className={classes.pre}>{output}</pre>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  output: makeSelectOutput(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions,
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(appStyle),
)(HomePage);
