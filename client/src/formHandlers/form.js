const formHandler = (data, choices) => {
  //get platforms
  let platforms = Object.keys(data.genres),
      tally = {}
  platforms.forEach(pf => {
    tally[pf] = 0;
  });
  Object.keys(data).forEach(d => {

    for(let i = 0; i < platforms.length; ++i){
      let pf = platforms[i];
      if (d[pf] === choices[d]){
        tally[pf] = tally[pf] + 1;
      }
    }
  })



 }

// {
//   data: {
//     genre: {
//       Netflix: "Action", HBO: "Comedy", Amazon: "Horror"
//     },
//     movie:
// //do the same for movies, tv shows, pricing, production company
//
//   }
//
//   choices: {
//     genre: "Action",
//     //repeat for each choice
//   }
// }

export default formHandler;
