import { POSTS_LOADED, POSTS_LOADING, POSTS_FAILED } from "../actions/types";

const initialState = {
  posts: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case POSTS_LOADED:
      return {
        ...state,
        isLoading: false,
        posts: action.payload
      };
    case POSTS_FAILED:
      return {
        ...state,
        posts: [],
        isLoading: false
      };
    default:
      return state;
  }
}
