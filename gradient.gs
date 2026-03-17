//get selected range
var spreadsheet = SpreadsheetApp.getActive();
var range = spreadsheet.getActiveRange();
var height = range.getHeight();

//Basic option
function basic(startcolour,endcolour) {
  var colourArray = [startcolour,endcolour]
  var rowArray = [1,height]
  gradient(colourArray,rowArray)
}

//Advanced option
function advanced(colours, rows, mode) {

  var colourArray = colours.split(", ") //the colour input for the main function
  var rowArray = [] //the row input for the main function
  var offset = 0 //for the absolute feature
  var arrayLength = colourArray.length
  var rowNumber = 0 //for when rows are auto-calculated
  
  if (rows === "") {
  
    rowArray.push(1)
    
    for (i = 1 ; i <= (arrayLength-2) ; i++) {
      rowNumber = ( (height-1) / (arrayLength-1) ) * i + 1
      rowArray.push(rowNumber)
    }
    
    rowArray.push(height)

  } else {
  
    rowArray = rows.split(", ")
    
    if (mode == 'absolute') {
      offset = range.getLastRow()-height
    }
    
  }
  
  for (var i=0; i<arrayLength ; i++) {
    rowArray[i] = parseFloat(rowArray[i]) - offset ;
  }
  
  gradient(colourArray, rowArray)
  
}

//Template option
function template(colours) {
  advanced(colours, "" , 'relative')
}

//the main function
function gradient(colourArray,rowArray) {
  
  //array length
  var arrayLength = colourArray.length;
  
  //apply first endpoint colour to rows above it
  if (rowArray[0]>0) {
    var firstEndpoint = range.offset(0, 0, Math.min(rowArray[0],height));
    firstEndpoint.setBackground(colourArray[0]);
  }
  
  //apply last endpoint colour to rows below it
  var lastEndpointRow = rowArray[arrayLength - 1];
  if (lastEndpointRow<height && lastEndpointRow>0) {
    var lastEndpoint = range.offset(lastEndpointRow, 0, height-lastEndpointRow);
    lastEndpoint.setBackground(colourArray[arrayLength-1]);
  } else if (lastEndpointRow<=0) {
    range.setBackground(colourArray[arrayLength-1])
  }
  
  //apply each endpoint colour to their respective row
  for (i in colourArray) {
    var i = i++;
    if (rowArray[i]<=height && rowArray[i]>0 && rowArray[i]==parseInt(rowArray[i],10) ) {
      var endpoint = range.offset(rowArray[i]-1, 0, 1);
      endpoint.setBackground(colourArray[i]);
    }
  }
  
  //calculate and apply each gradient colour
  for (i = 1 ; i <= arrayLength-1 ; i++) {
    colourBlender( colourArray[i-1] , colourArray[i] , rowArray[i-1] , rowArray[i] , range, height)
  }

};

//the function for calculating colours
function colourBlender(colour1, colour2, row1, row2 , range, height) {
  
  var rows = 0 ;
  var difference = row2 - row1
  var offset = Math.ceil(row1)-row1
  
  for (i = Math.floor(row1) + 1; i <= row2 ; i++ ) {
    rows += 1
  }
  
  var red1   = parseInt(colour1.slice(-6,-4),16)
  var green1 = parseInt(colour1.slice(-4,-2),16)
  var blue1  = parseInt(colour1.slice(-2   ),16)
  
  var red2   = parseInt(colour2.slice(-6,-4),16)
  var green2 = parseInt(colour2.slice(-4,-2),16)
  var blue2  = parseInt(colour2.slice(-2   ),16)
  
  for (i = offset ; i <= rows ; i++) {
    var red   = Math.round((  red2-red1  )/(difference) * i + red1  ).toString(16).padStart(2,"0")
    var green = Math.round((green2-green1)/(difference) * i + green1).toString(16).padStart(2,"0")
    var blue  = Math.round(( blue2-blue1 )/(difference) * i + blue1 ).toString(16).padStart(2,"0")
    var colour = '#' + red + green + blue
    var rowNumber = row1+i
    if (rowNumber<=height && rowNumber>0) {
      var rowRange = range.offset(rowNumber-1,0,1)
      rowRange.setBackground(colour)
    }
  }
  
}
