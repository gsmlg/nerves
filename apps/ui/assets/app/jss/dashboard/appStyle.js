// ##############################
// // // App styles
// #############################

import { drawerWidth, transition, container } from 'jss/dashboard';

const appStyle = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100% - 123px)',
  },
  container,
  map: {
    marginTop: '70px',
  },
  textarea: {
    width: '760px',
    height: '220px',
    resize: 'both',
  },
  pre: {
    width: '760px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
});

export default appStyle;
