import { mailConstants } from '../_constants';

export function mails(state = {}, action) {
  switch (action.type) {
    case mailConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case mailConstants.GETALL_SUCCESS:
      return {
        items: action.mails
      };
    case mailConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}