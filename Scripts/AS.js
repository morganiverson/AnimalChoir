var playing = false;
var spaceSounds;
var lineSounds;
//hold urls
var choir = document.getElementById("choir_type");
console.log(choir.innerHTML);
var animal_choir = true;

function setChoir() {


    if(choir.innerHTML.indexOf("Animal") != -1) {
        animal_choir = true;
        spaceSounds = ["cow", "dog", "monkey", "frog", "rooster", "bird"]; //add note
        lineSounds = ["pig", "elephant", "cat", "duck", "parot"];
    }
    else if (choir.innerHTML.indexOf("Robot") != -1) {
        animal_choir = false;
        spaceSounds = ["lightsaber", "atari", "arm", "short", "blip2", "dying"]; //add note
        lineSounds = ["laser", "pingas", "motor", "blip", "sping"];
    }
    else if (choir.innerHTML("Gospel") != -1){}
}
var hover = false;
class Note {
    constructor(name, pos) {
        this.name = name;
        this.pos = pos;
    }

    getDuration() {
        if (this.name == "eighth") return 500;
        else if (this.name == "quarter") return 1000;
        else if (this.name == "half") return 2000;
        else if (this.name == "whole") return 4000;
        else if (this.name == "hover") return 500;
    }
    getSoundURL() {
        var lineOrSpace = this.pos.charAt(0);
        //console.log(lineOrSpace);
        var num = this.pos.charAt(1);
        if (lineOrSpace == "l") return lineSounds[num - 1];
        else return spaceSounds[num - 1];
    }

    play(sound, timeoutID, wait) {
        //CREATE SOUND
        var duration = this.getDuration();
        //SET SOUND TO BE PLAYED

        sound = document.getElementById(this.getSoundURL());



        if (this.pos != "rest") {
            //                    console.log("SOUND::" + sound.id);
            //console.log("SOUND DURATION:: " + sound.duration);
            //PLAY SOUND
            timeoutID = setTimeout(function () {
                var pbr = (sound.duration * 1000) / duration;
                //SOUND.DURATION NOT WORKING
                //console.log("sound.duration: " + (sound.duration * 1000));
                console.log("NOTE:: " + sound.id + " DURATION:: " + duration);
                //console.log("PBR: " + pbr);


                //
                //if(pbr > pbr max JS) 
                //loop sound at slowest rate
                if (pbr > 2) {
                    pbr = 2;
                } else if (pbr < .1) {
                    pbr = .1;
                }
                //else if()
                sound.playbackRate = pbr;
                //sound.muted = false;
                //console.log(sound.muted);

                sound.play();
                sound.pause;
                sound.currentTime = 0;

                //console.log("playing now");

            }, wait);
        } else {
            setTimeout(function () {
            }, wait + this.getDuration());
        }
    }
}

function enterPage() {
    var enter_btn = document.getElementById("enter_btn");
    enter_btn.addEventListener("click", function(){
        document.getElementById("enter_btn").style.display = "none";
        document.getElementById("enter_txt").style.display = "none";
        document.getElementById("enter_div").style.opacity = "100%";

        hover = true;


    });

}


var song = [];

var totalBeats = 0;
var beatsPerMeausre = 8;
var beatsinCurrentMeasure = [0, 0, 0, 0];

var lineSelected = "";
var spaceSelected = "";


var path = (animal_choir) ? "Note_IMG/": "https://mwiv.github.io/AnimalChoir/Note_IMG/";

setSpaceHovers();
setLineHovers();

setLineClicks();
setSpaceClicks();

setnoteIMGClicks();

//var noteIMG = wholeNote.getImg;

