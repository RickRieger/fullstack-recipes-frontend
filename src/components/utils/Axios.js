import axios from 'axios';
const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_AXIOS === 'development'
      ? 'http://localhost:3001/api'
      : 'https://appetizing-app.herokuapp.com/api',
  timeout: 80000,
});
export default Axios;
