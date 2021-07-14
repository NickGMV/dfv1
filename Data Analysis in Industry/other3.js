

/*using this function to indicate a load of js file in to speaker notes*/
function test() {
  window.alert('test success!');
}

/*use this function to scout how to edit asides once speaker notes are up*/
function find_parent (element) {
  window.alert(element.parentNode.id, element.parentNode.className);}

/* potential start on editting content of speaker notes*/
function change_content(element,content) {
  document.getElementById(element.parentNode.id).innerHTML+=content;}
