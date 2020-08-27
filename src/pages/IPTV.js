import React, { useRef, useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import request from '../utils/request';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import PublishIcon from '@material-ui/icons/Publish';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 640,
    margin: 'auto'
  },
  header: {
    marginBottom: theme.spacing(4)
  },
  form: {
    // marginTop: theme.spacing(2),

    '& > *': {
      marginBottom: theme.spacing(4)
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
  },
  input: {
     display: 'none',
  },
  table: {
    width: '100%'
  },
  iconSquare: {
    width: 100,
    height: 100,
    backgroundColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: theme.spacing(3),

    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  },
  fileForm: {
    display: 'flex',
    alignItems: 'center'
  },
  urlForm: {
    display: 'flex',
    // '& > *': {
    //   flexGrow: 0
    // }
  }
}));


function CreateDialog(props) {
  const classes = useStyles();
  const theform = useRef();
  const { onClose, open } = props;
  const [channelData, setChannelData] = useState({});
  const [activeImageTab, setSctiveImageTab] = useState(0);


  const handleChange = useCallback((e, field) => {
    setChannelData({ ...channelData, [field]: e.target.value });
  }, [channelData, setChannelData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('handleSubmit', channelData);
    request('iptv/create', { method: 'POST', body: channelData }).then(({ channel }) => {
      onClose(null, channel);
    }).catch(err => {
      console.log(err);
      onClose(err);
    });

  };

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files.length && e.target.files[0];
    if (file) {
      if (file.size > 4e4) {
        return alert('File must be under 40k.')
      }
      const fr = new FileReader();
      fr.onload = () => {
        // console.log('loaded', fr.result);
        const imageData = fr.result;
        setChannelData({ ...channelData, image: imageData });
      }
      fr.readAsDataURL(file);
    }
    // console.log('handleFileSelect', e.target.files);
  }, [channelData, setChannelData]);

  const handleIconTabChange = useCallback((index) => {
    setSctiveImageTab(index);
    setChannelData({ ...channelData, image: null });
  }, [setSctiveImageTab, setChannelData, channelData]);

  const handleClose = () => {
    onClose();
  };
  const handleSyntheticSubmit = (e) => {
    theform.current.click();
  }

  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>

      <DialogTitle>Add Channel</DialogTitle>

      <DialogContent dividers={true}>
        <form id="createform" onSubmit={handleSubmit}>
          <div className={classes.form}>
            <TextField
              autoFocus
              onChange={(e) => handleChange(e, 'name')}
              fullWidth
              required
              label="Name"
            />
            <TextField
              onChange={(e) => handleChange(e, 'description')}
              fullWidth
              label="Description"
            />
            <TextField
              onChange={(e) => handleChange(e, 'url')}
              fullWidth
              required
              placeholder="http://"
              label="MPEGTS/HLS URL"
            />

            <Typography>Channel Icon</Typography>
            <ButtonGroup variant="contained">
              <Button
                color={activeImageTab===0 ? 'primary' : 'default'}
                onClick={() => handleIconTabChange(0)}
                startIcon={(<PublishIcon />)}
              >
                File
              </Button>
              <Button
                color={activeImageTab===1 ? 'primary' : 'default'}
                onClick={() => handleIconTabChange(1)}
                startIcon={(<LinkIcon />)}
              >
                URL
              </Button>
            </ButtonGroup>
            {activeImageTab === 0 ? (
              <div className={classes.fileForm}>
                <div>
                  <div className={classes.iconSquare}>
                    { channelData.image && (<img alt="icon" src={channelData.image} />)}
                  </div>
                </div>
                <input
                  accept="image/*"
                  className={classes.input}
                  onChange={handleFileSelect}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    Upload Channel Icon
                  </Button>
                </label>
              </div>
            ) : (
              <div className={classes.urlForm}>
                <TextField
                  fullWidth
                  label="Image URL"
                  onChange={(e) => handleChange(e, 'image')}
                  placeholder="http://"
                />
              </div>
            )}

          </div>
          <input type="submit" ref={theform} style={{visibility: 'hidden'}} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSyntheticSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default function IPTV() {
  const classes = useStyles();
  const [channels, setChannels] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    request(`iptv/channels`).then(res => {
      console.log(res.channels);
      setChannels(res.channels);
    });
  }, [setChannels]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (err, newItem) => {
    console.log(err, newItem);
    setChannels([...channels, newItem]);
    setOpen(false);
  };



  return (
    <Box p={3}>
      <Typography variant="h5">{`IPTV & Custom Streams`}</Typography>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Channel
      </Button>

      <List>
        {channels && channels.map((channel) => (
          <ListItem button key={channel.id}>
            <ListItemAvatar>
              <Avatar src={channel.iconUrl} />
            </ListItemAvatar>
            <ListItemText primary={channel.name} secondary={`Channel 3000.${channel.guide}`}></ListItemText>
          </ListItem>
        ))}
      </List>


      <CreateDialog open={open} onClose={handleClose} />

    </Box>
  );
}
