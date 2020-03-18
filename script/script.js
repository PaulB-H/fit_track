const workoutArray = [];

let setIterator = 2;

class exerciseObj {
    constructor(name, set, weight, reps) {
        this.name = name;
        this.set = set;
        this.weight = weight;
        this.reps = reps;
    };
};

// var exercise = new exerciseObj(1, 2, 3, 4);

document.getElementById("submit_button").addEventListener("click", new_exercise);

function new_exercise() {

    var name = document.getElementById("exercise_name").value;

    console.log(name);

    var set = document.getElementById("exercise1_set").value;
    var weight = document.getElementById("exercise1_weight").value;
    var reps = document.getElementById("exercise1_reps").value;

    console.log(typeof weight);

    if (name === "") {
        iziToast.warning({
            title: 'Enter Exercise Name',
        });
        return;
    }
    else if ((weight === "") || (reps === "") || (Number.isInteger(weight) === false)) {
        iziToast.warning({
            title: 'Missing Weight or Reps \n',
            titleSize: 20,
            titleLineHeight: 40,
            message: 'Numbers Only!',
            messageSize: 25,
            messageLineHeight: 40,
            timeout: 4000,
        });
        return;
    };

    let exercise = new exerciseObj(name, set, weight, reps);

    workoutArray.push(exercise);

    console.log(JSON.stringify(workoutArray));

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

iziToast.settings({
    position: 'topCenter',
    pauseOnHover: false,
    displayMode: 'replace',
    timeout: 3000,
    closeOnClick: true,
});