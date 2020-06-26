const axios = require('axios');

export function getPosts() {
  return axios.get('http://jsonplaceholder.typicode.com/users/1/posts');
}

export function getAlbums() {
  return axios.get('http://jsonplaceholder.typicode.com/users/1/albums');
}

export function getPhotos() {
  return axios.get('http://jsonplaceholder.typicode.com/albums/1/photos');
}
