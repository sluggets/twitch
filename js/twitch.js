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
    var tempUser = $(this).attr("id");

    // grabs div containing user's profile picture
    var currentPhotoDiv = document.getElementById(tempUser);
  
    // grabs img elements from that div, puts into an array
    var currentImg = currentPhotoDiv.getElementsByTagName('img');

    // stores existing dimensions of profile picture before
    // altering them so that they can be restored
    var currentWidthDims = currentImg[0].getAttribute('width');
    var currentHeightDims = currentImg[0].getAttribute('height');

    // this just alters username div id from "freecodecampf" to
    // "#freecodecamp" so that username header can be added
    // to top of page
    tempUser = '#' + tempUser.substring(0, tempUser.length - 1);

    // if current click isn't user's first click
    // it restores previous values to LAST user element
    // that was clicked
    if (lastUser !== '')
    {
      // changes username div id from "#freecodecamp" to
      // "freecodecampf"
      var lastPhotoUser = lastUser.substring(1, lastUser.length) + lastUser.charAt(1);
      //console.log('lastPhotoUser: ' + lastPhotoUser);
      
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
    var currentPhotoUser = tempUser.substring(1, tempUser.length - 1) + tempUser.charAt(1);
    lastClass = currentPhotoDiv.className;
    lastWidthDims = currentWidthDims;
    lastHeightDims = currentHeightDims;
    console.log(lastClass);
    currentPhotoDiv.className = 'grid-item grid-item--width4';
    currentImg[0].setAttribute("width", "325px");
    currentImg[0].setAttribute("height", "325px");
    $(tempUser).toggle();
     
    lastUser = tempUser;
    //console.log(tempUser);
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
