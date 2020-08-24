import {
  POSTS_LOADED,
  POSTS_LOADING,
  POSTS_FAILED,
  UPLOADING_POST,
  UPLOAD_FAIL,
  UPLOAD_SUCCESS,
  COMMENTS_LOADING,
  COMMENTS_LOADED,
  COMMENTS_FAILED,
  POST_SELECTED,
  MODAL_CLOSE
} from "../actions/types";

const initialState = {
  posts: [],
  isLoading: false,
  uploadSuccess: false,
  comments: [],
  selectedPost: null,
  modalOpen: false
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
    case COMMENTS_LOADING:
    case COMMENTS_FAILED:
      return {
        ...state
      };
    case COMMENTS_LOADED:
      return {
        ...state,
        comments: action.payload
      };
    case POST_SELECTED:
      return {
        ...state,
        selectedPost: action.payload,
        modalOpen: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false
      };
    default:
      return state;
  }
}
