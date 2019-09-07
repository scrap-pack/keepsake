import axios from 'axios';

export const GOT_USER = 'GOT_USER';
export const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS';
export const CREATE_USER = 'CREATE_USER';

export const gotUser = user => ({ type: GOT_USER, user });
export const changeLoginStatus = authenticated => ({
  type: CHANGE_LOGIN_STATUS,
  authenticated,
});
export const createUser = user => ({
  type: CREATE_USER,
  user,
});

export const fetchUser = () => {
  // const token = Cookies.get('sid');
  return dispatch => {
    return (
      axios
        .get(`/api/users/me`, { withCredentials: true })
        // { headers: { Authorization: token }}
        .then(({ data }) => dispatch(gotUser(data)))
        .catch(err => {
          console.log('Error retrieving my info from db!', err);
        })
    );
  };
};

export const loginThunk = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/users/login', { email, password })
      .then(res => res.data)
      .then(user => {
        console.log('redux user', user);
        Cookies.set('sid', user.token, { expires: 1 });
        dispatch(gotUser(user));
        dispatch(changeLoginStatus(true));
      })
      .catch(err => {
        console.log('Login error', err);
        dispatch(gotUser({ error: 'Invalid login credentials!' }));
      });
  };
};

export const logoutThunk = () => {
  return dispatch => {
    return axios
      .post('/api/users/logout')
      .then(() => {
        Cookies.remove('sid');
        dispatch(changeLoginStatus(false));
      })
      .then(() => {
        console.log('Now logged out!');
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
        dispatch(createUser(res.data));
      })
      .catch(err => {
        console.log('Failed to create new user!');
      });
  };
};

const userState = {
  currentUser: {},
  newUser: {},
  error: '',
  authenticated: false,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GOT_USER: {
      return { ...state, currentUser: action.user };
    }
    case CHANGE_LOGIN_STATUS: {
      return { ...state, authenticated: action.authenticated };
    }
    case CREATE_USER: {
      return { ...state, newUser: action.user };
    }
    default:
      return state;
  }
};

export default userReducer;
