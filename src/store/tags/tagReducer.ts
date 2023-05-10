import {
  TagActionTypes,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  SELECT_TAG,
} from "./models/actions";

import { Tag } from "./models/Tag";

interface TagState {
  loading: boolean;
  tags: Tag[];
  selectedTags: string[]; // Array of selected tag IDs
  error: string;
}

const defaultState: TagState = {
  loading: false,
  tags: [],
  selectedTags: [],
  error: "",
};

export const tagReducer = (
  state = defaultState,
  action: TagActionTypes
): TagState => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return { ...state, loading: true, tags: [], error: "" };
    case FETCH_TAGS_SUCCESS:
      return { ...state, loading: false, tags: action.tags, error: "" };
    case FETCH_TAGS_FAILURE:
      return { ...state, loading: false, tags: [], error: action.error };
    case SELECT_TAG:
      const selectedTags = state.selectedTags.includes(action.title)
        ? state.selectedTags.filter((title) => title !== action.title)
        : [...state.selectedTags, action.title];
      return { ...state, selectedTags };
    default:
      return state;
  }
};
