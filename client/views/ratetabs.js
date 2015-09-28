//Meteor.subscribe("tabs");

Template.ratetabs.helpers({
 	rtabsOut: function(){
    var mc = Session.get("mcat");
    var mcat = typeof mc !== 'undefined' ? mc : 0;
    //var rtabs = [];
    var rtabs_out = [];
    //rtabs = Ratetabs.find({});
    Meteor.call('readMYapi', function (err, res) {
      if (err) {
        Session.set('rtabs', {error: err});
      } else {
        //rtabs = res;
        var rtabs = res.ratetabs;
        rtabs.forEach(function(item) {
          tsObj = new Date(item.timestamp);
          var tab_date = tsObj.getFullYear() + '-' + (tsObj.getMonth() + 1) + '-' + tsObj.getDate();
          rtab_out = {
            variabel: item.mcats[mcat].variabel,
            vast1jr: item.mcats[mcat].vast1jr,
            vast5jr: item.mcats[mcat].vast5jr,
            vast10jr: item.mcats[mcat].vast10jr,
            vast15jr: item.mcats[mcat].vast15jr,
            vast20jr: item.mcats[mcat].vast20jr,
            vast30jr: item.mcats[mcat].vast30jr,
            date: tab_date
          };
          rtabs_out.push(rtab_out);
        });
        Session.set('rtabs', rtabs_out)  ;
      }
    });
    return Session.get('rtabs');
  }
});

Template.ratetabs.events({
  "change #mcatpicker": function(evt) {
    var newValue = $(evt.target).val();
    Session.set("mcat", newValue);
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
