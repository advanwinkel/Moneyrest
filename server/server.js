if (ServiceConfiguration.configurations.find({
    service: 'facebook'
  }).count() === 0) {
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '675173985891868',
    secret: 'aa55d29f0730f72e4db17ca473c9210f',
    loginStyle: 'popup'
  });
}