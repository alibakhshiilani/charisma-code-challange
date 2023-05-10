import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  menu: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginLeft: theme.spacing(2),
    "&:first-child": {
      marginLeft: 30,
    },
  },
  menuLink: {
    color: "white",
    textDecoration: "none",
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Charisma</Typography>
          <ul className={classes.menu}>
            <li className={classes.menuItem}>
              <Link to="/" className={classes.menuLink}>
                Home
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/about" className={classes.menuLink}>
                About
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/contact" className={classes.menuLink}>
                Contact
              </Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container className={classes.container}>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
