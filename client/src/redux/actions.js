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
  SORT_DOGS_BY_WEIGHT_ASC,
  SORT_DOGS_BY_WEIGHT_DES,
  FILTER_DOGS_BY_TEMP,
  DELETE_DOG,
} from "./actionTypes";
import axios from "axios";

export const getAllDogs = () => async (dispatch) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.get("/dogs");
    dispatch({ type: GET_ALL_DOGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_DOGS_FAILURE, payload: error.message });
  }
};

export const searchDogByName = (query) => async (dispatch) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.get(`/dogs/name?name=${query}`);
    dispatch({ type: GET_DOG_BY_NAME_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DOG_BY_NAME_FAILURE, payload: error.message });
  }
};

export const clearState = () => async (dispatch) => {
  dispatch({ type: REQUEST });
  dispatch({ type: CLEAR_FILTERED_DOGS });
};

export const createDog = (formValues) => async (dispatch) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.post(`/dogs`, formValues);
    dispatch({ type: CREATE_DOG_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_DOG_FAILURE, payload: error.message });
  }
};

export const getAllTemperaments = () => async (dispatch) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.get("/temperaments");
    dispatch({ type: GET_ALL_TEMPERAMENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_TEMPERAMENTS_FAILURE, payload: error.message });
  }
};

export const sortDogsAZ = () => async (dispatch) => {
  const response = await axios
    .get("/dogs")
    .then((response) =>
      response.data.sort((a, b) => a.name.localeCompare(b.name))
    );
  dispatch({ type: SORT_DOGS_AZ, payload: response });
};

export const sortDogsZA = () => async (dispatch) => {
  const response = await axios
    .get("/dogs")
    .then((response) =>
      response.data.sort((a, b) => b.name.localeCompare(a.name))
    );
  dispatch({ type: SORT_DOGS_ZA, payload: response });
};

export const sortDogsByWeightAsc = () => async (dispatch) => {
  const response = await axios.get("/dogs").then((response) => {
    const sortedDogs = response.data.sort((dogA, dogB) => {
      const dogAWeight = dogA.weight.imperial
        ? dogA.weight?.imperial?.split(" - ")
        : dogA.weight.split(" - ");
      const dogBWeight = dogB.weight.imperial
        ? dogB.weight?.imperial?.split(" - ")
        : dogB.weight.split(" - ");
      if (!dogAWeight || !dogBWeight) return 0;
      const dogAWeightNum = parseInt(dogAWeight[0]);
      const dogBWeightNum = parseInt(dogBWeight[0]);
      return dogAWeightNum - dogBWeightNum;
    });
    return sortedDogs;
  });
  dispatch({ type: SORT_DOGS_BY_WEIGHT_ASC, payload: response });
};

export const sortDogsByWeightDes = () => async (dispatch) => {
  const response = await axios.get("/dogs").then((response) => {
    const sortedDogs = response.data.sort((dogA, dogB) => {
      const dogAWeight = dogA.weight.imperial
        ? dogA.weight?.imperial?.split(" - ")
        : dogA.weight.split(" - ");
      const dogBWeight = dogB.weight.imperial
        ? dogB.weight?.imperial?.split(" - ")
        : dogB.weight.split(" - ");
      if (!dogAWeight || !dogBWeight) return 0;
      const dogAWeightNum = parseInt(dogAWeight[0]);
      const dogBWeightNum = parseInt(dogBWeight[0]);
      return dogBWeightNum - dogAWeightNum;
    });
    return sortedDogs;
  });
  dispatch({ type: SORT_DOGS_BY_WEIGHT_DES, payload: response });
};

export const filterDogsDb = () => async (dispatch) => {
  const response = await axios
    .get("/dogs")
    .then((response) => response.data.filter((dog) => dog.id.length > 5));
  dispatch({ type: FILTER_DOGS_DB, payload: response });
};

export const filterDogsApi = () => async (dispatch) => {
  const response = await axios
    .get("/dogs")
    .then((response) => response.data.filter((dog) => dog.id <= 1000));
  dispatch({ type: FILTER_DOGS_API, payload: response });
};

export const filterDogsByTemp = (selectedTemp) => async (dispatch) => {
  const response = await axios
    .get("/dogs")
    .then((response) =>
      response.data.filter(
        (dog) =>
          dog.temperament && dog.temperament.split(", ").includes(selectedTemp)
      )
    );

  dispatch({ type: FILTER_DOGS_BY_TEMP, payload: response });
};

export const deleteDog = (id) => async (dispatch) => {
  const deletedDog = await axios.delete(`/dogs/${id}`);
  dispatch({ type: DELETE_DOG, payload: deletedDog });
};
