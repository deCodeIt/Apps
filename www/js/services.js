angular.module('snapit.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          console.log(error);
          q.reject(error);
        });
    });
    console.log("QUERYCLICKED");
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Team', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    console.log("Entered Team All");
    return DBA.query("SELECT firstname, lastname FROM people")
      .then(function(result){
        console.log("About to return : Team All");
        console.log(DBA.getAll(result));
        return DBA.getAll(result);
      });

  };
  self.selectit = function() {
        var query = "SELECT firstname, lastname FROM people";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    };

  // self.get = function(memberId) {
  //   var parameters = [memberId];
  //   return DBA.query("SELECT id, name FROM team WHERE id = (?)", parameters)
  //     .then(function(result) {
  //       return DBA.getById(result);
  //     });
  // }

  // self.add = function(member) {
  //   var parameters = [member.id, member.name];
  //   return DBA.query("INSERT INTO team (id, name) VALUES (?,?)", parameters);
  // }

  // self.remove = function(member) {
  //   var parameters = [member.id];
  //   return DBA.query("DELETE FROM team WHERE id = (?)", parameters);
  // }

  // self.update = function(origMember, editMember) {
  //   var parameters = [editMember.id, editMember.name, origMember.id];
  //   return DBA.query("UPDATE team SET id = (?), name = (?) WHERE id = (?)", parameters);
  // }

  return self;
})