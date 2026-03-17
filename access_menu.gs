//html menu 
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Snazzy Sheet Gradients')
    .addItem('Basic', 'showBasic')
    .addItem('Advanced', 'showAdvanced')
    .addItem('Templates', 'showTemplate')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function showBasic(){
  var html = HtmlService.createHtmlOutputFromFile('Basic')
  SpreadsheetApp.getUi().showSidebar(html);
}

function getValuesFromForm(form) {
  var startcolor = form.startcolor
  var endcolor = form.endcolor
  return startcolor
}

function showAdvanced(){
  var html = HtmlService.createHtmlOutputFromFile('Advanced')
  SpreadsheetApp.getUi().showSidebar(html);
}

function showTemplate(){
  var html = HtmlService.createHtmlOutputFromFile('Template')
  SpreadsheetApp.getUi().showSidebar(html);
}
