// this file will set up and initialise the editor it must be added as a script tag to presentations

// Multiple User Edited Speakernotes MUES add on for reveal.js
		//Published by MULTIVERSE.IO under open license built on code developed by MIT also under open license
			//original author Hakimel
			// Additions made by N.Griffiths
			
						
		//run imediately on page load prep current asides or edited versions
		!function set_up_ids(){
			//engage is a flag that let's the main window check if editor window should be opened. 
			//reset the flag on load to stop editor from opening on load.
			localStorage.removeItem('engage');
			window.addEventListener('storage',function(){
			if(localStorage.engage){
			// function to start the editor window and load speaker notes content into it.
			engage_edit_mode();
			localStorage.removeItem('engage');}
			})
			
			// checking ahead to see if domain problems will occurr with local storage
			var domain = window.location.hostname;
			console.log('the current domain is' + domain);
			
			//if notes exist find them and make sure they're stored
			//use saveId to allow multiple presentations to be saved without crossover	
			var saveId = window.location.pathname + "save_data";
			console.log('save location for this presntation is' + saveId);
      //stringify to send over localstorage to editor window
			var saveId = JSON.stringify(saveId);
			var saved_notes = localStorage.getItem(saveId);
      
       // look for notes stored under this saveId if blank will error out and create a saveId
			if(saved_notes){
			console.log('found some data');
			console.log(saved_notes);
        
      //attempt to load saved content and add to log if success/failure
			try{
			//to_replace is the content held in asides [array]
			var to_replace = document.getElementsByTagName('aside');
			//parse the locally stored JSON string back in to HTML elements
			var saved_notes2 = JSON.parse(saved_notes);
			//cycle through the two lists replacing the HTML content of the asides with edited content
        
			for(let i = 0; i<saved_notes2.length;i++){
		             	to_replace[i].innerHTML = saved_notes2[i];
				remove_edittable(to_replace[i]);
				to_replace.innerHTML += "<div id = edit_button" + i + "> <button onclick='localStorage.engage=\"yep\"; console.log(\"hi\"); localStorage.position="+ i + "'>edit mode</button> </div>";
			            }
				/// check this through on MONDAY
			console.log('editables have been stripped');
				console.log(to_replace);
        console.log('loaded');
			}	
        
				catch(err){
				console.log('issue with saved data use editor to clear memory and try again');
			
			}
			        
			}
			
			else{
      //if no data found set up saveId etc
			window.alert('no local data saved')
			//if no local data found create save Id
			saveId = window.location.pathname + "save_data";
				console.log('save location is ' + saveId);
				//stringify to send to editor window
				saveId = JSON.stringify(saveId);
				//pass the saveId to local storage so editor window can find it.
			localStorage.setItem('saveLocation',saveId);
				//the saveId stores lesson content but to make sure it has something in use 'boop'
			}
			
			// on first boot if no edits exist load base set of notes if edits exists load that set.
			// edited notes would be loaded in the try block.
			var to_tag = document.getElementsByTagName('aside');
			//console.log(to_tag.length);
			//need to add logic to recover existing additions
			
			// get un adulterated copy of notes(no edit buttons)
			var rawNotes=[];
			
			for(let i = 0; i < to_tag.length; i++){
			rawNotes[i] = to_tag[i].innerHTML;	
		
			}
      // notes can now be passed in to storage to be picked up by editor
			localStorage.rawNotes = JSON.stringify(rawNotes);
      
      //add editor mode buttons to notes in speaker notes window
			for(let i = 0; i < to_tag.length; i++){
			to_tag[i].innerHTML += "<div id = edit_button" + i + "> <button onclick='localStorage.engage=\"yep\"; localStorage.position="+ i + "'>edit mode</button> </div>";	
			
			}
			
		}()
		// evrything is ready to go now that the start up finction has portioned out and sent all data




// experimental use this function to determine if elements are on screen before running reminder function (might remove this)
// this is redundant but cool so saving for future projects
//		function isInViewport(element) {
			
//                         const rect = element.getBoundingClientRect();
////                           return (rect.top >= 0 && rect.left >= 0 && 
//				   rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
//				   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
 //                                                            );
 //                                                            };


function remove_edittable2(){
	var divs = document.getElementsByClassName('editable');
	console.log(divs.length);
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", false);
}}


function remove_edittable(element){
	var divs = element.getElementsByClassName('editable');
	console.log(divs.length);
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", "false");
}}

//function restore_edittable(){
	//var divs = editorWindow.document.getElementsByClassName('editable');
	//for(let i = 0; i<divs.length;i++){
	//divs[i].setAttribute("contenteditable", true);
//}}
		
// function to open the editor window and add HTML content from intitial function
		function engage_edit_mode(){
			
		if(editorWindow.closed){
		// start new window
		// would need to enable popups for github if want this to work.add a try except loop to advise 
		//users to whitelist repo or could use while loop to windowalert each attemot until fixed?
		//maybe loom link in alert?
		var editorWindow = window.open("","editorWindow","width=500,height=500");	
			
		//editorWindow.document.head.innerHTML += "<link rel='stylesheet' href='./editor.css'>";	
		editorWindow.document.body.innerHTML +="<p>This is 'editor window'. notes should appear soon...</P>";
		editorWindow.document.body.innerHTML += "<div id='buffer'></div>";
			
		//put rawnotes in to editor window edits will persist between sessions and be loaded at first start up 
		var editorNotes = JSON.parse(localStorage.getItem('rawNotes'));
	        
		//store each aside in a div to make presentation easier and to make scraping them back in to main presentation easier
		//console.log(editorNotes.length);
		var edited = document.getElementsByClassName('editable')
		console.log(edited.length);
		// to avoid divs being written in multiple times will need to iether write a script to check for editable divs on load up, or create a flag variable to check?
		
		if(edited.length!=0)	{
		   
		for(let i = 0;i< editorNotes.length;i++){
		editorWindow.document.body.innerHTML+="<div class='notes' id="+ i +"> <button class = 'reminder_button'  onclick = 'add_reminder(this)'>add reminder</button>" + editorNotes[i] + "</div>";
		}
			
		}
			//editor button for reminders was origninally added here just in case !
		else{
		for(let i = 0;i< editorNotes.length;i++){
		editorWindow.document.body.innerHTML+="<div class='notes' id="+ i +"> <button class = 'reminder_button'  onclick = 'add_reminder(this)'>add reminder</button> <div class = 'editable' contenteditable = 'true'></div>" + editorNotes[i] + " <div class = 'editable' contenteditable = 'true'></div>";
		}
	        }
		

                //pulling editor specific js in to the popup window.		
                var script = editorWindow.document.createElement("script");
                script.setAttribute('src','https://nickgmvp.github.io/dfv1/editordependencies/editorinternal.js');			
			
                editorWindow.document.head.appendChild(script);
			
		
		editorWindow.document.body.innerHTML += "<div id='user_controls'><button onclick = 'prep(); save_and_close();'> save updates</button><button onclick='reset_notes();'>reset notes</button><button onclick='reset_reminders();'>reset reminders</button><button onclick = 'nuke();'> clear all memory </button></div>";
		
		editorWindow.document.head.innerHTML += "<link rel='stylesheet' type='text/css' href='https://nickgmvp.github.io/dfv1/editordependencies/editorstyles.css'>";
			
		
		}	
		}
