import axios from 'axios';

// ACTION CONSTANTS
const GET_ALL_ALBUMS = 'GET_ALL_ALBUMS';
const GET_SINGLE_ALBUM = 'GET_SINGLE_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';
const ADD_IMAGES = 'ADD_IMAGES';
const ADD_USERS = 'ADD_USERS';
const REMOVE_ALBUM = 'REMOVE_ALBUM';
const SELECT_ALBUM_TO_SHARE = 'SELECT_ALBUM_TO_SHARE';
const CLEAR_ALBUM_TO_SHARE = 'CLEAR_ALBUM_TO_SHARE';

// ACTION CREATORS
const getAllAlbums = albums => ({ type: GET_ALL_ALBUMS, albums });
export const getSingleAlbum = album => ({ type: GET_SINGLE_ALBUM, album });
const createAlbum = msg => ({ type: CREATE_ALBUM, mssg: msg });
const addImages = msg => ({ type: ADD_IMAGES, mssg: msg });
const addUsers = msg => ({ type: ADD_USERS, mssg: msg });
const removeAlbum = msg => ({ type: REMOVE_ALBUM, mssg: msg });
export const selectAlbumToShare = album => ({
  type: SELECT_ALBUM_TO_SHARE,
  album,
});
export const clearAlbumToShare = () => ({ type: CLEAR_ALBUM_TO_SHARE });

// API THUNKS
export const fetchAllAlbums = participant => async dispatch => {
  try {
    const { data } = await axios.get(`/api/albums/${participant.id}`);
    // console.log(participant);
    // console.log(data);
    dispatch(getAllAlbums(data));
  } catch (error) {
    console.error('ERROR IN FETCH ALL ALBUMS THUNK', error);
  }
};

export const fetchSingleAlbum = (userId, albumId) => async dispatch => {
  try {
    const { album } = await axios.get(`/api/albums/${userId}/${albumId}`);
    dispatch(getSingleAlbum(album));
  } catch (error) {
    console.error('ERROR IN FETCH SINGLE ALBUM THUNK', error);
  }
};

export const postNewAlbum = albumDetails => async dispatch => {
  try {
    const { owner } = albumDetails;
    await axios.post('/api/albums', albumDetails);
    dispatch(fetchAllAlbums(owner));
  } catch (error) {
    console.error('ERROR IN POST NEW ALBUM THUNK', error);
  }
};

export const addImagesToAlbum = (albumId, images) => async dispatch => {
  try {
    await axios.put(`/api/albums/addImages/${albumId}`, images);
    dispatch(addImages('Add Imgs Successful'));
  } catch (error) {
    console.error('ERROR IN ADD IMG TO ALBUM THUNK', error);
  }
};

export const addUsersToAlbum = (albumId, users) => async dispatch => {
  try {
    await axios.put(`/api/albums/addUsers/${albumId}`, users);
    dispatch(addUsers('Add Users Successful'));
  } catch (error) {
    console.error('ERROR IN ADD USER TO ALBUM THUNK', error);
  }
};

export const deleteAlbum = albumId => async dispatch => {
  try {
    await axios.delete(`/api/albums/${albumId}`);
    dispatch(removeAlbum('Remove Album Successful'));
  } catch (error) {
    console.error('ERROR IN DELETE ALBUM THUNK', error);
  }
};

export const inviteUserToAlbum = inviteDetails => async dispatch => {
  try {
    await axios.post('/api/albums/invite', inviteDetails);
  } catch (e) {
    console.error(e);
  }
};

// INITIAL STATE
const albumState = {
  allAlbums: [],
  singleAlbum: {},
  createAlbumMsg: '',
  addImgToAlbumMsg: '',
  addUserToAlbumMsg: '',
  removeAlbumMsg: '',
  albumToShare: {},
};

// REDUCER
const albums = (state = albumState, action) => {
  switch (action.type) {
    case GET_ALL_ALBUMS:
      return { ...state, allAlbums: [...state.allAlbums, ...action.albums] };
    case GET_SINGLE_ALBUM:
      return { ...state, singleAlbum: action.album };
    case CREATE_ALBUM:
      return { ...state, createAlbumMsg: action.mssg };
    case ADD_IMAGES:
      return { ...state, addImgToAlbumMsg: action.mssg };
    case ADD_USERS:
      return { ...state, addUserToAlbumMsg: action.mssg };
    case REMOVE_ALBUM:
      return { ...state, removeAlbumMsg: action.mssg };
    case SELECT_ALBUM_TO_SHARE:
      return { ...state, albumToShare: action.album };
    case CLEAR_ALBUM_TO_SHARE:
      return { ...state, albumToShare: {} };
    default:
      return state;
  }
};

export default albums;
