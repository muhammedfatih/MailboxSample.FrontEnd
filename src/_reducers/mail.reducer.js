import { mailConstants } from '../_constants';

export function mail(state = {}, action) {
  switch (action.type) {
    case mailConstants.READ_REQUEST:
      return {
        loading: true
      };
    case mailConstants.READ_SUCCESS:
      return {
        item: action.mail
      };
    case mailConstants.READ_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}