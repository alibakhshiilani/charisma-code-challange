import {
  UserActionTypes,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SELECT_USER,
} from "./models/actions";

import { User } from "./models/User";

interface UserState {
  loading: boolean;
  users: User[];
  selectedUsers: string[]; // Array of selected tag IDs
  error: string;
}

const defaultState: UserState = {
  loading: false,
  users: [],
  selectedUsers: [],
  error: "",
};

export const userReducer = (
  state = defaultState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, users: [], error: "" };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.users, error: "" };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, users: [], error: action.error };
    case SELECT_USER:
      const selectedUsers = state.selectedUsers.includes(action.username)
        ? state.selectedUsers.filter((username) => username !== action.username)
        : [...state.selectedUsers, action.username];
      return { ...state, selectedUsers };
    default:
      return state;
  }
};
