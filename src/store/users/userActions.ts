import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SELECT_USER,
  UserActionTypes,
} from "./models/actions";
import { User } from "./models/User";

const requestUsers = (): UserActionTypes => ({
  type: FETCH_USERS_REQUEST,
  loading: true,
  users: [],
  error: "",
});

const receiveUsers = (users: User[]): UserActionTypes => ({
  type: FETCH_USERS_SUCCESS,
  loading: false,
  users: users,
  error: "",
});

const invalidateUsers = (): UserActionTypes => ({
  type: FETCH_USERS_FAILURE,
  loading: false,
  users: [],
  error: "Unable to fetch user list",
});

export const selectUser = (username: string): UserActionTypes => ({
  type: SELECT_USER,
  username,
});

export const boundRequestUsers = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(requestUsers());
    return fetch(`https://fakestoreapi.com/users`)
      .then((res) => res.json())
      .then((json) => dispatch(receiveUsers(json)));
  };
};