//REMOVE NOTE WHEN CLICKED
function setnoteIMGClicks() {

    lineSelected = "";
    spaceSelected = "";

    clearOtherSpaces(0);
    clearOtherLines(0);
    //img span
    var nIMG = document.getElementsByClassName("noteIMG");
    Array.prototype.forEach.call(nIMG, function (img) {
        img.addEventListener("click", function () {
            var ID = img.getAttribute("id");

            var barNum = ID.charAt(1);
            var noteNum = ID.charAt(6);
            var arrpos = (8 * (parseInt(barNum) - 1)) + parseInt(noteNum);

            //console.log(barNum + " " + noteNum + " " + arrpos);
            var followers;
            if (img.innerHTML.indexOf("eighth") >= 0) followers = 0;
            else if (img.innerHTML.indexOf("quarter") >= 0) followers = 1;
            else if (img.innerHTML.indexOf("half") >= 0) followers = 3;
            else if (img.innerHTML.indexOf("whole") >= 0) followers = 7;


            //REMOVE VALUE FROM TOTAL IN MEASURE AND TOTAL IN SONG
            remove(img, ID);

            //REMOVE FROM SONG ARRAY
            song.splice(arrpos - 1, 1 + followers);
            console.log(song);


            removeFollowers(ID, img); //REMOVE INVISBILE NOTED FOR REMOVED NOTE
            shift(ID.charAt(1)); //SHIFT FOLLOWING NOTES
            disableButtons(ID.charAt(1)); //SHOW/HIDE NOTES THAT CAN BE USED
        });

    });
    console.log(song);
}

var clicked = 0;
var clickedLine = 0;
var clickedSpace = 0;

var invisibleIMG = "<img src = 'Animal_Choir_Note_IMG/invisible.png' class = 'INVS'>";

//REMOVE INVISIBLE NOTES FOLLOWING HELD NOTE
function removeFollowers(id, img) {
    //getnumber of followers

    if (img.innerHTML.indexOf("eighth") >= 0) followers = 0;
    else if (img.innerHTML.indexOf("quarter") >= 0) followers = 1;
    else if (img.innerHTML.indexOf("half") >= 0) followers = 3;
    else if (img.innerHTML.indexOf("whole") >= 0) followers = 7;

    //REMOVE FROM SONG


    //CALCULATE WHERE TO START IN ARRAY
    var barNum = id.charAt(1);
    //console.log(id.charAt(1));

    //console.log("ID:: " + id);
    //console.log("8 * (barNum - 1) = " + 8 * (parseInt(barNum) - 1));
    //BEAT IN MEAUSRE + ANY PREVIOUS BEATS
    var diff = (8 * (parseInt(barNum) - 1));
    var start = (parseInt(id.charAt(6)) + diff) - 1; //NOTE NUMBER

    //REMOVE FROM STAFF
    //console.log("RMEOVE FOLLOWERS");
    document.getElementById(id).innerHTML = "";

    var start = parseInt(id.charAt(6)) + 1;

    //console.log("start:: " + start);
    for (var i = 0; i < followers; i++) {
        var newID = id.substring(0, 6) + (start + i);
        //                console.log("newID:: " + newID);
        document.getElementById(newID).innerHTML = "";
    }
}

//ADD INVISIBLE NOTES FOLLOWING HELD NOTE
function addFollowers(id, n) {
    //console.log("ADD FOLLOWERS");
    //document.getElementById(id).innerHTML = "";

    //CALCULATE WHERE TO START IN ARRAY
    var barNum = id.charAt(1);
    //console.log(id.charAt(1));

    //            console.log("ID:: " + id);
    //console.log("8 * (barNum - 1) = " + 8 * (parseInt(barNum) - 1));
    //BEAT IN MEAUSRE + ANY PREVIOUS BEATS
    var diff = (8 * (parseInt(barNum) - 1));
    var start = parseInt(id.charAt(6)) + diff; //NOTE NUMBER

    //ADD FOLLOWERS TO SONG
    //            console.log("ARRAY START:: " + start);
    for (var i = 0; i < n; i++) {
        song[start + i] = "follower";
    }
    console.log(song);


    //ADD FOLLOWERS TO STAFF
    start = parseInt(id.charAt(6)) + 1;

    console.log("start:: " + start);
    for (var i = 0; i < n; i++) {
        var newID = id.substring(0, 6) + (start + i);
        //                console.log("newID:: " + newID);
        document.getElementById(newID).innerHTML = invisibleIMG;
        document.getElementById(newID).style.top = "54px";
        document.getElementById(newID).style.left = "30px";

        document.getElementById(newID).style.position = "absolute";
    }

}

