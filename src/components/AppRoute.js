import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import './App.css';
import NavMenu from './NavMenu';

const useStyles = makeStyles((theme) => ({
  navMenu: {
    flexGrow: 1,
    minWidth: 120,
    maxWidth: 220,
    flexShrink: 0
  },
  mainContent: {
    flexGrow: 1,
    // flexShrink: 1
  }
}));

export default function AppRoute({ children }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item className={classes.navMenu}>
        <NavMenu />
      </Grid>
      <Grid item className={classes.mainContent}>
        {children}
      </Grid>
    </Grid>
  )
}
