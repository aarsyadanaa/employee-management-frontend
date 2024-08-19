import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/api' // Replace with your API base URL
  });

  nuxtApp.provide('axios', instance);
});