//REMOVE NUMERICAL VALUES FROM COUNT
function remove(img, id) {
    //            console.log("barNum:: " + id.charAt(1));
    var barNum = id.charAt(1);
    if (img.innerHTML.indexOf("eighth") >= 0) {
        totalBeats -= 1;
        beatsinCurrentMeasure[barNum - 1] -= 1;
    } else if (img.innerHTML.indexOf("quarter") >= 0) {
        totalBeats -= 2;
        beatsinCurrentMeasure[barNum - 1] -= 2;
    } else if (img.innerHTML.indexOf("half") >= 0) {
        totalBeats -= 4;
        beatsinCurrentMeasure[barNum - 1] -= 4;
    } 
    else if (img.innerHTML.indexOf("whole") >= 0) {
        totalBeats -= 8;
        beatsinCurrentMeasure[barNum - 1] -= 8;
    }
}

//SHIFT NOTES IF PREVIOUS NOT WAS REMOVED TO REFLECT NUMERICAL COUNTS
function shift(barNum) {
    //console.log("totalBeats:: " + totalBeats);
    var arr = [];
    var notes = document.getElementsByClassName("note");

    Array.prototype.forEach.call(notes, function (n) {
        var ID = n.getAttribute("id");
        if (ID.charAt(1) == barNum) {
            //console.log("PUSH ID:: " + ID);
            arr.push(ID);
        }
    });

    //SHIFT ON SCREEN/STAFF
    //var shift = false;
    var i;
    for (i = 1; i < arr.length; i++) {
        //                console.log("I:: " + i);
        //                console.log("ARR:: " + arr[i] + " " + arr[i - 1]);
        var ID1 = arr[i - 1].substring(0, 2) + "note" + arr[i - 1].charAt(3);
        //                console.log("ID1:: " + ID1);
        var ID2 = arr[i].substring(0, 2) + "note" + arr[i].charAt(3);
        //                console.log("ID2:: " + ID2);

        ID1 = document.getElementById(ID1);
        //                console.log("ID1.innerHTML:: " + ID1.innerHTML);
        ID2 = document.getElementById(ID2);
        //                 console.log("ID2.innerHTML:: " + ID2.innerHTML);

        if (ID1.innerHTML == "" && ID2.innerHTML != "") {
            //shift = true;
            //CHANGE IMG
            ID1.innerHTML = ID2.innerHTML;

            ///CHANGE POS
            ID1.style.top = ID2.style.top;
            ID1.style.left = ID2.style.left;

            //CLEAR CURRENT
            ID2.innerHTML = "";

            //EDIT ARRAY
            i = 0;
        }
    }

    //console.log(song);
}

//BOLD LINE ON HOVER - PLAY SOUND
function setLineHovers() {
    //5 lines
    var lines = document.getElementsByClassName("line");
    Array.prototype.forEach.call(lines, function (line) {
        var soundID;
        var intervalID;

        line.addEventListener("mouseover", function () {
            var id = line.getAttribute("id")
            var l = id.substr(line.getAttribute("id").length - 1);
            //                    console.log(l);
            if(hover){editBorder(returnLines(l), "3px solid black");

                      var barNum = id.charAt(1);
                      //PLAY SOUND

                      //CREATE SOUND
                      new Note("hover", "l" + l).play(soundID, intervalID);
                      //console.log(soundID);
                     }

        });
        line.addEventListener("mouseout", function () {

            clearTimeout(intervalID);
            //soundID.pause();
            //soundID.currentTime = 0;
            var l = line.getAttribute("id").substr(line.getAttribute("id").length - 1);

            if (clicked != 0) {
                //                        console.log("clicked: " + clicked);

                clickedLine = clicked.charAt(0);
                spaceOrLine = clicked.charAt(1);
                //
                //                        console.log("cLIne:: " + clickedLine); 
                //                        console.log("s OR l:: " + spaceOrLine);

                if (spaceOrLine == "l") {
                    if (clickedLine != l)
                        editBorder(returnLines(l), "1.5px solid black");
                } else if (spaceOrLine != "l") editBorder(returnLines(l), "1.5px solid black");
            } else editBorder(returnLines(l), "1.5px solid black");
        });
    });


}

