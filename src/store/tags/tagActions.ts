import { Dispatch } from "redux";

import { AppActions } from "../models/actions";

import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SELECT_TAG,
} from "./models/actions";
import { Tag } from "./models/Tag";

const requestTags = (): AppActions => ({
  type: FETCH_TAGS_REQUEST,
  loading: true,
  tags: [],
  error: "",
});

const receiveTags = (tags: Tag[]): AppActions => ({
  type: FETCH_TAGS_SUCCESS,
  loading: false,
  tags: tags,
  error: "",
});

const invalidateTags = (): AppActions => ({
  type: FETCH_TAGS_FAILURE,
  loading: false,
  tags: [],
  error: "Unable to fetch tag list",
});

export const selectTag = (title: string): AppActions => ({
  type: SELECT_TAG,
  title,
});

export const boundRequestTags = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(requestTags());
    return fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((json) => dispatch(receiveTags(json)));
  };
};
