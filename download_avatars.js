var request = require('request');
var fs = require('fs');

var owner = process.argv[2]
var repo = process.argv[3]


var GITHUB_USER = "zoeyyandi";
var GITHUB_TOKEN = "aa3b475bc6c9a053c9cd9ffe762676426e3553d5";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName) {
    console.log('Please provide repository owner and repository name!')
    return
  }

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

getRepoContributors(owner, repo, callback)

function downloadImageByURL(url, filePath) {
  request.get(url, function(err, response, body) {

  })
  .on('end', function() {
    console.log('Download Completed')
  })
  .pipe(fs.createWriteStream(filePath))
}