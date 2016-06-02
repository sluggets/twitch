$(document).ready(function() {

  // global variables to store state of profile pictures
  // so that they can be restored after click events alter
  // them
  lastUser = '';  
  lastClass = '';
  lastWidthDims = '';
  lastHeightDims = '';

  // this is the isotope grid css plugin setup
  $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });
  
  //https://api.twitch.tv/kraken/streams/MedryBw?callback=?
  //https://api.twitch.tv/kraken/users/brunofin
  /*$.getJSON('https://api.twitch.tv/kraken/channels/brunofin', function(data) {
    console.log(JSON.stringify(data));
  });
  var twitchUsersApi = 'https://api.twitch.tv/kraken/users/';

  var apiParams = {
    "Client-ID"        :"hbv2o1kd0mxw10p06g6t9fr3n4eue04",
        
  };*/

  /*$.getJSON(twitchApi, apiParams, function(json) {
    console.log(JSON.stringify(json));
    $('#gridResults').html('<img class="img-responsive" src=' + json["logo"] + '>');
  });'brunofin'*/

  var usernameList = ['MedryBw', 'freecodecamp', 'storbeck', 'terakilobyte', 
                      'habathcx', 'RobotCaleb', 'thomasballinger',
                      'noobs2ninjas', 'beohoff', 'comster404'];

  gridClasses = [' ', ' ', 'grid-item--width2',];

  usernameList.forEach(buildStreamers);

  // handles click event for elements that may not
  // yet be loaded
  $('#gridResults').on('click', '.grid-item', function() {

    // grabs user that was clicked on
    var photoDivUser = $(this).attr("id");

    // if user clicks on same user icon twice, returns out 
    // of function altogether, nothing needs to be done!
    if (lastUser !== '' && (toggleHash(lastUser)) == photoDivUser)
    {
      return;
    }

    // grabs div containing user's profile picture
    var currentPhotoDiv = document.getElementById(photoDivUser);
  
    // grabs img elements from that div, puts into an array
    var currentImg = currentPhotoDiv.getElementsByTagName('img');

    // stores existing dimensions of profile picture before
    // altering them so that they can be restored
    var currentWidthDims = currentImg[0].getAttribute('width');
    var currentHeightDims = currentImg[0].getAttribute('height');

    // this just alters username div id from "freecodecampf" to
    // "#freecodecamp" so that username header can be added
    // to top of page
    headerDivUser = toggleHash(photoDivUser);

    // if current click isn't user's first click
    // it restores previous values to LAST user element
    // that was clicked
    if (lastUser !== '')
    {
      // changes username div id from "#freecodecamp" to
      // "freecodecampf"
      var lastPhotoUser = toggleHash(lastUser);
      
      // gets div of username that was last clicked in order
      // to restore previous values
      var lastPhotoDiv = document.getElementById(lastPhotoUser);

      // restores previous user's class
      lastPhotoDiv.className = lastClass;

      // grabs img elements from last user's div
      var profImg = lastPhotoDiv.getElementsByTagName('img');

      // restores previous user's profile picture dimensions
      profImg[0].setAttribute("width", lastWidthDims);
      profImg[0].setAttribute("height", lastHeightDims); 

      // toggles visibility of username on header to not visible 
      // or hidden
      $(lastUser).toggle();
    }

    // stores current class name to be restored later after a
    // subsequent click
    lastClass = currentPhotoDiv.className;

    // stores current profile pic dimensions to be restored later
    // after a subsequent click
    lastWidthDims = currentWidthDims;
    lastHeightDims = currentHeightDims;

    // changes current class that was clicked to increase size
    // and draw focus
    currentPhotoDiv.className = 'grid-item grid-item--width4';

    // changes current image size to increase size and draw focus
    currentImg[0].setAttribute("width", "325px");
    currentImg[0].setAttribute("height", "325px");

    // toggles visibility of newly clicked user to display
    // current username in <h1> element
    $(headerDivUser).toggle();
     
    // stores current user to restore original values
    // after a subsequent click
    lastUser = headerDivUser;
  });
});

function getRandomIntInclusive(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildStreamers(elem, index, arr)
{

  var twitchUsersApi = 'https://api.twitch.tv/kraken/users/';

  var apiParams = {
    "Client-ID"        :"hbv2o1kd0mxw10p06g6t9fr3n4eue04",
        
  };


  $.getJSON(twitchUsersApi + elem, apiParams, function(json, profilePic) {
      var ranNum = getRandomIntInclusive(0, 2);
      var profilePic = document.createElement('img');

      if (!json["logo"])
      {
        profilePic.src = 'img/glitch.png';
      }
      else
      {
        profilePic.src = json["logo"];
      }

      if (gridClasses[ranNum].length > 1 && gridClasses[ranNum].charAt(16) == '2')
      {
        profilePic.setAttribute("width", "175px");
        profilePic.setAttribute("height", "175px");

      }
      else if (gridClasses[ranNum].length > 1 && gridClasses[ranNum].charAt(16) == '3')
      {
        profilePic.setAttribute("width", "275px");
        profilePic.setAttribute("height", "275px");
      }
      else
      {
        profilePic.setAttribute("width", "75px");
        profilePic.setAttribute("height", "75px");
      }

      profilePic.className = 'img-rounded img-responsive';
      var currentDiv = $("#gridResults");
      var usernameDiv = $("#twitch-user");
      var newHeader = document.createElement("h1");
      var snippetNode = document.createTextNode(elem);
      newHeader.appendChild(snippetNode);
      newHeader.id = elem;
      //newHeader.appendChild(profilePic);
      var imgDiv = document.createElement('div');
      var newDiv = document.createElement('div');  
      //var headerDiv = document.createElement('div');
      //headerDiv.className = "header-div";
      //headerDiv.appendChild(newHeader);
      imgDiv.appendChild(profilePic);
      newDiv.appendChild(imgDiv);
      usernameDiv.append(newHeader)
      //newDiv.appendChild(headerDiv);
      //newDiv.appendChild(newHeader);
      //newDiv.appendChild(profilePic);
      //newDiv.appendChild(newHeader);
      newDiv.className = "grid-item " + gridClasses[ranNum]; 
      newDiv.id = elem + elem.charAt(0);
      currentDiv.append(newDiv);
  });
}

// builds a div with username so username can display
// over other content
function buildUsernameDiv(username)
{
  var currentDiv = $("#gridResults");
  var usernameDiv = document.createElement("div");
  var userHeader = document.createElement("h2");
  var snippetNode = document.createTextNode(username);
  userHeader.appendChild(snippetNode);
  usernameDiv.appendChild(userHeader);
  usernameDiv.className = "user-header"; 
  currentDiv.append(usernameDiv);
}

// twitch usernames are utilized as ids for html elements in two
// different ways in this. firstly as username + username[0], which
// gives us "usernameu" for the id of the div holding the 
// profile picture. secondly as "username" which gives us
// the id for the <h1> element holding the username as header
// this toggles between the two, plus add a hashmark whynot?
function toggleHash(username)
{
  if (username.charAt(0) == '#')
  {
    return username.substring(1, username.length) + username.charAt(1);
  }
  else
  {
    return '#' + username.substring(0, username.length - 1);
  }
}
