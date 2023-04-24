import { createStore, applyMiddleware, compose } from "redux";
import dogsReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

//conectamos la extension del navegador redux devtools

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creamos la store y hacemos la configuracion para hacer peticiones a la API

const store = createStore(
  dogsReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
