import { User } from "./User";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const SELECT_USER = "SELECT_USER";

interface UserAsync {
  loading: boolean;
  users: User[];
  error: string;
}

interface FetchUsersRequest extends UserAsync {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccess extends UserAsync {
  type: typeof FETCH_USERS_SUCCESS;
}

interface FetchUsersFailure extends UserAsync {
  type: typeof FETCH_USERS_FAILURE;
}

interface SelectUser {
  type: typeof SELECT_USER;
  username: string;
}

export type UserActionTypes =
  | FetchUsersRequest
  | FetchUsersSuccess
  | FetchUsersFailure
  | SelectUser;
