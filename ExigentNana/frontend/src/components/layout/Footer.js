import React, { Component } from "react";
import { BottomNavigation, BottomNavigationAction, AppBar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

export class Footer extends Component {
  render() {
    return (
      <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
        <BottomNavigation value="post" showLabels={false}>
          <BottomNavigationAction
            value="post"
            label="Add Post"
            icon={<AddIcon />}
            to="/post"
            component={Link}
          />
        </BottomNavigation>
      </AppBar>
    );
  }
}

export default Footer;
