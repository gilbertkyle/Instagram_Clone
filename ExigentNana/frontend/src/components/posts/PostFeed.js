import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { retrievePosts } from "../../actions/posts";
import PropTypes from "prop-types";
import { withStyles, Grid, makeStyles } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import PostCard from "./PostCard";
import Modal from "./Modal";

const styles = theme => ({
  image: {
    maxWidth: 150
  }
});

export class PostFeed extends Component {
  static propTypes = {
    retrievePosts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.retrievePosts();
  }

  render() {
    const { posts, classes } = this.props;

    return (
      <Fragment>
        {posts.length > 0 ? <h2>My feed</h2> : <h2>Upload Something!</h2>}
        <Grid container spacing={2} style={{ minWidth: 200 }}>
          {posts.map((post, index) => {
            return <PostCard key={index} post={post} />;
          })}
        </Grid>
        <Modal />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.posts.posts,
  modalOpen: state.posts.modalOpen
});

export default connect(
  mapStateToProps,
  { retrievePosts }
)(withStyles(styles)(PostFeed));
