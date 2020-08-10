import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { retrievePosts } from "../../actions/posts";
import PropTypes from "prop-types";

export class PostFeed extends Component {
  static propTypes = {
    retrievePosts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.retrievePosts();
  }

  render() {
    const { posts } = this.props;
    console.log(posts);

    return (
      <Fragment>
        <h2>My feed</h2>
        {posts.map(post => {
          return (
            <Fragment>
              <p>{post.caption}</p>
              <img src={post.image}></img>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  { retrievePosts }
)(PostFeed);
