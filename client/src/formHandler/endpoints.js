import axios from 'axios';

export const getNumContent = (platform, option) => {
  return new Promise((resolve, reject) => {
    return axios.get(`/api/${option}/number/platform/${platform}`)
      .then(res => {
        return resolve(res.data.Amount);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}

export const genreByPlatform = (apikey) => {
  return new Promise((resolve, reject) => {
    return axios.get(`/api/platform-by-genre/action/apikey/${apikey}`)
    .then(res => {
      return resolve(res.data)
    })
    .catch(err => {
      return reject(err.response.data.error)
    })
  })
}
