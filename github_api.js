///////////  import request  ///////////
const request = require('request')

///////////  setup secret API key  ///////////
require('dotenv').config();
const GITHUB_USER = "zoeyyandi"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN 

///////////  create a function to get repository contributors  ////////////

const getRepoContributors = function (owner, repo, cb) {
  
    var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${owner}/${repo}/contributors`
    var options = {
        url: requestURL,
        headers: {
            'User-Agent': 'request'
        }
    }

    request(options, function(err, response, body) {
        if (err) {
          cb(error)
          return
        }
        if(response && response.statusCode === 200) {
          let json = JSON.parse(body)
          cb(null, json)
        } 
    })
  }


module.exports = {
    getRepoContributors: getRepoContributors
}