//HIGHLIGHT LINE ON HOVER - PLAY SOUND
function setSpaceHovers() {
    //5 lines
    var spaces = document.getElementsByClassName("space");
    Array.prototype.forEach.call(spaces, function (space) {
        var soundID;
        var intervalID;
        space.addEventListener("mouseover", function () {
            var s = space.getAttribute("id").substr(space.getAttribute("id").length - 1);
            //                            console.log(s);
            //                    console.log("SPACE OVER")
            if(hover) {
                editBKGD(returnSpaces(s), "lightyellow");


                //CREATE SOUND
                new Note("hover", "s" + s).play(soundID, intervalID);
            }
        });
        space.addEventListener("mouseout", function () {
            //stop sound
            clearTimeout(intervalID);
            stop(soundID);

            var s = space.getAttribute("id").substr(space.getAttribute("id").length - 1);

            if (clicked != 0) {
                //                        console.log("clicked: " + clicked);

                clickedSpace = clicked.charAt(0); //line number
                spaceOrLine = clicked.charAt(1); //s or l
                //
                //                        console.log("cSpace:: " + clickedSpace); 
                //                        console.log("s OR l:: " + spaceOrLine);


                if (spaceOrLine == "s") {
                    if (clickedSpace != s)
                        editBKGD(returnSpaces(s), "white");
                } else if (spaceOrLine != "s") editBKGD(returnSpaces(s), "white");
            } else editBKGD(returnSpaces(s), "white");


        });
    });
}

//RETURN LINES WITH LINE NUMBER N
function returnLines(n) {
    var lines = document.getElementsByClassName("line");
    var arr = [];
    for (var i = 0; i < lines.length; i++) {
        var id = lines[i].getAttribute("id");
        //console.log("l" + n  + " " + id.indexOf("l" + n));

        if (id.indexOf("l" + n) != -1) {
            arr.push(lines[i]);
            //                    console.log(id);
        }
    }
    return arr;
}

//RETUNR SPACES WITH SPACE NUMBER N
function returnSpaces(n) {
    var spaces = document.getElementsByClassName("space");
    var arr = [];
    for (var i = 0; i < spaces.length; i++) {
        var id = spaces[i].getAttribute("id");
        // console.log("ID:: " + id)
        //console.log("s" + n  + " " + id.indexOf("s" + n));

        if (id.indexOf("s" + n) != -1) {
            arr.push(spaces[i]);
            // console.log(id);
        }
    }
    return arr;
}

//BOLD OR THIN LINES
function editBorder(array, border) {
    for (var i = 0; i < array.length; i++) {
        array[i].style.border = border;
    }
}

//HIGHLIGHT OR UNHIGHLIGHT SPACES
function editBKGD(array, color) {
    //            console.log("editColor " + color);
    for (var i = 0; i < array.length; i++) {
        array[i].style.backgroundColor = color;
    }
}

//reset all space when another line/space clicked
function clearOtherLines(currentLine) {
    var lines = document.getElementsByClassName("line");
    Array.prototype.forEach.call(lines, function (line) {
        //SET LINE SELECTED
        var l = line.getAttribute("id").substring(line.getAttribute("id").length - 1);

        //                    console.log("otherLines:: " + l);

        if (l != currentLine) {
            editBorder(returnLines(l), "1.5px solid black");
            //                        console.log("changed");
        }
    });

}

function clearOtherSpaces(currentSpace) {
    var spaces = document.getElementsByClassName("space");
    Array.prototype.forEach.call(spaces, function (space) {
        var s = space.getAttribute("id").substr(space.getAttribute("id").length - 1);


        //                console.log("otherSpaces:: " + s);
        //                console.log("CLEARSPACES");
        if (s != currentSpace) {
            editBKGD(returnSpaces(s), "white");
            //                    console.log("changed");
        }
    });
}

