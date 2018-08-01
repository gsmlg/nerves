/*
 *
 * HomePage actions
 *
 */

import {
  INIT,
  MOUNT,
  UNMOUNT,
  SET_CHANNEL,
  RUN_CODE,
  WRITE_CODE,
  WRITE_OUTPUT,
} from './constants';

export function init() {
  return {
    type: INIT,
    payload: {},
  };
}

export function mount() {
  return {
    type: MOUNT,
    payload: {},
  };
}

export function unmount() {
  return {
    type: UNMOUNT,
    payload: {},
  };
}

export function setChannel(channel) {
  return {
    type: SET_CHANNEL,
    payload: { channel },
  };
}

export function runCode() {
  return {
    type: RUN_CODE,
    payload: {},
  };
}

export function writeCode(code) {
  return {
    type: WRITE_CODE,
    payload: { code },
  };
}

export function writeOutput(output) {
  return {
    type: WRITE_OUTPUT,
    payload: { output },
  };
}
