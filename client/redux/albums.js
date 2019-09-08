import axios from 'axios'

// ACTION CONSTANTS
const GET_ALL_ALBUMS = 'GET_ALL_ALBUMS';
const GET_SINGLE_ALBUM = 'GET_SINGLE_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';
const ADD_IMAGES = 'ADD_IMAGES';
const ADD_USERS = 'ADD_USERS';
const REMOVE_ALBUM = 'REMOVE_ALBUM';

// ACTION CREATORS
const getAllAlbums = (albums) => ({ type: GET_ALL_ALBUMS, albums });
const getSingleAlbum = (album) => ({ type: GET_SINGLE_ALBUM, album });
const createAlbum = () => ({ type: CREATE_ALBUM });
const addImages = () => ({ type: ADD_IMAGES });
const addUsers = () => ({ type: ADD_USERS });
const removeAlbum = () => ({ type: REMOVE_ALBUM });

// API THUNKS
export const fetchAllAlbums = (participantId) => async dispatch => {
  try {
    const { albums } = await axios.get(`/api/albums/${participantId}`);
    dispatch(getAllAlbums(albums));
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

export const postNewAlbum = (album) => async dispatch => {
  try {
    const { data } = await axios.post('/api/albums', album);
    dispatch(createAlbum(data));
  } catch (error) {
    console.error('ERROR IN POST NEW ALBUM THUNK', error);
  }
};

export const addImagesToAlbum = (albumId, images) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/albums/${albumId}`, images);
    dispatch(addImages(data));
  } catch (error) {
    console.error('ERROR IN ADD IMG TO ALBUM THUNK', error);
  }
};

export const addImagesToAlbum = (albumId, images) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/albums/${albumId}`, images);
    dispatch(addImages(data));
  } catch (error) {
    console.error('ERROR IN ADD IMG TO ALBUM THUNK', error);
  }
};

// INITIAL STATE
const albumState = {
  allAlbums: [],
  singleAlbum: {},
  selectedImages: [],
  selectMode: false,
};

// REDUCER

export default albums;
