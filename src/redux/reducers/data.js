import {
  STORE_TRIAL,
  SET_USER_ID
} from "../dataactions";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STORE_TRIAL:
      let {data} = state;
      const {
        userAction,
        block,
        mode,
        stimuli,
        correctAction,
        rule,
        attempts,
        reactionTime,
        startTime,
        time
      } = action;
      data.push({
       userAction,
        block,
        mode,
        stimuli,
        correctAction,
        rule,
        attempts,
        reactionTime,
        startTime,
        time
      });
      return {
        ...state,
        data: data,
      };
    case SET_USER_ID:
      return {
        ...state,
        user: action.id
      };
    default:
      return state;
  }
};
