import axios from "axios";
import { tokenConfig } from "./auth";
import {
  POSTS_LOADED,
  POSTS_LOADING,
  POSTS_FAILED,
  UPLOADING_POST,
  UPLOAD_FAIL,
  UPLOAD_SUCCESS,
  COMMENT_FAIL,
  COMMENT_SUCCESS,
  COMMENTS_LOADING,
  COMMENTS_LOADED,
  COMMENTS_FAILED,
  FEED_RETRIEVE_FAIL,
  FEED_RETRIEVE_SUCCESS
} from "../actions/types";
import { returnErrors } from "./messages";

export const retrieveFeed = username => dispatch => {
  axios
    .get(`posts/feed/${username}`)
    .then(response => {
      dispatch({
        type: FEED_RETRIEVE_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: FEED_RETRIEVE_FAIL
      });
    });
};

export const retrievePosts = () => (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });
  axios
    .get("posts/all", tokenConfig(getState))
    .then(response => {
      dispatch({
        type: POSTS_LOADED,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: POSTS_FAILED
      });
    });
};

export const uploadPost = formData => dispatch => {
  dispatch({ type: UPLOADING_POST });

  axios
    .post("posts/", formData)
    .then(response => {
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: UPLOAD_FAIL
      });
    });
};

export const postComment = formData => dispatch => {
  axios
    .post("posts/comment", formData)
    .then(response => {
      dispatch({
        type: COMMENT_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: COMMENT_FAIL
      });
    });
};

export const getComments = post_id => dispatch => {
  dispatch({ type: COMMENTS_LOADING });
  const params = {
    params: {
      id: post_id
    }
  };

  axios
    .get("posts/comment", params)
    .then(response => {
      console.log(response);
      dispatch({
        type: COMMENTS_LOADED,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: COMMENTS_FAILED
      });
    });
};
