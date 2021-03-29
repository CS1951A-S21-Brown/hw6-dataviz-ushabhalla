var create_list = function(obj) {
  // console.log(obj.toString());
  var arr = [];
  for (var i = 1872; i <2021; i++) {
    // console.log(obj[2020]);
    arr.push(
      {"key": i,
       "val":obj[toString(i)]}
    );
  };
  // console.log(arr);
  return arr;
};

var create_yrdict = function() {
  var years = [];
  var dict = {};
  d3.csv("data/football.csv", function(data) {
    // console.log(data);
    var yr = data.date.slice(0,4);
    if (!(yr in dict)) {
      dict[yr]=1;
    }
    else {
      dict[yr] = dict[yr]+1;
    }
  });
  // console.log(Object.keys(dict));

  var years = create_list(dict);
  // for (yr in Object.keys(dict)) {
  //   console.log("hi");
  //   years.push(
  //     {"yr": yr,
  //      "games":dict[yr]}
  //   );
  // };
  // console.log(dict);
  return years;
};

var create_windict = function() {
  var dict = {};
  d3.csv("data/football.csv", function(data) {
    // console.log(data);
    // var yr = data.date.slice(0,5);
    if (data.home_score > data.away_score) {
      if (!(data.home_team in dict)) {
        dict[data.home_team] = {};
        dict[data.home_team]["wins"]=1;
        dict[data.home_team]["losses"]=0;
      } else {
        dict[data.home_team]["wins"]++;
      }

      if (!(data.away_team in dict)) {
        dict[data.away_team] = {};
        dict[data.away_team]["wins"]=0;
        dict[data.away_team]["losses"]=1;
      } else {
        dict[data.away_team]["losses"]++;
      }
    } else {
      if (!(data.home_team in dict)) {
        dict[data.home_team] = {};
        dict[data.home_team]["wins"]=0;
        dict[data.home_team]["losses"]=1;
      } else {
        dict[data.home_team]["losses"]++;
      }

      if (!(data.away_team in dict)) {
        dict[data.away_team] = {};
        dict[data.away_team]["wins"]=1;
        dict[data.away_team]["losses"]=0;
      } else {
        dict[data.away_team]["wins"]++;
      }
    }
  });
  // console.log(dict);
  return dict;
};

var create_wcdict = function() {
  var dict = {};
  d3.csv("data/football.csv", function(data) {
    // console.log(data);
    var yr = data.date.slice(0,4);
    // console.log(yr);
    if  ((yr == "2019") || (yr == "2020")) {
      var tourn = data.tournament;
      // console.log(tourn);
      if (tourn == "FIFA World Cup qualification") {
        if (data.home_score > data.away_score) {
          if (!(data.home_team in dict)) {
            dict[data.home_team] = {};
            dict[data.home_team]["wins"]=1;
            dict[data.home_team]["losses"]=0;
          } else {
            dict[data.home_team]["wins"]++;
          }

          if (!(data.away_team in dict)) {
            dict[data.away_team] = {};
            dict[data.away_team]["wins"]=0;
            dict[data.away_team]["losses"]=1;
          } else {
            dict[data.away_team]["losses"]++;
          }
        } else {
          if (!(data.home_team in dict)) {
            dict[data.home_team] = {};
            dict[data.home_team]["wins"]=0;
            dict[data.home_team]["losses"]=1;
          } else {
            dict[data.home_team]["losses"]++;
          }

          if (!(data.away_team in dict)) {
            dict[data.away_team] = {};
            dict[data.away_team]["wins"]=1;
            dict[data.away_team]["losses"]=0;
          } else {
            dict[data.away_team]["wins"]++;
          }
        }
      }
    }
  });
  // console.log(dict);
  return dict;
};
