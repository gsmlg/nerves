/*
 *
 * Phoenix reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT,
  MOUNT,
  UNMOUNT,
  SET_CHANNEL,
  WRITE_CODE,
  WRITE_OUTPUT,
} from './constants';

const initialState = fromJS({
  channel: null,
  code: '',
  output: '',
});

function phoenixReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INIT:
      return state;
    case MOUNT:
      return state;
    case UNMOUNT:
      return state.merge(initialState);
    case SET_CHANNEL:
      return state.set('channel', payload.channel);
    case WRITE_CODE:
      return state.set('code', payload.code);
    case WRITE_OUTPUT:
      return state.set('output', payload.output);
    default:
      return state;
  }
}

export default phoenixReducer;
