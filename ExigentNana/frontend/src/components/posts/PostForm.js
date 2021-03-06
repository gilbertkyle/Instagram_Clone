import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TextField, Input, FormControl, InputLabel, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { uploadPost } from "../../actions/posts";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  }
});

export class PostForm extends Component {
  state = {
    image: null,
    caption: ""
  };

  static propTypes = {
    uploadPost: PropTypes.func.isRequired,
    uploadSuccess: PropTypes.bool
  };

  fileSelectedHandler = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  handleCaptionChange = e => {
    this.setState({ caption: e.target.value });
  };

  fileUploadHandler = () => {
    const { user } = this.props;
    const fd = new FormData();
    fd.append("image", this.state.image, this.state.image.name);
    fd.append("caption", this.state.caption);
    fd.append("author", user.id);

    this.props.uploadPost(fd);
  };

  render() {
    const { user, uploadSuccess } = this.props;
    if (user == null) {
      return <Redirect to="/login" />;
    }
    if (uploadSuccess) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
          <FormControl>
            <TextField multiline rows={4} name="caption" onChange={this.handleCaptionChange} />
          </FormControl>
          <FormControl>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.fileSelectedHandler}
              name="image"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </FormControl>
          <FormControl>
            <Button onClick={this.fileUploadHandler}>Upload</Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  uploadSuccess: state.posts.uploadSuccess
});

export default connect(
  mapStateToProps,
  { uploadPost }
)(withStyles(styles)(PostForm));
