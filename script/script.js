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
                <input id="exercise1_weight" name="set1_weight" type="number" class="form-control" placeholder="Weight">
            </div>

            <div class="col-4">
                <label for="set1_reps">Reps</label>
                <input id="exercise1_reps" name="set1_reps" type="number" class="form-control" placeholder="Reps">
            </div>

        </div>

    `);

    iziToast.success({
        title: 'OK',
        message: 'Added exercise to workout!',
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

    $("#workout_builder").append(`<p style="margin-bottom: 5px; margin-top: 10px; ">Workout: ${workout[0].date}<i class="far fa-trash-alt workout_current_set_icon" style="float: right;"></i></p> `)

    var i;

    for (i = 1; i < workout.length; i++) {

        $("#workout_builder").append(`

            <div id="exercise${i}div" class="workout_current_set_div">

                <p style="margin-bottom: 0; margin-right: 0.06em;"><strong>${workout[i].name}</strong>
                    <i class="far fa-trash-alt workout_current_set_icon" style="float: right;"></i>
                    <i class="far fa-edit edit_icon" style="float:right;"></i>
                </p>

            </div>

        `)

        for (a = 0; a < workout[i].sets.length; a++) {

            $(`#exercise${i}div`).append(`

                <p style="margin-bottom: 0; margin-left: 20px;">Set ${workout[i].sets[a].set}</p>

                <p class="workout_current_set"> Weight: <strong>${workout[i].sets[a].weight}</strong> / Reps: <strong>${workout[i].sets[a].reps}</strong>
                    <i class="far fa-trash-alt workout_current_set_icon" style="float: right;"></i>
                    <i class="far fa-edit edit_icon" style="float:right;"></i>
                </p>

            `)

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


$('.edit-btn').click(function () {
    $("input").each(function (index) {
        $(this).attr("readonly", "");
        $(this).css("background", "white");
        $(this).css("border", "none");
        console.log("Loop")
    });
    $(".save-btn").each(function (index) {
        $(this).hide();
        $(this).prev("button").show();

    });
    $(this).prevAll("input").removeAttr("readonly");
    $(this).prevAll("input").css("background", "#E9ECEF");
    $(this).prevAll("input").css("border", "1px solid darkgray");
    $(this).prevAll("input").css("border-radius", "5px");
    $(this).prevAll("input").fadeToggle("fast");
    $(this).prevAll("input").fadeToggle("fast");
    $(this).prevAll("input").fadeToggle("fast");
    $(this).prevAll("input").fadeToggle("fast");
    $(this).prevAll("input").fadeToggle("fast");
    $(this).prevAll("input").fadeToggle("fast");
    // for (var i = 0; i > 6; i++) {
    //     $(this).prevAll("input").fadeToggle("fast");
    //     console.log("fadetoggle loop")
    // };
    // $(this).fadeOut();
    // $(this).next("button").delay(500).fadeIn();

    $(this).hide();
    $(this).next("button").show();
});

$('.save-btn').click(function () {
    $(this).prevAll("input").attr("readonly", "");
    $(this).prevAll("input").css("background", "white");
    $(this).prevAll("input").css("border", "none");
    // $(this).fadeOut();
    // $(this).prev("button").delay(500).fadeIn();

    $(this).hide();
    $(this).prev("button").show();
});