//called in editor.js to add javascript to the editor window/
// there are 1 links that will need refactoring in this file
!function restore_edittable(){
	var divs = document.getElementsByClassName('editable');
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", true);
	}}();
		
window.addEventListener('storage',function(){
  var position = localStorage.position;
 if(position){
	 
  console.log(position);
	//restore_editable();
  document.getElementById(position).scrollIntoView({block:'end' ,behavior: 'smooth'})}
 }
	);
//reset flag variable once window is closed
//window.addEventListener('beforeunload', function (e) {
  // the absence of a returnValue property on the event will guarantee the browser unload happens
	//change the editor flag back to zero
 //editor_flag = 0;
 //window.opener.location.reload();
//});



function add_reminder(el){
  var content = prompt('set you reminder, it will pop up in speaker notes when you reach the slide');
  if(content){
  var parentID = el.parentNode.id;
//  el.parentNode.innerHTML += ' <img id = "' + parentID + 'reminder"  height ="10" width="10" src="https://nickgmvp.github.io/dfv1/Data%20Analysis%20in%20Industry/alarm.svg" class = "reminder" onload = "should_show(this,\'' + content +'\')";>';
 el.parentNode.innerHTML += ' <img title="' + content + '" id = "' + parentID + 'reminder"  height ="10" width="10" src="https://nickgmvp.github.io/dfv1/editordependencies/alarm.svg" class = "reminder" ondblclick="this.remove();" onload ="if(this.parentNode.classList.contains(\'value\')){window.alert(\''+ content + '\')};">';                                                
  }	
};
	

		
  function reset_notes(){
         var to_reset = document.getElementsByClassName('editable');
	  for(let i = 0; i<to_reset.length;i++){
	  to_reset[i].innerHTML = " ";
	  }
  
  }

function remove_edittable2(){
	var divs = document.getElementsByClassName('editable');
	console.log(divs.length);
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", false);
}}


  function reset_reminders(){
    
       var del = document.getElementsByClassName('reminder');
    while(del.length!=0){
	    del[0].remove();
            }
  };
  
  function prep(){ 
    var saveLocation = localStorage.getItem('saveLocation'); 
    console.log(saveLocation);
  } ;

  function strip_reminder_buttons(){
  var to_strip = document.getElementsByClassName('reminder_button');
  while(to_strip.length!=0){
  to_strip[0].remove();
  }
  };


  function save_and_close() {
    var saveLocation = localStorage.getItem('saveLocation'); 
    console.log(saveLocation);
    strip_reminder_buttons();
    remove_edittable2();
    var to_save = []; 
    var new_notes = document.getElementsByClassName('notes');
    for(let i=0; i< new_notes.length ;i++){
      to_save[i]= new_notes[i].innerHTML 
    } 
	  
    save_data = JSON.stringify(to_save); 
    localStorage.setItem(saveLocation,save_data);
    console.log(to_save.length); 
    var save = localStorage.getItem(saveLocation); 
    console.log(save);
	  //window.close();
	 
  };

  function nuke(){
    console.log('nuke imminent...'); 
    console.log('3');
    console.log('2');
    console.log('1'); 
    console.log('BOOM'); 
    localStorage.clear();}
