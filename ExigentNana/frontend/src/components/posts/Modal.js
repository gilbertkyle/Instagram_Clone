import React, { Component, Fragment } from "react";
import bindActionCreators, { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, Grid } from "@material-ui/core";
import withMediaQuery from "@material-ui/core/";
import { MODAL_CLOSE } from "../../actions/types";
import { postComment } from "../../actions/posts";
import PropTypes from "prop-types";

const styles = theme => ({
  image: {
    maxWidth: 150,
    display: "block",
    margin: "auto"
  },
  bigImage: {
    //maxWidth: 800,
    display: "block",
    margin: "auto",
    width: "100%"
  },
  gridBox: {
    borderColor: "black !important",
    borderWidth: "1px",
    borderStyle: "solid"
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "800",
    overflow: "auto"
  }
});

class Modal extends Component {
  state = {
    comment: ""
  };

  static propTypes = {
    postComment: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleClose = () => {
    this.props.closeModal();
  };

  handleComment = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", this.props.user.id);
    formData.append("comment", this.state.comment);
    formData.append("post", this.props.selectedPost.id);
    this.props.postComment(formData);
  };

  render() {
    const { classes, selectedPost, modalOpen } = this.props;
    let myDialog = <Fragment />;

    if (selectedPost) {
      myDialog = (
        <Dialog open={modalOpen} onClose={this.handleClose} classes={{ paper: classes.paper }}>
          <DialogTitle>{selectedPost.caption}</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} md={10}>
                <img src={selectedPost.image} className={classes.bigImage} />
              </Grid>
              <Grid item md={2}>
                {selectedPost.comments.map((comment, key) => {
                  return (
                    <Fragment>
                      <p>{comment.comment}</p>
                      <span>{new Date(comment.date_created).toLocaleString()}</span>
                    </Fragment>
                  );
                })}
                <form onSubmit={this.handleComment}>
                  <input type="text" name="comment" label="Post Comment" onChange={this.onChange} />
                  <button type="submit">Submit</button>
                </form>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      );
    }

    return myDialog;
  }
}

const mapStateToProps = state => ({
  comments: state.posts.comments,
  selectedPost: state.posts.selectedPost,
  modalOpen: state.posts.modalOpen,
  user: state.auth.user
});

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch({ type: MODAL_CLOSE }),
    postComment: formData => dispatch(postComment(formData))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Modal));
