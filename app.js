//Global variable
var globaltasknumber = 0;
var globalactivetasks = 0;
var globalcompletedtasks = 0;
var listactivetasks = [];
var listcompletedtasks = [];

//Constructor to create class
//function task(task_name, task_tag, task_priority, task_due, task_reminder, task_note) {
//	this.tasknumber = globaltasknumber + 1;
//	this.taskname = textboxhastext(task_name)?task_name:null;
//	this.tasktag = textboxhastext(task_tag)?task_tag:null;
//	this.taskpriority = textboxhastext(task_priority)?task_priority:null;
//	this.taskdue = textboxhastext(task_due)?task_due:null;
//	this.reminder = textboxhastext(task_reminder)?task_reminder:null;
//	this.note = textboxhastext(task_note)?task_note:null;
//	this.taskactive = true;
//
//	globaltasknumber += 1;
//}

//Functions for page
//Function create a task
function createtask(taskname, tasktag, taskpriority, duedate, reminder, note){
	//Check if task has a taskname
	if(textboxhastext(taskname)){
		//Create the task itself
		var newtask = basictask(taskname, tasktag, taskpriority, duedate, reminder, note);
		globalactivetasks++;

		//Create active button
		var cb_active = active_checkbox(newtask);
		newtask.appendChild(cb_active);				//Assign 

		//Create text in paragraph
		newtask.appendChild(document.createTextNode(newtask.dataset.taskname));	//Set task name in text
		
		//Create edit button
		var btn_edit = button_edit(newtask);
		newtask.appendChild(btn_edit);							//Add the edit button

		//Create remove button
		var btn_remove = button_remove(newtask);
		newtask.appendChild(btn_remove);							//Add the remove button


		//Add tasks to active task list
		listactivetasks.push(newtask);
		settasks();

		//Remove text from textboxes
		document.getElementById("f_task").value = "";
		document.getElementById("f_tag").value = "";
		document.getElementById("f_priority").value = "";
		document.getElementById("f_duedate").value = "";
		document.getElementById("f_reminder").value = "";	
		document.getElementById("f_note").value = "";		
	}

}

//Checks if textbox is empty or only contains spaces
function textboxhastext(id){
	return !(id.length === 0 || !id.trim());
}

//Function to create task
var basictask = function(task_name, task_tag, task_priority, task_due, task_reminder, task_note) {
	var paragraph = document.createElement("p");	//Create paragraph
	paragraph.id = "paragraph" + globaltasknumber;						//Set id

	//Add data
	paragraph.dataset.id = globalactivetasks;
	paragraph.dataset.taskname = textboxhastext(task_name)?task_name:null;
	paragraph.dataset.tasktag = textboxhastext(task_tag)?task_tag:null;
	paragraph.dataset.taskpriority = textboxhastext(task_priority)?task_priority:null;
	paragraph.dataset.taskdue = textboxhastext(task_due)?task_due:null;
	paragraph.dataset.reminder = textboxhastext(task_reminder)?task_reminder:null;
	paragraph.dataset.note = textboxhastext(task_note)?task_note:null;
	paragraph.dataset.taskactive = true;

	globaltasknumber++;

	return paragraph;
}

//Create active/completed checkbox
var active_checkbox = function(newtask) {
	var cb_active = document.createElement("input");		//Create input		
	cb_active.type = "checkbox";							//Set type
	
	//Assign function to set task inactive or active
	cb_active.onclick = function () {
		//Check for checked or unchecked
		if(cb_active.checked == true) {
			newtask.dataset.taskactive = false;

			for(var i = 0; i < listactivetasks.length; i++) {
				if(listactivetasks[i].dataset.id == newtask.dataset.id) {
					listactivetasks.splice(i,1);
					listcompletedtasks.push(newtask);
					globalactivetasks--;
					globalcompletedtasks++;
					break;
				}
			}
		} else {
			newtask.dataset.taskactive = false;
			for(var i = 0; i < listcompletedtasks.length; i++) {
				if(listcompletedtasks[i].dataset.id == newtask.dataset.id) {
					listcompletedtasks.splice(i,1);
					listactivetasks.push(newtask);
					globalactivetasks++;
					globalcompletedtasks--;
					break;
				}
			}
		}
		settasks();

	}
	return cb_active;
}

//Set all tasks in the page
function settasks() {
	var nodeactivetasks = document.getElementById("main_middle_activetasks");
	var nodecompletedtasks = document.getElementById("main_middle_completedtasks");
	removechildren(nodeactivetasks);
	removechildren(nodecompletedtasks);

	listactivetasks.forEach(function(element) {
		nodeactivetasks.appendChild(element);
	})

	listcompletedtasks.forEach(function(element) {
		nodecompletedtasks.appendChild(element);
	})


}

