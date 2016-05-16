$(document).ready(function() {

  $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });
  
  var tempList = ['glack', 'black', 'slack', 'crack', 'smack', 'snagg',
                  'chicken', 'buggy', 'slippery'];

  gridClasses = [' ', 'grid-item--width2', 'grid-item--width3', 
                     'grid-item--height2'];

  tempList.forEach(buildStreamers);

});

function getRandomIntInclusive(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildStreamers(elem, index, arr)
{
  var currentDiv = $("#gridResults");
  ranNum = getRandomIntInclusive(0, 3);
  var newHeader = document.createElement("h2");
  var snippetNode = document.createTextNode(elem);
  newHeader.appendChild(snippetNode);
  var newDiv = document.createElement('div');  
  newDiv.appendChild(newHeader);
  newDiv.className = "grid-item " + gridClasses[ranNum]; 
  currentDiv.append(newDiv);
}
