var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
outputMoon();
outputClock();
setInterval(outputClock,100);
// setInterval(outputMoon,100);

function outputClock() {
    var dt = new Date();
    document.getElementById("date").innerHTML = dt.toLocaleDateString();
    document.getElementById("day").innerHTML = weekday[dt.getDay()];
    var time = dt.toLocaleTimeString();
    document.getElementById("time").innerHTML = time.slice(0,-3);
    document.getElementById("meridiem").innerHTML = time.slice(-2);
}

function outputMoon() {
    var phase = moonPhase();
    if(phase > 8) {
        document.getElementById("moon").style.transform = "scaleX(-1)";
        phase = 8-(phase-8);
    }
    document.getElementById("moon").style.backgroundImage = "url(../images/moon/" + phase + ".svg)";
}

// https://en.wikipedia.org/wiki/Lunar_phase#Calculating_phase
function moonPhase() {
    // Calculate Julian Day Number of current date 
    var [M, D, Y] = (new Date()).toLocaleDateString().split("/");
    Y = parseInt(Y);
    M = parseInt(M);
    D = parseInt(D);
    var currentJDN = JDN(Y, M, D);
    
    // calculate Julian Day Number of a known New Moon
    var pastJDN = JDN(2020, 1, 24);

    var age = (currentJDN - pastJDN) % 29.530588853; // length of synodic month
    return phaseName(age);
}

/* The major moon phases occur at the quarters of 29.53.
   If the age is less than a day above the number that means that that phase occured on that day.
   The ages are the time in the lunar calendar at the end of the day (I think),
   so if 29.53/2 is between age and age-1 then the full moon is today. 
   The waning and waxing phases are split into 3 equal parts*/
function phaseName(age) {
    if(age < 1) {
        return 0; //new moon
    }
    if(age < 3.128) {
        return 1;
    }
    if(age < 5.255) {
        return 2;
    }
    if(age < 7.383) {
        return 3;
    }
    if(age < 8.383) {
        return 4; //first quarter
    }
    if(age < 10.510) {
        return 5;
    }
    if(age < 12.638) {
        return 6;
    }
    if(age < 14.765) {
        return 7;
    }
    if(age < 15.765) {
        return 8; //full moon
    }
    if(age < 17.893) {
        return 9;
    }
    if(age < 20.021) {
        return 10;
    }
    if(age < 22.148) {
        return 11;
    }
    if(age < 23.148) {
        return 12; //third quarter
    }
    if(age < 25.276) {
        return 13;
    }
    if(age < 27.404) {
        return 14;
    }
    else {
        return 15;
    }
}

// Calculate the Julian Day Number of the given date
function JDN(Y, M, D) {
    if(M <= 2) {
        M += 12;
        Y -= 1;
    }
    var A = Math.trunc(Y/100);
    var B = Math.trunc(A/4);
    var C = 2-A+B;
    var E = Math.trunc(365.25*(Y+4716));
    var F = Math.trunc(30.6001*(M+1));
    return C+D+E+F-1524;
}