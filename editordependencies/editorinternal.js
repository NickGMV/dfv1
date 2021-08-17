//called in editor.js to add javascript to the editor window/
// there are 1 links that will need refactoring in this file
!function restore_edittable(){
	var divs = document.getElementsByClassName('editable');
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", true);
	}}();

// this listens for psoition updates from the tracker pixels embedded in the 
//presentation and scrolls the window to view the corresponding section in the editor
window.addEventListener('storage',function(){
  var position = localStorage.position;
 if(position){ 
  console.log("current speaker note position is " + position);
  document.getElementById(position).scrollIntoView({block:'end' ,behavior: 'smooth'})}
 }
	);

// this function creates the reminders for when speaker notes are being used
function add_reminder(el){
  var content = prompt('set you reminder, it will pop up in speaker notes when you reach the slide');
  if(content){
  var parentID = el.parentNode.id;
 el.parentNode.innerHTML += ' <img title="' + content + '" id = "' + parentID + 'reminder"  height ="10" width="10" src="https://nickgmvp.github.io/dfv1/editordependencies/alarm.svg" class = "reminder" ondblclick="this.remove();" onload ="if(this.parentNode.classList.contains(\'value\')){window.alert(\''+ content + '\')};">';                                                
  }	
};
//This function will clear all the user editted sections, the user must save afterwards to make this permanent.
// *****Consider adding instant save here.***
  function reset_notes(){
         var to_reset = document.getElementsByClassName('editable');
	  for(let i = 0; i<to_reset.length;i++){
	  to_reset[i].innerHTML = " ";
	  }
  }
// one of two functions that strips out all ther editabilty ready for when notes are passed back to the presentation.
function remove_edittable2(){
	var divs = document.getElementsByClassName('editable');
	console.log(divs.length);
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", false);
}}

// selects and destroys all the reminders in the editor window, must save afterwards to make changes permanent
//*** consider adding instant save here *** 
  function reset_reminders(){
    
       var del = document.getElementsByClassName('reminder');
    while(del.length!=0){
	    del[0].remove();
            }
  };
  
// this function ensures no "add reminder buttons" are saved to the presentation 
//notes as they only work in the editor window
  function strip_reminder_buttons(){
  var to_strip = document.getElementsByClassName('reminder_button');
  while(to_strip.length!=0){
  to_strip[0].remove();
  }
  };

// function ot save and close the editor window.
  function save_and_close() {
	  //generates and formats a save id using path
    var saveLocation = window.opener.location.pathname + "save_data"; 
    saveLocation = JSON.stringify(saveLocation);
    console.log("location data is being saved is ..." + saveLocation);
    //reformat elements to be reintegrated with presentation
    strip_reminder_buttons();
    remove_edittable2();
    // create array for elements to be stored in and fill it
    var to_save = []; 
    var new_notes = document.getElementsByClassName('notes');
    for(let i=0; i< new_notes.length ;i++){
      to_save[i]= new_notes[i].innerHTML 
    } 
    //format savedata to it can be regathered at load by the presentation.  
    save_data = JSON.stringify(to_save); 
    // put in to browser storage
    localStorage.setItem(saveLocation,save_data);
    console.log("the save data has ..." + to_save.length + "entries"); 
    var save = localStorage.getItem(saveLocation); 
    console.log("saved data is ...." + save);
	  //window.close();
	 
  };

// This function completely wipes browser of ALL data
//** add user verification here also colour the button red
  function nuke(){
    console.log('nuke imminent...'); 
    console.log('3');
    console.log('2');
    console.log('1'); 
    console.log('BOOM'); 
    localStorage.clear();}
