import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import PostCard from "./PostCard";
import Modal from "./Modal";
import { Grid } from "@material-ui/core";

export class Profile extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get(`posts/${this.props.username}`).then(response => {
      this.setState({
        posts: response.data
      });
    });
  }
  componentDidUpdate() {
    console.log(this.state.posts);
  }
  render() {
    const { posts } = this.state;
    return (
      <Fragment>
        <Grid container spacing={2}>
          {posts.map((post, index) => {
            return <PostCard key={index} post={post} />;
          })}
        </Grid>
        <Modal />
      </Fragment>
    );
  }
}

export default Profile;