//CLICKS
function setLineClicks() {
    var lines = document.getElementsByClassName("line");
    Array.prototype.forEach.call(lines, function (line) {
        line.addEventListener("click", function () {

            var ID = line.getAttribute("id");
            var barNum = ID.charAt(1);
            //console.log("Beats Left:: " + (beatsPerMeausre - beatsinCurrentMeasure[barNum]));

            if ((beatsPerMeausre - beatsinCurrentMeasure[barNum - 1]) > 0) {
                //console.log("active");

                //ENABLE BUTTONS
                disableButtons(barNum);

                //SET LINE SELECTED
                lineSelected = ID.substring(line.getAttribute("id").length - 1);
                spaceSelected = "";

                console.log("lineSelected:: " + lineSelected);

                clicked = lineSelected + "l";

                //HIDE ANY OTHER BOLDED LINES OR HIGHLIGHTED SPACES
                clearOtherSpaces(0);
                clearOtherLines(lineSelected);


                //BOLD LINE
                editBorder(returnLines(lineSelected.charAt(0)), "3px solid black");
                //                    console.log(lineSelected);


                if (noteSelected != "") showNote(true);
            }
        });
    });
}
function setSpaceClicks() {
    var spaces = document.getElementsByClassName("space");
    Array.prototype.forEach.call(spaces, function (space) {
        space.addEventListener("click", function () {

            var ID = space.getAttribute("id");
            var barNum = ID.charAt(1);
            //console.log("Beats Left:: " + (beatsPerMeausre - beatsinCurrentMeasure[barNum]));

            if ((beatsPerMeausre - beatsinCurrentMeasure[barNum - 1]) > 0) {
                // console.log("active");

                //ENABLE BUTTONS
                disableButtons(barNum);

                //SET SPACE SLEECTED
                spaceSelected = space.getAttribute("id").substr(space.getAttribute("id").length - 1);
                lineSelected = "";

                console.log("spaceSelected: " + spaceSelected);

                clicked = spaceSelected + "s";

                //HIDE ANY OTHER BOLDED LINES OR HIGHLIGHTED SPACES
                clearOtherSpaces(spaceSelected);
                clearOtherLines(0);

                //SET BKGD
                editBKGD(returnSpaces(spaceSelected.charAt(0)), "lightyellow");

                //                    console.log("noteSelected:: " + noteSelected);
                if (noteSelected != "") showNote(false);
            }
        });
    });
}


var noteSelected = "";
var noteRadios = document.getElementsByName("note_type_select");
Array.prototype.forEach.call(noteRadios, function (notes) {
    notes.addEventListener("change", function () {
        var ID = notes.value;
        if (ID.indexOf("rest") >= 0) {
            addRest(ID);
        } else {
            noteSelected = notes.value;
            if (lineSelected != "" && spaceSelected == "") showNote(true);
            else if (lineSelected == "" && spaceSelected != "") showNote(false);
        }
    });

});

//ADD REST WHEN CLICKED
function addRest(id) {
    var top;
    var left;
    var rest = id.substring(0, id.indexOf("rest"));
    var classType = rest + "rest";

    //ADD IMG TO SPAN
    //ADD IMG TO SPAN
    var barNum = Math.floor(totalBeats / beatsPerMeausre) + 1;
    //ADD IMG TO SPAN
    var noteNum = (beatsinCurrentMeasure[barNum - 1] + 1);

    var spanID = "b" + barNum + "note" + noteNum;


    console.log("REST TYPE:: " + rest);
    //ADD REST TO SONG
    song.push(new Note(rest, "rest"));

    if (rest == "eighth") {
        left = "17px";
        top = "46px";

        totalBeats += 1;
        beatsinCurrentMeasure[barNum - 1] += 1;
    } 
    else if (rest == "quarter") {
        left = "20px";
        top = "35px";

        totalBeats += 2;
        beatsinCurrentMeasure[barNum - 1] += 2;
        addFollowers(spanID, 1);
    } else if (rest == "half") {
        left = "27px";
        top = "56px";

        totalBeats += 4;
        beatsinCurrentMeasure[barNum - 1] += 4;
        addFollowers(spanID, 3);
    } else if (rest == "whole") {
        left = "27px";
        top = "38px";

        totalBeats += 8;
        beatsinCurrentMeasure[barNum - 1] += 8;
        addFollowers(spanID, 7);
    }
    //console.log("TOTAL BEATS:: " + totalBeats);


    //                        console.log("SPAN HTML:: " + document.getElementById(spanID).innerHTML);

    //ADD PATH TO NOTESELECTED
    id = path + id;



    //ADD IMAGE - NOTE TYPE
    document.getElementById(spanID).innerHTML = "<img class = '" + classType + "' src = '" + id + "' alt = '" + rest + " rest'>";

    //SET POSITION - NOTE VALUE
    document.getElementById(spanID).style.position = "absolute";
    document.getElementById(spanID).style.top = top;
    document.getElementById(spanID).style.left = left;

    disableButtons(barNum);

    classType = "";
    console.log(song);
}

