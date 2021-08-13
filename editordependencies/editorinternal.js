//called in editor.js to add javascript to the editor window/


window.addEventListener('storage',function(){
  var position = localStorage.position;
  console.log(position);
  document.getElementById(position).scrollIntoView({block:'end' ,behavior: 'smooth'})});

function add_reminder(el){
  var content = prompt('set you reminder, it will pop up in speaker notes when you reach the slide');
  var parentID = el.parentNode.id;
//  el.parentNode.innerHTML += ' <img id = "' + parentID + 'reminder"  height ="10" width="10" src="https://nickgmvp.github.io/dfv1/Data%20Analysis%20in%20Industry/alarm.svg" class = "reminder" onload = "should_show(this,\'' + content +'\')";>';
 el.parentNode.innerHTML += ' <img id = "' + parentID + 'reminder"  height ="10" width="10" src="https://nickgmvp.github.io/dfv1/Data%20Analysis%20in%20Industry/alarm.svg" class = "reminder" onload ="if(this.parentNode.classList.contains(\'value\')){window.alert(\''+ content + '\')};">';                                                
	
};
	

  function reset_notes(){
         var to_reset = document.getElementsByClassName('editable');
	  for(let i = 0; i<to_reset.length;i++){
	  to_reset[i].innerHTML = " ";
	  }
  
  }


  function reset_reminders(){
    
    var del = document.getElementsByClassName('reminder');
    for(let i=0;i<del.length;i++){
	    del[i].remove();
            }
  };
  
  function prep(){ 
    var saveLocation = localStorage.getItem('saveLocation'); 
    console.log(saveLocation);
  } ;

  function strip_reminder_buttons(){
  var to_strip = document.querySelectorAll('reminder_button');
  console.log(to_strip);
  for(let i=0; i<to_strip.length; i=i++){
  to_strip[i].remove();
  }
  };


  function save_and_close() {
    var saveLocation = localStorage.getItem('saveLocation'); 
    console.log(saveLocation);
    strip_reminder_buttons();
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
  };
// the should_show and check_parent functions are defunct!
function check_parent(element){
	var parent = element.parentNode;
	console.log(parent.classList);
	console.log(element.id);
	if(parent.classList.contains('value')){
		return true;}
	else{return false;}
}
	// uses prior function to determine if allerts should go out
        // only triggers for parent window need to find the name of reveal window
		function should_show(element, content)
                         {
			if(check_parent(element)){
			window.alert(content);
			}
			};

  function nuke(){
    console.log('nuke imminent...'); 
    console.log('3');
    console.log('2');
    console.log('1'); 
    console.log('BOOM'); 
    localStorage.clear();}
