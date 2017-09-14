const request = require('request');
const githubApi = require('./github_api');

require('dotenv').config();
const GITHUB_USER = 'zoeyyandi';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const owner = process.argv[2];
const repo = process.argv[3];

let checked = []
let starredUrlsCount = {}
let theMostStarredUrls = []
let count = 1;
let starredRepoFullname = []
let response = 0


if (owner && owner !== '' && repo && repo !== '') {
 githubApi.getRepoContributors(owner, repo, function(error, items) {
   if (error) {
     console.log('Got Error:', error);
     return;
   }
   let starredUrls = items.map(function(key) {
     let eachStarredUrl = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/users/${key.login}/starred`;
     return eachStarredUrl;
   });

   starredUrls.forEach(function(url, index) {
     getStarredRepo(url, function(error, items) {
       if (error) {
         console.log('Got Error:', error);
         return;
       }
       if (items.length !== 0) {
         starredRepoFullname.push(...items.map(function(key) {
           return key.full_name;
         }))
       };

       response++
       if (response === starredUrls.length) {
         // console.log(makeObject(starredRepoFullname));
         starredRepoFullname.forEach(function(ownerRepo, index) {
           if (checked.includes(ownerRepo)) {
             starredUrlsCount[ownerRepo] += 1
           } else {
             starredUrlsCount[ownerRepo] = 1
             checked.push(ownerRepo)
           }
         })

         Object.keys(starredUrlsCount).slice().sort(function(a, b){
           return starredUrlsCount[b] - starredUrlsCount[a]
         }).slice(1, 6).forEach(function(key) {
           console.log(`[ ${starredUrlsCount[key]} stars ] ${key}`)
         })
       }
     });
   });
 })
}

const getStarredRepo = function(url, callback) {
 var options = {
   url: url,
   headers: {
     'User-Agent': 'request'
   }
 };
 request(options, function(error, response, body) {
   if (error) {
     console.log('Got Error:', error);
     callback(error);
     return;
   }
   if (response && response.statusCode === 200) {
     let json = JSON.parse(body);
     callback(null, json);
   } else if (response.statusCode === 404) {
     callback(`Cannot find url:  + ${url}`);
   }
 });
};








// const request = require('request');
// const githubApi = require('./github_api');

// require('dotenv').config();
// const GITHUB_USER = 'zoeyyandi';
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// const owner = process.argv[2];
// const repo = process.argv[3];

// let checked = []
// let starredUrlsCount = {}
// let theMostStarredUrls = []
// let count = 1;

// if (owner && owner !== '' && repo && repo !== '') {
//     let a = 0
//   githubApi.getRepoContributors(owner, repo, function(error, items) {
//     if (error) {
//       console.log('Got Error:', error);
//       return;
//     }
//     let starredUrls = items.map(function(key) {
//       let eachStarredUrl = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/users/${key.login}/starred`;
//       return eachStarredUrl;
//     });
//     starredUrls.forEach(function(url, index) {
//       getStarredRepo(url, function(error, items) {
//         if (error) {
//           console.log('Got Error:', error);
//           return;
//         }
//         let starredRepoFullname = items.map(function(key) {
//           return key.full_name;
//         });

//         starredRepoFullname.forEach(checkStarredRepo)
      
//         for (let key in starredUrlsCount) {
//           if (starredUrlsCount[key] >= count) {
//             count = starredUrlsCount[key]
//           } 
//         }
//         for (let key in starredUrlsCount) {
//           if (starredUrlsCount[key] === count) {
//             theMostStarredUrls.push(key)
//           }
//         }
//       });
//     });
//   });
//   console.log(a)
// }

// const getStarredRepo = function(url, callback) {
//   var options = {
//     url: url,
//     headers: {
//       'User-Agent': 'request'
//     }
//   };
//   request(options, function(error, response, body) {
//     if (error) {
//       console.log('Got Error:', error);        
//       callback(error);
//       return;
//     }
//     if (response && response.statusCode === 200) {
//       let json = JSON.parse(body);
//       callback(null, json);
//     } else if (response.statusCode === 404) {
//       callback(`Cannot find url:  + ${url}`);
//     }
//   });
// };


// function checkStarredRepo (ownerRepo, index) {
//     if(checked.includes(ownerRepo)) {
//         starredUrlsCount[ownerRepo] += 1
//     } else {
//         starredUrlsCount[ownerRepo] = 1
//         checked.push(ownerRepo)
//     }
// }






