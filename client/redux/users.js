import axios from "axios";

const GET_USERS = "GET_USERS";

const getUsers = users => ({ type: GET_USERS, users });

const userState = {
  allUsers: [],
};

const users = (state = userState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, allUsers: [...state.allUsers, ...action.users] };
    default:
      return state;
  }
};

export const fetchUsers = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/users");
    dispatch(getUsers(data));
  } catch (e) {
    console.error(e);
  }
};

export default users;
