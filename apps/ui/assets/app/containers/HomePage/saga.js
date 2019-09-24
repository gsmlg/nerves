import {
  takeLatest, take, call, put, select,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  INIT,
  MOUNT,
  RUN_CODE,
} from './constants';
import {
  makeSelectSocket,
} from '../Phoenix/selectors';
import {
  setChannel,
  writeOutput,
} from './actions';
import {
  makeSelectChannel,
  makeSelectCode,
} from './selectors';

export function* init() {
  const params = {};
  const socket = yield select(makeSelectSocket());

  try {
    const channel = socket.channel('eval:lobby', {});
    yield put(setChannel(channel));
  } catch (err) {
    console.error(err);
  }
}

function createChannel(channel) {
  return eventChannel((emitter) => {
    channel.on('eval_output', (payload) => {
      emitter(writeOutput(payload.output));
    });
    return () => channel.off();
  });
}

export function* join() {
  const channel = yield select(makeSelectChannel());

  try {
    channel.join();
    const conn = yield call(createChannel, channel);
    while (true) {
      const action = yield take(conn);
      yield put(action);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* sendCode() {
  const channel = yield select(makeSelectChannel());
  const code = yield select(makeSelectCode());

  channel.push('run_code', { code });
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(INIT, init);
  yield takeLatest(MOUNT, join);
  yield takeLatest(RUN_CODE, sendCode);
}
