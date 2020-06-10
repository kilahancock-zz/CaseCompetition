import {getNumContent} from './endpoints';
import {data} from './data';

const allocateShowOrMovies = (analysis, obj) => {
  let max = -1;
  data.providers.forEach(p => {
    max = ((analysis[p] > max)? analysis[p] : max);
  });
  data.providers.forEach(p => {
    if (analysis[p] === max){
      obj[p] = obj[p] + 1;
    }
  });

}

//awards 1 point to the provider(s) with the most shows/movies
const showOrMovies = (option, obj) => {
  let promises = [],
      analysis = {};
  return new Promise((resolve, reject) => {
    for(let i = 0; i < data.providers.length; ++i){
      promises.push(getNumContent(data.providers[i], option).then(d => {analysis[data.providers[i]] = d}));
    }
      return Promise.all(promises)
        .then(res => {
          allocateShowOrMovies(analysis, obj);
          return resolve()
        })
        .catch(err => {
          return reject(err);
        });

  });
}

//assigns .5 points for each aspect of content that is assigned to a specific provider
const tallyContent = (content, obj) => {
  content.forEach(c => {
    obj[c.streamer] = obj[c.streamer] + .5;
  })
}

const removeSubs = (content, obj) => {
  content.forEach(c => {
    delete obj[c.streamer]
  })
}

const awardPrice = (content, obj) => {
  data.providers.forEach(p => {
    if (data.pricing[p] <= content.max && data.pricing[p] >= content.min){
      obj[p] = obj[p] + 1;
    }
  })

}

const maxFinder = (obj) => {
  return Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
}

const formHandler = (choices) => {
  console.log(choices)
  return new Promise((resolve, reject) => {
    const {showsOrMovies, selectedShows, selectedMovies, selectedGenres, prevSubscriptions, maxPrice} = choices;
    let ticker = {};
    data.providers.forEach(d => {ticker[d] = 0});

    awardPrice(maxPrice, ticker);
    console.log(ticker)
    console.log("prices allocated")
    if (selectedShows.length > 0){
      tallyContent(selectedShows, ticker)
    }

    console.log(ticker)
    console.log("shows")
    if (selectedMovies.length > 0){
      tallyContent(selectedMovies, ticker)
    }

    console.log(ticker)
    console.log("movies")
    if (showsOrMovies){
      showOrMovies(showsOrMovies.toLowerCase(), ticker)
        .then(result => {
          console.log(ticker)
          console.log("show or movies")
          if (prevSubscriptions.length > 0){
            removeSubs(prevSubscriptions, ticker)
          }
          resolve(maxFinder(ticker))
        })
        .catch(err => {
          reject(err)
        })
    }

    else{
      if (prevSubscriptions.length > 0){
        removeSubs(prevSubscriptions, ticker)
      }
      resolve(maxFinder(ticker))
    }

  })
}

export default formHandler;
