  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDA6qjb2kMkUA3irieVaRWYKqzz-eEWdQg",
    authDomain: "train-times-68b2b.firebaseapp.com",
    databaseURL: "https://train-times-68b2b.firebaseio.com",
    projectId: "train-times-68b2b",
    storageBucket: "train-times-68b2b.appspot.com",
    messagingSenderId: "90237365142"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("button").on("click", function(){
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#trainDestination").val().trim();
    var firstTime = $("#firstTrain").val().trim();
    var frequency = $("#trainFrequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentT = moment();
    var currentTime = (moment(currentT).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    minutesAway = frequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextTrain).format("hh:mm");

    $("input").val("");

    database.ref("/train-times-68b2b").push({
        name : name,
        destination : destination,
        firstTime : firstTime,
        frequency : frequency,
        nextArrival : nextArrival,
        minutesAway : minutesAway
    });
    
});

database.ref().on("child_added", function(childSnapshot){
    var sv = childSnapshot.val();
    $(".table").append("<tr><th scope='row'>"+ sv.name +"</th><td>"+ sv.destination +"</td><td>"+ sv.frequency +"</td><td>"+ sv.nextArrival +"</td><td>"+ sv.minutesAway +"</td></tr>")
});
