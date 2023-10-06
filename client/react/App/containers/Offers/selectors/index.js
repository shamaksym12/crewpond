import { createSelector } from 'reselect';

const getLoadingState = state => state.offers.isLoading;
const getNavbarParams = state => state.settings.navbarParams;

export default createSelector([
  getLoadingState,
  getNavbarParams
], (isLoading, navbarParams) => ({
  isLoading,
  navbarParams
}));
