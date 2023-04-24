import {
  REQUEST,
  CLEAR_FILTERED_DOGS,
  GET_ALL_DOGS_SUCCESS,
  GET_ALL_DOGS_FAILURE,
  GET_DOG_BY_NAME_SUCCESS,
  GET_DOG_BY_NAME_FAILURE,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
  GET_ALL_TEMPERAMENTS_SUCCESS,
  GET_ALL_TEMPERAMENTS_FAILURE,
  SORT_DOGS_AZ,
  SORT_DOGS_ZA,
  FILTER_DOGS_DB,
  FILTER_DOGS_API,
  FILTER_DOGS_BY_TEMP,
  SORT_DOGS_BY_WEIGHT_ASC,
  SORT_DOGS_BY_WEIGHT_DES,
  DELETE_DOG,
} from "./actionTypes";

const initialState = {
  allDogs: [],
  filteredDogs: [],
  allTemperaments: [],
  loading: false,
  error: null,
};

const dogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_DOGS_SUCCESS:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_DOGS_FAILURE:
      return {
        ...state,
        allDogs: [],
        loading: false,
        error: action.payload,
      };
    case GET_DOG_BY_NAME_SUCCESS:
      return {
        ...state,
        filteredDogs: action.payload,
        loading: false,
        error: null,
      };
    case GET_DOG_BY_NAME_FAILURE:
      return {
        ...state,
        filteredDogs: [],
        loading: false,
        error: action.payload,
      };
    case CLEAR_FILTERED_DOGS:
      return {
        ...state,
        filteredDogs: [],
      };
    case CREATE_DOG_SUCCESS:
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload],
        filteredDogs: [],
        loading: false,
        error: null,
      };
    case CREATE_DOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_TEMPERAMENTS_SUCCESS:
      return {
        ...state,
        allTemperaments: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_TEMPERAMENTS_FAILURE:
      return {
        ...state,
        allTemperaments: [],
        loading: false,
        error: action.payload,
      };
    case SORT_DOGS_AZ:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case SORT_DOGS_ZA:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case FILTER_DOGS_DB:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case FILTER_DOGS_API:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case FILTER_DOGS_BY_TEMP:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case SORT_DOGS_BY_WEIGHT_ASC:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case SORT_DOGS_BY_WEIGHT_DES:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_DOG:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default dogsReducer;
