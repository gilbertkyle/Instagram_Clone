import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, Grid } from "@material-ui/core";
import { MODAL_CLOSE } from "../../actions/types";

const styles = theme => ({
  image: {
    maxWidth: 150,
    display: "block",
    margin: "auto"
  },
  bigImage: {
    maxWidth: 800,
    display: "block",
    margin: "auto"
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
    minWidth: 1050,
    overflow: "auto"
  }
});

class Modal extends Component {
  handleClose = () => {
    this.props.closeModal();
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
                <h5>Hello</h5>
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
  modalOpen: state.posts.modalOpen
});

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch({ type: MODAL_CLOSE })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Modal));
