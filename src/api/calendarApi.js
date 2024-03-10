import axios from "axios";
import { getEnvVariables } from './../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL
});

//* Creo un interceptor para añadir el token a todas las peticiones http
calendarApi.interceptors.request.use( config => {

  if(localStorage.getItem('token')) {
    config.headers = {
      ...config.headers,
      'x-token': localStorage.getItem('token')
    }
  }

  return config;
});

export default calendarApi;