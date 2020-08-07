import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TextField, Input, FormControl, InputLabel, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";

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

  fileSelectedHandler = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  fileUploadHandler = () => {
    const { user } = this.props;
    const fd = new FormData();
    fd.append("image", this.state.image, this.state.image.name);
    fd.append("caption", "test caption");
    fd.append("author", user.id);

    axios
      .post("posts/", fd)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
          <FormControl>
            <TextField multiline rows={4} name="caption" />
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
  user: state.auth.user
});

export default connect(mapStateToProps)(withStyles(styles)(PostForm));
