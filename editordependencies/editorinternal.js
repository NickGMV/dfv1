//called in editor.js to add javascript to the editor window/
!function start(){
  window.alert('script loaded');
}()

// all of this needs to be cleaned up significantly to remove inner HTML formatting
window.addEventListener('storage',function(){
  var position = localStorage.position;
  console.log(position);
  document.getElementById(position).scrollIntoView({block:'end' ,behavior: 'smooth'})});

function add_reminder(el){
  var content = prompt('set you reminder, it will pop up in speaker notes when you reach the slide');
  var parentID = el.parentNode.id;
  el.parentNode.innerHTML += ' <img id = "' + parentID + 'reminder"  height ="10" width="10" src="https://nickgmvp.github.io/dfv1/Data%20Analysis%20in%20Industry/alarm.svg" class = "reminder" onload = "should_show(this,\'' + content +'\')";>';

};
			
  function remove_reminders(el){
    
    var del = el.parentNode.getElementsByClassName('reminder');
    for(let i=0;i<del.length;i++){
	    del[i].remove;
            }
  };
  
  function prep(){ 
    var saveLocation = localStorage.getItem('saveLocation'); 
    console.log(saveLocation);
  } ;
  
  function save_and_close() {
    var saveLocation = localStorage.getItem('saveLocation'); 
    console.log(saveLocation);
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


  function nuke(){
    console.log('nuke imminent...'); 
    console.log('3');
    console.log('2');
    console.log('1'); 
    console.log('BOOM'); 
    localStorage.clear();}