//reset all note radios 
function resetNotesRadio() {
    var noteRadios = document.getElementsByName("note_type_select");
    Array.prototype.forEach.call(noteRadios, function (notes) {
        //                console.log("checked" + notes.checked);
        //                console.log("value: " + notes.value);
        notes.checked = false;
        //                if(noteSelected == notes.value) {
        ////                    console.log("checked" + notes.checked);
        ////                    console.log("value: " + notes.value);
        //                    notes.checked = false;
        //                }
    });
}

//SHOW NOTE WHEN NOTELINE/SPACE AND NOTE TYPE SELECTED
function showNote(line) {

    var left;
    var top;
    //GET LEFT POS
    var note = noteSelected.substring(0, noteSelected.indexOf("."));
    //console.log("lineSelected: " + lineSelected);

    //ADD NOTE TO SONG
    if (line) song.push(new Note(note, "l" + lineSelected));
    else song.push(new Note(note, "s" + spaceSelected));

    var barNum = Math.floor(totalBeats / beatsPerMeausre) + 1;
    //ADD IMG TO SPAN
    var noteNum = (beatsinCurrentMeasure[barNum - 1] + 1);

    var spanID = "b" + barNum + "note" + noteNum;
    //console.log("spanID:: " + spanID);
    //            console.log("SPAN HTML:: " + document.getElementById(spanID).innerHTML);

    //SET LEFT POS
    //ADD NOTE VALUES TOT TOTALS
    if (note == "whole") {
        left = "21px";
        totalBeats += 8;
        beatsinCurrentMeasure[barNum - 1] += 8;
        addFollowers(spanID, 7);
    } 
    else if (note == "half") {
        left = "13px";
        totalBeats += 4;
        beatsinCurrentMeasure[barNum - 1] += 4;
        addFollowers(spanID, 3);
    } 
    else if (note == "quarter") {
        left = "13px";
        totalBeats += 2;
        beatsinCurrentMeasure[barNum - 1] += 2;
        addFollowers(spanID, 1);
    } else if (note == "eighth") {
        left = "13px";
        totalBeats += 1;
        beatsinCurrentMeasure[barNum - 1] += 1;
    }

    //            console.log("totalBeats:: " + totalBeats);
    //            console.log("beatsINCurrent:: " + beatsinCurrentMeasure[barNum - 1]);
    //                SET CLASS
    var classType = note + "Note";
    //            console.log("CLASS TYPE:: " + classType);


    //NOTE FOR LINE VS NOTE FOR SPACE
    //GET TOP POSITION
    if (line) {
        //                console.log("lineSelected:: " + lineSelected);
        var l = parseInt(lineSelected);

        if (note == "whole") top = (133 - (25 * l)) + "px";
        else if (l > 3) {
            classType += " rotateIMG180";
            if (note == "half") top = (128 - (25 * l)) + "px";
            else if (note == "quarter") top = (128 - (25 * l)) + "px";
            else if (note == "eighth") {
                noteSelected = "eighthUP.png";
                classType = "eighthUPNote";
                top = (135 - (25 * l)) + "px";
            }
        } else {
            if (note == "half") top = (75 - (25 * l)) + "px";
            else if (note == "quarter") top = (83 - (25 * l)) + "px";
            else if (note == "eighth") top = (81 - (25 * l)) + "px";
        }
    }
    //SPACE
    else { //ITS A SPACE
        var s = parseInt(spaceSelected);
        //                console.log("spaceSelected:: " + spaceSelected);

        if (note == "whole") top = (121 - (25 * s)) + "px";

        if (s > 3) {
            classType += " rotateIMG180";
            //NEW EQUATIONS
            if (note == "half") top = (140 - (25 * s)) + "px";
            else if (note == "quarter") top = (142 - (25 * s)) + "px";
            else if (note == "eighth") {
                noteSelected = "eighthUP.png";
                classType = "eighthUPNote";
                top = (148 - (25 * s)) + "px";
            }
        } else {
            if (note == "half") top = (88 - (25 * s)) + "px";
            else if (note == "quarter") top = (95 - (25 * s)) + "px";
            else if (note == "eighth") top = (94 - (25 * s)) + "px";
        }
    }

    //console.log(parseInt(lineSelected));
    //            console.log("TOP::" + top);
    //            console.log("LEFT::" + left);
    //            

    //ADD PATH TO NOTESELECTED
    noteSelected = path + noteSelected;


    //ADD IMAGE - NOTE TYPE
    document.getElementById(spanID).innerHTML = "<img class = '" + classType + "' src = '" + noteSelected + "'>";

    //SET POSITION - NOTE VALUE
    document.getElementById(spanID).style.position = "absolute";
    document.getElementById(spanID).style.top = top;
    document.getElementById(spanID).style.left = left;

    //             console.log("SPAN HTML:: " + document.getElementById(spanID).innerHTML);
    //            console.log(document.getElementById(spanID).style.top);
    //            console.log(document.getElementById(spanID).style.left);

    disableButtons(barNum);

    console.log("TOTAL BEATS:: " + totalBeats);


    //RESET BORDERS AND BACKGROUNDS
    if (line) editBorder(returnLines(lineSelected), "1.5px solid black");
    else editBKGD(returnSpaces(spaceSelected), "white");

    //RESET SELECTION VALUES
    lineSelected = "";
    spaceSelected = "";
    classType = "";

    //UNCHECK RADIO BUTTON
    resetNotesRadio();
    noteSelected = "";

    //RESET CLICK VALUES
    clicked = 0;
    clickedLine = 0;
    clickedSpace = 0;
    console.log(song);
}

