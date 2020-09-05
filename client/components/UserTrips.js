import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import Itinerary from './Itinerary';
import Purchases from './Purchases';
import Photos from './Photos';

const UserTrips = ({ currentUser, currentTrip }) => {
  const [clicked, setClicked] = useState(null);
  const [trips, setTrips] = useState([]);

  const handleChange = (response) => {
    setTrips(response);
  };

  useEffect(() => {
    axios
      .post('./getAllTrips', { user_id: currentUser.id }, () => {})
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  return clicked || (
    <div>
      <Typography variant="h1">Trips</Typography>
      {trips.map((data) => (
        <List>
          <ListItem>
            <ListItemText>{data.name}</ListItemText>
            <ListItemSecondaryAction>
              <Button onClick={() => setClicked(<Itinerary />)} color="primary">
                Trip Itinerary
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemSecondaryAction>
              <Button onClick={() => setClicked(<Purchases currentUser={currentUser} currentTrip={currentTrip} />)} color="primary">
                Purchases
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemSecondaryAction>
              <Button onClick={() => setClicked(<Photos currentUser={currentUser} currentTrip={currentTrip} />)} color="primary">
                Photos
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            Dates:
            <ListItemText>{`${data.start_date} to ${data.end_date}`}</ListItemText>
          </ListItem>
          <ListItem>
            Destination:
            <ListItemText>{data.destination}</ListItemText>
          </ListItem>
        </List>
      ))}
    </div>
  );
};

UserTrips.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};

export default UserTrips;
