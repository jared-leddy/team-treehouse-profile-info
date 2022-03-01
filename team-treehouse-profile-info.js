// Problem: We need a simple way to look at a user's badge count and JavaScript points

// Require HTTPS Module
const https = require('https');
// Require HTTP Module
const http = require('http');
// Print Error Messages

function printError(error) {
  console.error(error.message);
}

// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

function printMessage (userName, badgeCount, Points) {
  const message = `${userName} has ${badgeCount} total badge(s) and ${Points} points in JavaScript.`
  console.log(message);
}

function getProfile (username) {
  try {
    // Connect to the API URL ( https://teamtreehouse.com/jaredledbetter.json )
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = "";
         // Read the data
        response.on('data', data => {
          body += data.toString();
        });
        // Parse the data
        response.on('end', () => {
          try {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.total);
            // Print the data
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });

    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
//const users = [ "jaredledbetter", "marcdoherty", "davemcfarland" ];
const users = process.argv.slice(2);

users.forEach(getProfile);
