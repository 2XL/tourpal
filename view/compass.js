/**
 * Created by anna on 30/04/15.
 */


function onCompassLoad() {
    var options = {frequency: 500 * 2}; // compass data update ratio
    // let the user to customuze the pressition of the smooth
    navigator.compass.watchHeading(rotateNeedle, compassError, options);
}




function rotateNeedle(degree) {
    //  console.log("Compass.Rotate: " + JSON.stringify(degree, null, 2));
    $("#frame-needle").css({'rotate': -degree.trueHeading + 180});
    document.getElementById('compass-stats').innerHTML = JSON.stringify(degree, null, 2);
}


function compassError(error) {
    alert("code: " + error.code + '\n' + "message: " + error.message + "\n");
}



var interValCompass = setInterval(function () {
    console.log("START COMPASS!");
    if (isPhoneGapReady) {
        console.log("LOAD COMPASS!");
        onCompassLoad();
      //  navigator.notification.vibrate(500);
      //  navigator.notification.beep(3);
        //onPedoLoad();
        onDataStore();
        clearInterval(interValCompass);
    } else {
        console.log("Compass-LOADING!!!!");
    }
}, 3000);







