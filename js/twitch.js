$(document).ready(function() {

  lastUser = '';  
  lastClass = '';

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
    console.log(lastUser);
    var tempUser = $(this).attr("id");
    var currentPhotoDiv = document.getElementById(tempUser);
    tempUser = '#' + tempUser.substring(0, tempUser.length - 1);
    if (lastUser !== '')
    {
      console.log("inside if statement " + lastUser);
      var lastPhotoUser = lastUser.substring(1, lastUser.length) + lastUser.charAt(1);
      console.log(lastPhotoUser);
      var lastPhotoDiv = document.getElementById(lastPhotoUser);
      lastPhotoDiv.className = lastClass;
      $(lastUser).toggle();
    }
    var currentPhotoUser = tempUser.substring(1, tempUser.length - 1) + tempUser.charAt(1);
    lastClass = currentPhotoDiv.className;
    console.log(lastClass);
    currentPhotoDiv.className = 'grid-item grid-item--width4';
    $(tempUser).toggle();
    
    lastUser = tempUser;
    console.log(tempUser);
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
