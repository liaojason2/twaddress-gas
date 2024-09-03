// Deploy flask app first https://github.com/liaojason2/twaddress-gas

endpoint = ""

function onEdit(e) {
  // Ensure the event object is defined
  if (!e) {
    Logger.log('Event object is not defined.');
    return;
  }
  
  // Get the active spreadsheet and sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Define the edited range and the edited cell
  const range = e.range;
  
  // Ensure the correct sheet and column are being edited
  if (sheet.getName() == "Sheet1" && range.getColumn() == 2) {
    // Get the row number of the edited cell
    const row = range.getRow();
    
    // Get the value entered in the B column
    const inputValue = range.getValue();
    
    // Define the URL and the JSON payload
    const apiUrl = endpoint;
    const payload = JSON.stringify({ address: inputValue });
    
    // Define the options for the POST request
    const options = {
      method: 'POST',
      contentType: 'application/json',
      payload: payload
    };
    
    try {
      if (inputValue) {
        // Make the POST request
        const response = UrlFetchApp.fetch(apiUrl, options);
        
        // Get the response as plain text
        const apiResult = response.getContentText();
        
        // Set the result in the corresponding C column
        sheet.getRange(row, 3).setValue(apiResult);
      } else {
        sheet.getRange(row, 3).setValue("");
      }

    } catch (error) {
      Logger.log('Error fetching API or processing response: ' + error.message);
      sheet.getRange(row, 3).setValue('Error');
    }
  }
}