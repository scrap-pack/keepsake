import axios from 'axios';

export const GOT_USER = 'GOT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
export const CREATE_USER = 'CREATE_USER';

export const gotUser = user => ({ type: GOT_USER, user });
export const logoutUser = () => ({ type: LOGOUT_USER });
export const changeLoginStatus = loginStatus => ({
  type: CHANGE_LOGIN_STATUS,
  loginStatus,
});
export const createUser = (firstName, lastName, email, password) => ({
  type: CREATE_USER,
  firstName,
  lastName,
  email,
  password,
});

export const loginThunk = (email, password) => {
  console.log(email, password);
  return dispatch => {
    return axios
      .post('/api/users/login', { email, password })
      .then(res => res.data)
      .then(user => {
        console.log('redux user', user);
        dispatch(gotUser(user));
      })
      .then(() => {
        console.log('changing login status');
        dispatch(changeLoginStatus(true));
      })
      .catch(() => {
        console.log('Login error');
        dispatch(gotUser({ error: 'Invalid login credentials!' }));
      });
  };
};

export const logoutThunk = () => {
  return dispatch => {
    return axios
      .post('/api/users/logout')
      .then(() => {
        dispatch(logoutUser());
      })
      .catch(() => {
        console.log('Logout error');
      });
  };
};

export const createUserThunk = user => {
  return dispatch => {
    return axios
      .post('/api/users', user)
      .then(res => {
        console.log(res.data);
        dispatch(createUser(res.data));
      })
      .catch(err => {
        console.error('Failed to create new user!', err);
      });
  };
};

const userState = {
  currentUser: {},
  newUser: {},
  error: '',
  loggedIn: false,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, currentUser: action.user };
    case LOGOUT_USER: {
      return { ...userState };
    }
    case CHANGE_LOGIN_STATUS: {
      return { ...state, loggedIn: action.loginStatus };
    }
    case CREATE_USER: {
      const newUser = ({ firstName, lastName, email, password } = action);
      return { ...state, newUser };
    }
    default:
      return state;
  }
};

export const fetchUser = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/me');
    console.log(data);
    dispatch(getUsers(data));
  } catch (e) {
    console.error(e);
  }
};

export default userReducer;
