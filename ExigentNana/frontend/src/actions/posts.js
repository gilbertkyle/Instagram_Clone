import axios from "axios";
import { tokenConfig } from "./auth";
import { POSTS_LOADED, POSTS_LOADING, POSTS_FAILED } from "../actions/types";
import { returnErrors } from "./messages";

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
