import { createSelector } from 'reselect';

/**
 * Direct selector to the nodePage state domain
 */
export const selectHomeDomain = (state) => state.get('home');

/**
 * Other specific selectors
 */
export const makeSelectChannel = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('channel')
);

export const makeSelectCode = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('code')
);

export const makeSelectOutput = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('output')
);

/**
 * Default selector used by NodePage
 */
export const makeSelectHome = () => createSelector(
  selectHomeDomain,
  (substate) => substate.toJS()
);

export default makeSelectHome;
