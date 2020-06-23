import { mailConstants } from '../_constants';

export function compose(state = {}, action) {
  switch (action.type) {
    case mailConstants.CREATE_REQUEST:
      return { sent:false, sending: true };
    case mailConstants.CREATE_SUCCESS:
      return {sent:true, sending: false};
    case mailConstants.CREATE_FAILURE:
      return {sent:false, sending:false};
    default:
      return state
  }
}