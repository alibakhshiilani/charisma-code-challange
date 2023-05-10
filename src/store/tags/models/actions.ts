import { Tag } from "./Tag";

export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";
export const SELECT_TAG = "SELECT_TAG";

interface TagAsync {
  loading: boolean;
  tags: Tag[];
  error: string;
}

interface FetchTagsRequest extends TagAsync {
  type: typeof FETCH_TAGS_REQUEST;
}

interface FetchTagsSuccess extends TagAsync {
  type: typeof FETCH_TAGS_SUCCESS;
}

interface FetchTagsFailure extends TagAsync {
  type: typeof FETCH_TAGS_FAILURE;
}

interface SelectTag {
  type: typeof SELECT_TAG;
  title: string;
}

export type TagActionTypes =
  | FetchTagsRequest
  | FetchTagsSuccess
  | FetchTagsFailure
  | SelectTag;
