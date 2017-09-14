const request = require('request')
const fs = require('fs');
const githubApi = require('./github_api')

const owner = process.argv[2]
const repo = process.argv[3]

console.log('Welcome to the GitHub Avatar Downloader!');

if(owner && owner !== "" && repo && repo !== "") {
  githubApi.getRepoContributors(owner, repo, function(error, items) {
    if (error) {
      console.log('Got Error:', error)
      return
    }
    let avatar_urls = items.map(function(key) {
      return key.avatar_url
    })
    avatar_urls.map(function(url, index) {
      downloadImageByURL(url, `avatars/avatar${index}.jpg`)
    })
  })
} else {
  console.log('Please provide valid repository owner and/or repository name!')
}

function downloadImageByURL(url, filePath) {
  request.get(url, function(err, response, body) {
  })
  .on('end', function() {
    console.log('Download Completed')
  })
  .pipe(fs.createWriteStream(filePath))
}