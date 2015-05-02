/**
 * Created by anna on 30/04/15.
 */

// Storing Data to the Device


var fileWriter;

/**
 * Initialize some coordenates
 */
function onDataStore(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSComplete, fail);

}



function onFSComplete(fs){
    // load the test.txt file
    fs.root.getFile('text.txt', {create: true}, onFileEntryComplete, fail);
}

function onFileEntryComplete(fileEntry){
    // set up the file writter
    fileEntry.createWriter(onFileWriterComplete, fail);
}


function onFileWriterComplete(fw){
    // store the file writer in a global variable so we can have it when the user presses save
    fileWriter = fw;
    saveText();
}


function saveText(){
    // make sure the fileWriter is set
    if(fileWriter != null){
        // create an oncomplete write funciton
        // that will redirect the user
        fileWriter.onwrite = function(evt) {
            alert('Saved successfully');
            //$.mobile.changePage('');
        };

      //  var form = document.getElementsByTagName('form')[0].elements;
      //  var notes =  form.notes.value;
        // save notes
        fileWriter.write('Latitude:Longitude');
    }else{
        alert("File Writer Null Pointer");
    }
    return false;
}

function fail(error){
    alert(error.code);
}


