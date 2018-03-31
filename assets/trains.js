

var database = firebase.database();

$("button").on("click", function(){
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    firstTime = $("#firstTrain").val().trim();
    frequency = $("#trainFrequency").val().trim();

    console.log(name, destination, firstTime, frequency);

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

    database.ref().push({
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
