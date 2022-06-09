import { ADD_USER_SUCCESS, ADD_USER_FAIL } from "../constants/user.constant";

const initialState = {
  userList: [],
  notification: {},
  error: {},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USER_LIST_SUCCESS":
      return { ...state, userList: payload };
    case ADD_USER_SUCCESS:
      return { ...state, notification: payload };
    case ADD_USER_FAIL:
      return { ...state, notification: payload };
    case "CLOSE_NOTIFICATION": {
      state.notification.open = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default userReducer;
