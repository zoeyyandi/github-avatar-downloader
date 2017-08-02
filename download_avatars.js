var request = require('request');
var fs = require('fs');

var GITHUB_USER = "zoeyyandi";
var GITHUB_TOKEN = "aa3b475bc6c9a053c9cd9ffe762676426e3553d5";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
      url: requestURL,
      headers: {
          'User-Agent': 'request'
      }
  }
  request.get(options, function(err, response, body) {
    cb(err, JSON.parse(body));
  })
}

var callback = function(err, result) {
  var avatar_urls = result.map(function(item) {
      return item.avatar_url
  })

  avatar_urls.map(function(url, index) {
    downloadImageByURL(url, `avatars/avatar${index}.jpg`)
  })
}

getRepoContributors("jquery", "jquery", callback)

function downloadImageByURL(url, filePath) {
  request.get(url, function(err, response, body) {

  }).pipe(fs.createWriteStream(filePath))
}