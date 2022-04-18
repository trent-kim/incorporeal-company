let walks;

let strangerOne = document.getElementById("strangerOne");
let strangerTwo = document.getElementById("strangerTwo");
let strangerThree = document.getElementById("strangerThree");
let recordings = [strangerOne, strangerTwo, strangerThree];


$.getJSON("data.json", function (data) {
    walks = data.walks;

    
});

$("#walkButton").click(function () {
    let t = 0;
  
    // $(".running").css("animation-play-state", "running");
    $(".landscape").css("animation-play-state", "running");
    // $(".person").css("animation-play-state", "running");
    // $(".personMove").css("animation-play-state", "running");
    // $("#person" + numPerson).addClass("running");
    for (let j = 0; j < walks.length; j++) {
        let ranTime = Math.floor(Math.random() * (25000 - 20000) + 20000);
        (function(index) {
            setTimeout(function() {
                let ranHeight = Math.floor(Math.random() * (75 - 55) + 55);
                let ranDirect = Math.floor(Math.random() * (3 - 1) + 1);
                console.log(ranDirect);
                if (ranDirect == 1) {
                    $("#landscapeContainer").prepend(`<div id="person${j}" class="person animatePerson2" style="top: ${ranHeight}%;">
                                                            <div id="personMove${j}" class=" personMove animatePerson1">
                                                                ${walks[j].name}
                                                            </div>
                                                        </div>`);
                } else if (ranDirect == 2) {
                    $("#landscapeContainer").prepend(`<div id="person${j}" class="person animatePerson3" style="top: ${ranHeight}%;">
                                                        <div id="personMove${j}" class=" personMove animatePerson1">
                                                            ${walks[j].name}
                                                        </div>
                                                    </div>`);
                }
                $(".person").css("animation-play-state", "running");
                $(".personMove").css("animation-play-state", "running");
            }, j * ranTime);
        })(j);
        
    };

    $("#walkButton").removeClass("hover");
    $("#walkButton").addClass("off");

    $("#arriveButton").removeClass("off");
    $("#arriveButton").addClass("hover");
});



// function animationDelay(numPerson) {
//     console.log(numPerson);
//     setTimeout(() => {
//         let ranHeight = Math.floor(Math.random() * (75 - 55) + 55);
//         let ranDirect = Math.floor(Math.random() * (3 - 1) + 1);
//         console.log(ranDirect);
//         if (ranDirect == 1) {
//             $("#landscapeContainer").prepend(`<div id="person${numPerson}" class="person animatePerson2" style="top: ${ranHeight}%;">
//                                                 <div id="personMove${numPerson}" class="animatePerson1">
//                                                     ${walks[numPerson].name}
//                                                 </div>
//                                             </div>`);
//         } else if (ranDirect == 2) {
//             $("#landscapeContainer").prepend(`<div id="person${numPerson}" class="person animatePerson3" style="top: ${ranHeight}%;">
//                                                 <div id="personMove${numPerson}" class=" personMove animatePerson1">
//                                                     ${walks[numPerson].name}
//                                                 </div>
//                                             </div>`);
//         }
//         $(".person").css("animation-play-state", "running");
//         $(".personMove").css("animation-play-state", "running");
//     }, 15000);
        
// }


let hadStranger = false;
let isPaused = false;

// let hadStranger = false;
// check if person is in range
// if person is in range, if hadStranger = false, hadStranger = true, add button
// if person no people are in range, if hadStranger = true, hadStranger = false, remove button


setInterval(function () {
    if(!isPaused) {
        strangerInRange();
    }
}, 500);

function strangerInRange() {
    for (let y = 0; y < walks.length; y++) {
        let personDistance = $("#person" + y).offset().left - $("#you").offset().left;
        // console.log(personDistance);
        if (-80 < personDistance && personDistance < 80) {
            if (hadStranger == false) {
                $("#person" + y).addClass("walkWith");
                $(".joinLeaveButton").addClass("button");
                $(".joinLeaveButton").addClass("hover");
                $(".joinLeaveButton").append(`<div>With Stranger</div>`);
                $(".joinLeaveButton").attr("onclick", "clickPerson()");
                y = walks.length + 1;
                hadStranger = true;
            }
        } else {
            if (hadStranger == true) {
                $(".person").removeClass("walkWith");
                $(".joinLeaveButton").removeClass("button");
                $(".joinLeaveButton").removeClass("hover");
                $(".joinLeaveButton").empty();
                $(".joinLeaveButton").removeAttr("onclick", "clickPerson()");
                hadStranger = false;
            };
        };  
    };
};

function clickPerson() {
    isPaused = true;
    $(".joinLeaveButton").empty();
    $(".joinLeaveButton").removeAttr("onclick", "clickPerson()");
    $(".joinLeaveButton").append(`<div>Alone</div>`);
    $(".joinLeaveButton").attr("onclick", "leavePerson()");

    $(".walkWith").css("animation-play-state", "paused");
    // $(".person").removeAttr("onclick");

    let clickedId = $(".walkWith").attr("id");
    let idNum = clickedId.slice(6);
    console.log(idNum);
    let recording = recordings[idNum];
    recording.play();

    $(".storyText").empty();
    $(".storyText").append(`${walks[idNum].message}`);
};
// <div id="${walks[idNum].name}" class="personPopUp"><div class="personMessage">
// </div></div>

function leavePerson() {
    isPaused = false;
    // $(".person").attr("onclick", "clickPerson(this.id)");
    $(".storyText").empty();
    $(".person").css("animation-play-state", "running");
    $(".joinLeaveButton").empty();
    $(".joinLeaveButton").removeAttr("onclick", "leavePerson()");

    for (let f = 0; f < recordings.length; f++) {
        if (recordings[f].paused == false) {
            recordings[f].pause();
        };
    };
};

function clickEnd() {
    // Change button to 'start'
    //$("#walkButton").removeClass("stop");
    //$("#walkButton").addClass("start");
    // $("#walkButton").html("Lets Walk");
    // Pause animations
    // $(".person").css("animation-play-state", "paused");
    // $(".animatePerson2").css("animation-play-state", "paused");
    $(".landscape").css("animation-play-state", "paused");

    $("#arriveButton").removeClass("hover");
    $("#arriveButton").addClass("off");

    $("#walkButton").removeClass("off");
    $("#walkButton").addClass("hover");
};