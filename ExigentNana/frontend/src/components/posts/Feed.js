import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles, Grid, makeStyles, Container } from "@material-ui/core";
import { retrieveFeed } from "../../actions/posts";

const styles = theme => ({
  image: {
    maxWidth: 150
  }
});

const PostDisplay = props => {
  return (
    <Fragment>
      <span>{props.post.caption}</span>
      <img src={props.post.image} />
    </Fragment>
  );
};

export class Feed extends Component {
  static propTypes = {
    retrieveFeed: PropTypes.func.isRequired
  };

  componentDidMount() {
    //this.props.retrieveFeed(this.props.user.username);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user != prevProps.user) {
      this.props.retrieveFeed(this.props.user.username);
    }
  }

  render() {
    const { posts, classes, feed } = this.props;

    return (
      <Container>
        {feed.map((post, index) => {
          return <PostDisplay post={post} key={index} />;
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.posts.posts,
  feed: state.posts.feed
});

export default connect(
  mapStateToProps,
  { retrieveFeed }
)(withStyles(styles)(Feed));
