import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import request from '../utils/request';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 640,
    margin: 'auto'
  },
  header: {
    marginBottom: theme.spacing(4)
  },
  form: {
    marginTop: theme.spacing(2),

    '& > *': {
      marginBottom: theme.spacing(2)
    }
  },
  warning: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));


export default function Locast() {
  const classes = useStyles();
  const [status, setStatus] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', credentials);
    request('locast/login', { method: 'POST', body: credentials }).then(res => {
      console.log('response', res);
    });
  }
  const handleChange = useCallback((e, field) => {
    setCredentials({ ...credentials, [field]: e.target.value });
  }, [credentials, setCredentials]);

  useEffect(() => {
    request('locast/status').then(res => {
      setStatus(res);
    });
  }, [setStatus]);

  const donationActive = () => {
    const ts = Date.now();
    console.log(ts, status.user?.donationExpire)
    return status?.user.didDonate && status.user?.donationExpire > ts;
  }
  if (!status) {
    return null;
  }
  return (
    <Box p={3}>
      <Typography className={classes.header} variant="h5" component="h2">Locast Settings</Typography>

      { status.user ? (
        <div>
          <Card className={classes.root}>
            <CardContent>
              <Typography>Signed in as: {status?.user.name}</Typography>
              <Typography>Donation Active: {donationActive() ? 'Yes' : 'No'}</Typography>
            </CardContent>
          </Card>

          <Typography variant="h5">Channel Lineup</Typography>

        </div>

      ) : (
        <form onSubmit={handleSubmit}>
          <Card className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
                Connect your Locast.org account
              </Typography>
              <Typography variant="body2">
                To access Locast channels available in your area with faux-tuner, you'll need an active Locast account.
              </Typography>

              <Chip
                size="small"
                className={classes.warning}
                icon={<LockIcon size="small" />}
                label="We do not store this information."
              />

              <div className={classes.form}>
                <TextField
                  onChange={(e) => handleChange(e, 'username')}
                  fullWidth
                  required
                  autoComplete="username"
                  label="Username"
                />
                <TextField
                  onChange={(e) => handleChange(e, 'password')}
                  fullWidth
                  required
                  autoComplete="current-password"
                  type="password"
                  label="Password"
                />
              </div>
            </CardContent>
            <CardActions>
              <Button type="submit" color="primary">
                Login
              </Button>
            </CardActions>
          </Card>
        </form>

      )}
      <pre>{JSON.stringify(status, null, 1)}</pre>

    </Box>
  );
}
