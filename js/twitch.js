$(document).ready(function() {

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
      //var newHeader = document.createElement("h2");
      //var snippetNode = document.createTextNode(elem);
      //newHeader.appendChild(snippetNode);
      //newHeader.appendChild(profilePic);
      var newDiv = document.createElement('div');  
      //newDiv.appendChild(newHeader);
      newDiv.appendChild(profilePic);
      newDiv.className = "grid-item " + gridClasses[ranNum]; 
      currentDiv.append(newDiv);
  });
  /*profilePic.src = 'img/glitch.png';
  if (gridClasses[ranNum].length > 1 && gridClasses[ranNum].charAt(16) == '2')
  {
    profilePic.setAttribute("width", "150px");
    profilePic.setAttribute("height", "150px");

  }
  else if (gridClasses[ranNum].length > 1 && gridClasses[ranNum].charAt(16) == '3')
  {
    profilePic.setAttribute("width", "250px");
    profilePic.setAttribute("height", "250px");
  }
  else
  {
    profilePic.setAttribute("width", "50px");
    profilePic.setAttribute("height", "50px");
  }
  profilePic.className = 'img-rounded img-responsive';
  var currentDiv = $("#gridResults");
  //var newHeader = document.createElement("h2");
  //var snippetNode = document.createTextNode(elem);
  //newHeader.appendChild(snippetNode);
  //newHeader.appendChild(profilePic);
  var newDiv = document.createElement('div');  
  //newDiv.appendChild(newHeader);
  newDiv.appendChild(profilePic);
  newDiv.className = "grid-item " + gridClasses[ranNum]; 
  currentDiv.append(newDiv);*/
}
