import {
  POSTS_LOADED,
  POSTS_LOADING,
  POSTS_FAILED,
  UPLOADING_POST,
  UPLOAD_FAIL,
  UPLOAD_SUCCESS
} from "../actions/types";

const initialState = {
  posts: [],
  isLoading: false,
  uploadSuccess: false
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
    case UPLOADING_POST:
      return {
        ...state,
        uploading: true
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploadSuccess: true
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploadSuccess: false
      };
    default:
      return state;
  }
}
