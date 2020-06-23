import { mailConstants } from '../_constants';

export function mailStatistics(state = {}, action) {
  switch (action.type) {
    case mailConstants.GETNROFUNREADS_REQUEST:
      return {
        loading: true
      };
    case mailConstants.GETNROFUNREADS_SUCCESS:
      return {
        numberOfUnreads: action.numberOfUndreadMails
      };
    case mailConstants.GETNROFUNREADS_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}