//DISABLE BUTTONS OF NOTES THAT WILL NOT FIT IN MEAUSRE
function disableButtons(currentMeasure) {
    var leftover = beatsPerMeausre - beatsinCurrentMeasure[currentMeasure - 1];
    var radioNotes = document.getElementsByName("note_type_select");

    if (leftover < 8) {
        radioNotes[3].disabled = true;
        radioNotes[7].disabled = true;
    } else {
        radioNotes[3].disabled = false;
        radioNotes[7].disabled = false;;
    }
    if (leftover < 4) {
        radioNotes[2].disabled = true;
        radioNotes[6].disabled = true;
    } else {
        radioNotes[2].disabled = false;
        radioNotes[6].disabled = false;
    }
    if (leftover < 2) {
        radioNotes[1].disabled = true;
        radioNotes[5].disabled = true;
    } else {
        radioNotes[1].disabled = false;
        radioNotes[5].disabled = false;
    }
    if (leftover == 0) {
        radioNotes[0].disabled = true;
        radioNotes[4].disabled = true;
    } else {
        radioNotes[0].disabled = false;
        radioNotes[4].disabled = false;
    }
}

function playSong() {
    playing = true;
    var soundID;
    var intervalID;
    for (var i = 0; i < song.length; i++) {
        console.log(song[i]);
        if (song[i] != "follower") {
            song[i].play(soundID, intervalID, (i * 500) + 100);
        }

    }
    playing = false;
}

