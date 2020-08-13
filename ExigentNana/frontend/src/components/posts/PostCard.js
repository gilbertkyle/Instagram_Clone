import React, { useState, Fragment } from "react";
import {
  Modal,
  Grid,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    minWidth: 900
  }
}));

export const PostCard = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = <h1>I am a dialog</h1>;
  const { post } = props;

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <DialogTitle>{post.caption}</DialogTitle>
        <DialogContent>
          <img src={post.image} className={classes.bigImage} />
        </DialogContent>
      </Dialog>

      <Grid item xs={12} md={4} className={classes.gridBox}>
        <img src={post.image} className={classes.image} onClick={handleOpen} />
      </Grid>
    </Fragment>
  );
};
