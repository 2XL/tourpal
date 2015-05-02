/**
 * Created by anna on 23/04/15.
 */
// Global variable that will tell us whether PhoneGap is ready

var isPhoneGapReady = false;
var timerReadyStatus = 2000;
var timerNetworkStatus = 10000; // 10s
var intervalNetworkStatus;
var intervalReadyStatus;
var info = {};

/*
Analitzar el functionament dels tabs i com cordova realitza cache de les vistes

 */

// Older versions of Blackberry < 5.0 don't support
// PhoneGap's custom events, so instead we need to perform
// an interval check every 500 milliseconds to see whether
// PhoneGap is ready. Once done, the interval will be
// cleared and normal processing can begin.
// NO BLACK BERRY SUPPORT :D

console.log(">>   \t" + window.location.href);


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // detect for network access
        var connected = networkDetection();
        console.log("Net Connection: ");
        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        // alert("Device Ready!!!");
        console.log("DEVICE IS READY!");
        app.receivedEvent('deviceready');

        window.clearInterval(intervalReadyStatus);
        // window.clearInterval(intervalNetowrkStatus);
// set to true
        isPhoneGapReady = true;
        console.log('This device is now ready');

        info.uuid = device.uuid;
        info.platform = device.cordova; // cordova version
        info.version = device.version;  // so version
        info.device = device.platform;  // so type {android, ios, ... }

        if (info.device !== "Android") {
            alert(info.device + " / isNoneSupported!");
        } else {
            console.log("Detected Platform: " + info.device + "/" + info.version);
        }

        if (window.location.pathname === '/android_asset/www/index.html') {
            console.log("LOADING.......");
            window.location.href = "view/index.html";
        }
        else {
            console.log("START-APP");
            console.log(window.location.pathname);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {


        console.log('Received Event: ' + id);
        var parentElement = document.getElementById(id);


        console.log('Network>>>');
        var lastNetStatus = navigator.network.connection;
        intervalNetworkStatus = window.setInterval(function () {
            if (navigator.network.connection.type !== lastNetStatus) {
                if (navigator.network.connection.type !== Connection.NONE) {
                    onOnline();
                } else {
                    onOffline();
                }
                console.log("Network: " + info.isConnected + ": " + info.isHighSpeed);
                lastNetStatus = navigator.network.connection.type;
            } else {
                parentElement.innerHTML = JSON.stringify(info, null, 2);
            }
        }, timerNetworkStatus);


    }
};


function init() {
// Add an event listener for deviceready

    intervalReadyStatus = window.setInterval(function () {
        try {
            console.log("TRY: is device status ready???")
            console.log(isPhoneGapReady);
            if (isPhoneGapReady === true) {
                console.log("========> READY!!");
            }
        } catch (err) {
            console.log(err.message);
        }

        // onDeviceReady();
    }, timerReadyStatus);


    console.log("ADD deviceready... Event Listener!");
    app.initialize();
}

function networkDetection() {
    if (isPhoneGapReady) {
        // as long as the connection type is not none,
        // the device should have internet access
        if (navigator.network.connection.type != Connection.NONE) {
            info.isConnected = true;
            // isHighSpeed?

            info.isHighSpeed = isHighSpeed(navigator.network.connection.type)

        } else {
            info.isConnected = false;
        }
        return info.isConnected;
    }

    // attach events listeners for online and offline detection
}

// handler detect when the network status changes ?
function onOnline() {
    info.isConnected = true;
    // check if is highSpeed?
    info.isHighSpeed = isHighSpeed(navigator.network.connection.type);
}


function onOffline() {
    info.isConnected = false;
    info.isHighSpeed = false;
    // allow future functionality extension
}


function isHighSpeed(type) {
    switch (type) {
        case Connection.CELL_4G:
        case Connection.CELL_3G:
        case Connection.WIFI:
        case Connection.ETHERNET:
            return true;
            break;
        case Connection.CELL_2G:
        case Connection.UNKNOWN:
        default:
            return false;
            break;
    }
    return;
}


// Set an onload handler to call the init function

window.onload = init();

/*
 Plugin Access settings
 var
 deviceName = device.name;
 var
 deviceVersion = device.version;
 var
 devicePlatform = device.platform;
 var
 deviceUUID = device.uuid;
 var
 phoneGapVersion = device.phonegap;

 // Default all phone types to false
 var isAndroid = false;
 var isBlackberry = false;
 var isIphone = false;
 var isWindows = false;

 (device.platform)

 */