function clearBoard() {
    var totalBeats = 0;
    var beatsinCurrentMeasure = [0, 0, 0, 0];
    console.log("clear");
    //    for(var i = 1; i <= 2; i++) {
    //        for(var j = 1; j <=8; j++) {
    //            document.getElementById("b" + i + "note" + j).innerHTML = "";
    //        }
    //    }
    var el = document.getElementsByClassName("noteIMG")[16];
    while (el.innerHTML != "")
        el.click();

    console.log(el);
    el = document.getElementsByClassName("noteIMG")[8];
    console.log(el);
    while (el.innerHTML != "")
        el.click();

    el = document.getElementsByClassName("noteIMG")[0];

    console.log(el);
    while (el.innerHTML != "")
        el.click();
}

//HOT CROSS BUNS
var song1 = [new Note("quarter", "s2"), new Note("quarter", "l1"), new Note("quarter", "s1"), new Note("quarter", "rest"), 
             new Note("eighth", "s1"), new Note("eighth", "s1"), new Note("eighth", "s1"),  new Note("eighth", "s1"),  new Note("eighth", "s2"),  new Note("eighth", "s2"), new Note("eighth", "s2"), new Note("eighth", "s2"), 
             new Note("quarter", "s2"), new Note("quarter", "l1"), new Note("quarter", "s1"), new Note("quarter", "rest")]; //fill with note objects and followers
var song2 = [new Note("eighth", "l3"), new Note("eighth", "l3"), new Note("eighth", "l5"), new Note("eighth", "l5"), new Note("eighth", "s6"), new Note("eighth", "s6"), new Note("quarter", "l5"), 
             new Note("eighth", "s5"), new Note("eighth", "s5"), new Note("eighth", "l4"), new Note("eighth", "l4"), new Note("eighth", "s4"), new Note("eighth", "s4"), new Note("quarter", "l3"),
             new Note("eighth", "s5"), new Note("eighth", "s5"), new Note("eighth", "l4"), new Note("eighth", "l4"), new Note("eighth", "s4"), new Note("eighth", "s4"), new Note("quarter", "l3")];
var song3 = [new Note("eighth", "s4"), new Note("eighth", "l3"), new Note("eighth", "s3"), new Note("eighth", "l3"), new Note("eighth", "s4"), new Note("eighth", "s4"), new Note("quarter", "s4"), 
             new Note("eighth", "l3"), new Note("eighth", "l3"), new Note("quarter", "l3"), new Note("eighth", "s4"), new Note("eighth", "l4"), new Note("quarter", "l4"), 
             new Note("eighth", "s4"), new Note("eighth", "l3"), new Note("eighth", "s3"), new Note("eighth", "l3"), new Note("eighth", "s4"), new Note("eighth", "s4"), new Note("quarter", "s4")];

//play pre made song 
function playBaseSong(n) {
    clearBoard();
    console.log("SONG:");
    console.log(song);
    console.log("TOTAL BEATS:: " + totalBeats);
    console.log("BM::");
    console.log(beatsinCurrentMeasure);


    //SET SONG
    var baseSong;
    if(n == 1) baseSong = song1;
    else if (n == 2) baseSong = song2;
    else if (n == 3) baseSong = song3;
    console.log(baseSong);
    //SHOW SONG ON STAFF   
    for(var i = 0; i < baseSong.length; i++) {
        var line;

        console.log(baseSong[i].name);                
        if(baseSong[i].pos == "rest"){
            var id = baseSong[i].name + "rest.png";
            addRest(id);
        }
        else{
            if(baseSong[i].pos.indexOf("l") >= 0){
                lineSelected = baseSong[i].pos.charAt(1);
                spaceSelected = "";
                line = true;
            }
            else {
                spaceSelected = baseSong[i].pos.charAt(1);
                lineSelected = "";
                line = false;
            }
            noteSelected = baseSong[i].name + ".png";
            showNote(line);
        }
    }
    //PLAY SONG
    //            var soundID;
    //            var intervalID;
    ////            for (var i = 0; i < song.length; i++) {
    ////                console.log(song[i]);
    //                
    //                
    //                
    ////                if (song[i] != "follower") {
    ////                    song[i].play(soundID, intervalID, (i * 500) + 100);
    ////                }
    //
    //            }



}
//document.getElementById("clear").addEventListener("click", clearBoard());
