

/*using this function to indicate a load of js file in to speaker notes*/
function test() {
  window.alert('test success!');
}

/*use this function to scout how to edit asides once speaker notes are up*/
function find_parent (element) {
  window.alert(element.parentNode.id);
  window.alert(element.parentNode.className);
  window.alert(element.parentNode.tagName);
  window.alert(element.parentNode.nodeName);}

/* potential start on editting content of speaker notes*/
function change_content(element,content) {
  document.getElementById(element.parentNode.id).innerHTML+=content;}

/* see if innerHTML will play ball */
function generate_text_area(element){
  parent = element.parentNode.id;
  document.getElementById(parent).innerHTML += "<textarea onfocus='Reveal.configure(controls:false);'>add custom notes here</textarea>";
}
