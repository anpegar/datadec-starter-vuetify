import axios from 'axios';

const HTTP = axios.create({
	baseURL: 'https://randomuser.me/api/',
	headers: {
		'x-ddol-security-token': 'tokendeprueba'
	}
});

// Por si queremos hacer algo antes de ejecutar el request.
/* HTTP.interceptors.request.use(function (config) {
	// Do something before request is sent	
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
}); */

export default HTTP;