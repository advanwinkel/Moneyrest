var apiCall = function (apiUrl, callback) {
  try {
    var response = HTTP.get(apiUrl).data;
    callback(null, response);
  } catch (error) {
    console.log("error: " + error);
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
}

Meteor.methods({
  'readMYapi': function () {
    //console.log('Method.readMYapi');
    this.unblock();
    var apihost = Meteor.settings.api_host;
    var apiUrl = 'http://' + apihost + '/apirt';
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    return response;
  }
});