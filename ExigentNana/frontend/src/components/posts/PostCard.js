import React, { Fragment, Component } from "react";
import { Grid, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getComments } from "../../actions/posts";
import PropTypes from "prop-types";
import { POST_SELECTED } from "../../actions/types";

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

/*
export const PostCard = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { post, getComments } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (comments.length == 0) {
      const comments = getComments();
      setComments(comments);
      console.log(comments);
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <DialogTitle>{post.caption}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={10}>
              <img src={post.image} className={classes.bigImage} />
            </Grid>
            <Grid item md={2}>
              <h5>Hello</h5>
              {comments}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Grid item xs={12} md={4} className={classes.gridBox}>
        <img src={post.image} className={classes.image} onClick={handleOpen} />
      </Grid>
    </Fragment>
  );
};
*/

class PostCard extends Component {
  state = {
    open: false,
    comments: []
  };

  static propTypes = {
    getComments: PropTypes.func.isRequired,
    comments: PropTypes.array
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
    this.props.getComments(this.props.post.id);
  };

  componentDidUpdate(prevProps) {}

  handleClick = () => {
    this.props.selectPost(this.props.post);
  };

  render() {
    const { classes, post } = this.props;

    return (
      <Fragment>
        <Grid item xs={12} md={4} className={classes.gridBox}>
          <img src={post.image} className={classes.image} onClick={this.handleClick} />
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.posts.comments
});

function mapDispatchToProps(dispatch) {
  return {
    selectPost: post =>
      dispatch({
        type: POST_SELECTED,
        payload: post
      }),
    getComments: getComments
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostCard));