//Removes children of node
function removechildren(node){
	while(node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

//Create edit button
var button_edit = function(newtask){
	var btn_edit = document.createElement("button");			//Create button
	btn_edit.appendChild(document.createTextNode("Edit")); 		//Assig text to button

	btn_edit.onclick = function(){ 								//Create function edit
		newtask.innerHTML = "";
		//Create input field
		edit_field =document.createElement("form");

		//Create taskname field
		var text_taskname = document.createTextNode("Taskname:");
		var field_taskname = document.createElement("input");
		field_taskname.type = "text";
		edit_field.innerHTML += text_taskname.innerHTML + field_taskname.innerHTML;

		//Create tag field
		var text_tag = document.createTextNode("Tag:");
		var field_tag = document.createElement("input");
		field_tag.type = "text";
		//edit_field.innerHTML += text_taskname.innerHTML + field_taskname.innerHTML;

		//Create tag field
		var text_priority = document.createTextNode("Priority:");
		var field_priority = document.createElement("input");
		field_priority.type = "number";
		//edit_field.innerHTML += text_taskname.innerHTML + field_taskname.innerHTML;

		//Create duedate field
		var text_duedate = document.createTextNode("Duedate:");
		var field_duedate = document.createElement("input");
		field_duedate.type = "date";
		//edit_field.innerHTML += text_taskname.innerHTML + field_taskname.innerHTML;

		//Create reminder field
		var text_reminder = document.createTextNode("Reminder:");
		var field_reminder = document.createElement("input");
		field_reminder.type = "date";
		//edit_field.innerHTML += text_taskname.innerHTML + field_taskname.innerHTML;

		//Create reminder field
		var text_note = document.createTextNode("Note:");
		var field_note = document.createElement("input");
		field_note.type = "text";
		//edit_field.innerHTML += text_taskname.innerHTML + field_taskname.innerHTML;

		newtask.appendChild(edit_field);



		//Create input			
		return false;
	};
	return btn_edit;
}

//Creates a remove button based on a btn_id and paragraph_id
var button_remove = function(newtask) {
	var btn_remove = document.createElement("button");			//Create button
	btn_remove.appendChild(document.createTextNode("Remove"));	//Add text to button

	btn_remove.onclick = function(){ 							//Create function remove
		if(newtask.dataset.taskactive == "true") {
			for(var i = 0; i < listactivetasks.length; i++) {
				if(listactivetasks[i].dataset.id == newtask.dataset.id) {
					listactivetasks.splice(i,1);
					globalactivetasks--;
					break;
				}
			}
		} else {
			for(var i = 0; i < listcompletedtasks.length; i++) {
				if(listcompletedtasks[i].dataset.id == newtask.dataset.id) {
					listcompletedtasks.splice(i,1);
					globalcompletedtasks--;
					break;
				}
			}
		}
		settasks();
	};
	return btn_remove;

}

//Creates a save button based on a btn_id and paragraph_id
var button_save = function(btn_id, paragraphid) {
	var btn_save = document.createElement("button");			//Create button
	btn_remove.appendChild(document.createTextNode("Remove"));	//Add text to button
	btn_remove.onclick = function(){ 							//Create function remove
		var element = document.getElementById(paragraphid);
		element.parentNode.removeChild(element);
		return false;
	};
	return btn_remove;

}

//Sort newest first
function SortNewTop () {
	var sorted = false;
	while(!sorted) {
		sorted = true;
		for(var i = 0; i < listactivetasks.length - 1; i++) {
			if(listactivetasks[i].dataset.id < listactivetasks[i + 1].dataset.id) {
				var temp = listactivetasks[i];
				listactivetasks[i] = listactivetasks[i + 1];
				listactivetasks[i + 1] = temp;
				sorted = false;
				break;
			}
		}
	}

	sorted = false;
	while(!sorted) {
		sorted = true;
		for(var i = 0; i < listcompletedtasks.length - 1; i++) {
			if(listcompletedtasks[i].dataset.id < listcompletedtasks[i + 1].dataset.id) {
				var temp = listcompletedtasks[i];
				listcompletedtasks[i] = listcompletedtasks[i + 1];
				listcompletedtasks[i + 1] = temp;
				sorted = false;
				break;
			}
		}
	}

	settasks();

}

//Sort oldest first
function SortOldTop() {
	var sorted = false;
	while(!sorted) {
		sorted = true;
		for(var i = 1; i < listactivetasks.length; i++) {
			if(listactivetasks[i].dataset.id < listactivetasks[i - 1].dataset.id) {
				var temp = listactivetasks[i];
				listactivetasks[i] = listactivetasks[i - 1];
				listactivetasks[i - 1] = temp;
				sorted = false;
				break;
			}
		}
	}

	sorted = false;
	while(!sorted) {
		sorted = true;
		for(var i = 1; i < listcompletedtasks.length; i++) {
			if(listcompletedtasks[i].dataset.id < listcompletedtasks[i - 1].dataset.id) {
				var temp = listcompletedtasks[i];
				listcompletedtasks[i] = listcompletedtasks[i - 1];
				listcompletedtasks[i - 1] = temp;
				sorted = false;
				break;
			}
		}
	}

	settasks();
}

