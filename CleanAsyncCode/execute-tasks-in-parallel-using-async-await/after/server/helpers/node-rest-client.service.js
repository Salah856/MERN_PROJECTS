const Client = require('node-rest-client').Client;

const restClientService = new Client();

restClientService.registerMethod('getPosts','http://jsonplaceholder.typicode.com/users/1/posts','GET');
restClientService.registerMethod('getAlbums','http://jsonplaceholder.typicode.com/users/1/albums','GET');
restClientService.registerMethod('getPhotos','http://jsonplaceholder.typicode.com/albums/1/photos','GET');

export default restClientService;
