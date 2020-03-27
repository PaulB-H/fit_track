var d = new Date();

var dateString = d.toDateString();

let workout = [{ 'name': '', 'date': dateString }];

var setIterator = 2;

class exerciseObj {
    constructor(name, sets) {
        this.name = name;
        this.sets = sets;
    };
};

document.getElementById("submit_button").addEventListener("click", new_exercise);

function new_exercise() {

    var builder = setIterator - 1;

    var name = document.getElementById("exercise_name").value;

    if (name === "") {
        iziToast.warning({
            title: 'Enter Exercise Name',
        });
        return;
    }

    for (v = 1; v <= builder; v++) {

        var pseudo_weight = document.getElementById(`exercise${v}_weight`).value;

        pseudo_weight = parseInt(pseudo_weight);

        var pseudo_reps = document.getElementById(`exercise${v}_reps`).value;

        pseudo_reps = parseInt(pseudo_reps);

        if ((pseudo_weight === "") || (pseudo_reps === "") || (Number.isInteger(pseudo_weight) === false) || (Number.isInteger(pseudo_reps) === false)) {
            iziToast.warning({
                title: 'Missing Weight or Reps',
                message: 'Numbers Only!',
            });
            return;
        };
    }

    let sets = [];

    for (i = 1; i <= builder; i++) {
        var weight = document.getElementById(`exercise${i}_weight`).value;
        var reps = document.getElementById(`exercise${i}_reps`).value;
        sets.push({ 'set': i, 'reps': reps, 'weight': weight });
        console.log(`Looped ${i} times`)
        console.log(builder)
    };

    var exercise = new exerciseObj(name, sets);

    workout.push(exercise);

    $("#new_workout").html(`            
            <label id="exercise_label" for="exercise_name">Exercise</label>

            <div class="form-row">
                <input id="exercise_name" name="exercise_name" type="text" class="form-control"
                    placeholder="Exercise Name">
            </div>

            <div class="form-row">
                <div class="col-3 set_number" tabindex="-1">
                    <label for="set_num" tabindex="-1">Set</label>
                    <input id="exercise1_set" name="set_num" class="form-control" value="1" style="padding-left: 6px" tabindex="-1"
                        readonly>
                </div>
                <div class="col-4">
                    <label for="set1_weight">Weight</label>
                    <input id="exercise1_weight" name="set1_weight" type="number" class="form-control"
                        placeholder="Weight">
                </div>
                <div class="col-4">
                    <label for="set1_reps">Reps</label>
                    <input id="exercise1_reps" name="set1_reps" type="number" class="form-control" placeholder="Reps">
                </div>
            </div>
    `);

    iziToast.success({
        title: 'OK',
        message: 'Successfully added exercise!',
    });

    setIterator = 2;

};

$('.add_set').click(function () {

    $('#new_workout').append(`    
    <div class="form-row">
    
        <div class= "col-3 set_number" tabindex="-1">
            <label for="set${setIterator}_num"  tabindex="-1">Set</label>
            <input id="exercise${setIterator}_set" name="set${setIterator}_num" class="form-control" value="${setIterator}" style="padding-left: 6px"  tabindex="-1"
            readonly>
        </div>

        <div class="col-4">
            <label for="set${setIterator}_weight">Weight</label>
            <input id="exercise${setIterator}_weight" name="set${setIterator}_weight" type="number" class="form-control"
                placeholder="Weight">
        </div>

        <div class="col-4">
            <label for="set${setIterator}_reps">Reps</label>
            <input id="exercise${setIterator}_reps" name="set${setIterator}_reps" type="number" class="form-control" placeholder="Reps">
        </div>

    </div>
    `);

    setIterator++;

});

$('.delete_set').click(function () {

    if (setIterator >= 3) {
        $('#new_workout .form-row').last().remove();
        setIterator--;
        console.log(setIterator);
    };

});


$('document').ready(function () {

    $("#new_workout").html(`            
            <label id="exercise_label" for="exercise_name">Exercise</label>

            <div class="form-row">
                <input id="exercise_name" name="exercise_name" type="text" class="form-control"
                    placeholder="Exercise Name">
            </div>

            <div class="form-row">
                <div class="col-3 set_number" tabindex="-1">
                    <label for="set_num" tabindex="-1">Set</label>
                    <input id="exercise1_set" name="set_num" class="form-control" value="1" style="padding-left: 6px" tabindex="-1"
                        readonly>
                </div>
                <div class="col-4">
                    <label for="set1_weight">Weight</label>
                    <input id="exercise1_weight" name="set1_weight" type="number" class="form-control"
                        placeholder="Weight">
                </div>
                <div class="col-4">
                    <label for="set1_reps">Reps</label>
                    <input id="exercise1_reps" name="set1_reps" type="number" class="form-control" placeholder="Reps">
                </div>
            </div>
    `);
});



$('#view_workout').click(function () {
    showCurrentWorkout();
});

function showCurrentWorkout() {

    $("#workout_builder").html("")

    console.log(`Workout Name: NoName Workout Date: ${workout[0].date}`)

    $("#workout_builder").append(`<p>Workout Date: ${workout[0].date}</p>`)

    var i;

    for (i = 1; i < workout.length; i++) {

        console.log(`Exercise ${i} : ${workout[i].name}`)

        $("#workout_builder").append(`<div id="exercise${i}div" class="workout_current_set_div"><p>Exercise ${i} : ${workout[i].name}</p></div>`)

        for (a = 0; a < workout[i].sets.length; a++) {

            console.log(`Set # ${workout[i].sets[a].set}, weight: ${workout[i].sets[a].weight}, reps: ${workout[i].sets[a].reps} `)

            $(`#exercise${i}div`).append(`<p class="workout_current_set">Set ${workout[i].sets[a].set}: weight: ${workout[i].sets[a].weight} / reps: ${workout[i].sets[a].reps} <i class="far fa-trash-alt workout_current_set_icon" style="float: right;"></i> </p>`)

        }
    }

}

iziToast.settings({
    position: 'topCenter',
    pauseOnHover: false,
    displayMode: 'replace',
    timeout: 3000,
    closeOnClick: true,
});