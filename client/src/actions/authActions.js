import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (user, history) => dispatch => {
  axios
    .post('/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Login - Get User Token
export const loginUser = user => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem('jwt', token);
      setAuthToken(token);
      const user = jwt_decode(token);
      dispatch(setCurrentUser(user));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Set logged in user
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser(null));
}

