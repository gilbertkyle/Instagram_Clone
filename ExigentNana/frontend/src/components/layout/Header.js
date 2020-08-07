import React, { Component, Fragment } from "react";
import { Button, Box, Typography, MenuIcon, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

export class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props;
    const authLinks = (
      <Fragment>
        <Typography>{user ? `Welcome ${user.username}` : ""}</Typography>
        <Box>
          <Button onClick={this.props.logout}>Log out</Button>
        </Box>
      </Fragment>
    );
    const unAuthLinks = (
      <Fragment>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </Fragment>
    );

    return (
      <Box display="flex" bgcolor="grey.200" p={2} alignItems="center">
        <Typography>ExigentNana</Typography>

        <Box flexGrow={1} textAlign="right">
          {this.props.isAuthenticated ? authLinks : unAuthLinks}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
