//Global variable
var globaltasknumber = 0;

//Class basictask
function basictask(task_name, task_tag, task_priority, task_due, task_reminder, task_note) {
	this.tasknumber = globaltasknumber + 1;
	this.taskname = textboxhastext(task_name)?task_name:null;
	this.tasktag = textboxhastext(task_tag)?task_tag:null;
	this.taskpriority = textboxhastext(task_priority)?task_priority:null;
	this.taskdue = textboxhastext(task_due)?task_due:null;
	this.reminder = textboxhastext(task_reminder)?task_reminder:null;
	this.note = textboxhastext(task_note)?task_note:null;
	this.taskactive = true;

	globaltasknumber = globaltasknumber + 1;
}
basictask.prototype.setnumber = function(number){this.tasknumber = number;}
basictask.prototype.getnumber = function(){return this.tasknumber;}
basictask.prototype.setname = function(taskname){this.taskname = name;}
basictask.prototype.getname = function(){return this.taskname;}
basictask.prototype.settag = function(tagname){this.tasktag = tagname;}
basictask.prototype.gettag = function(){return this.tasktag;}
basictask.prototype.setdue = function(taskdue){this.taskdue = taskdue;}
basictask.prototype.getdue = function(){return this.taskdue;}
basictask.prototype.setreminder = function(reminderdate){this.reminder = reminderdate;}
basictask.prototype.getreminder = function(){return this.reminder;}
basictask.prototype.setnote = function(note){this.note = note;}
basictask.prototype.getnote = function(){return this.note;}
basictask.prototype.setactive = function(){this.taskactive = true;}
basictask.prototype.setinactive = function(){this.taskactive = false;}
basictask.prototype.full = function (){
	return this.tasknumber + " " + this.taskname + " " + this.tasktag + " " +
	this.taskpriority + " " + this.taskdue + " " + this.reminder + " " + this.note +
	" " + this.taskactive + " ";
	}

//Class task
function MainTask(task_name, task_tag, task_priority, task_due, task_reminder, task_note) {
	basictask.call(this, task_name, task_tag, task_priority, task_due, task_reminder, task_note);
	this.subtask;
}
MainTask.prototype = Object.create(basictask.prototype);
MainTask.prototype.constructor = MainTask;
MainTask.prototype.setsubtask = function(subtask){this.subtask = subtask;}
MainTask.prototype.getsubtask = function(){return this.subtask;}


//Functions for page
//Function create a task
function createtask(taskname, tasktag, taskpriority, duedate, reminder, note){
	//Check if task has a taskname
	if(textboxhastext(taskname)){
		//Create the task itself
		var newtask = new MainTask(taskname, tasktag, taskpriority, duedate, reminder, note);
		
		//Create visual
		//Create paragraph
		var paragraph = document.createElement("p");			//Create paragraph
		var paragraphid = "tasknumber"+ newtask.getnumber();	//Varable with paragraph ID
		paragraph.id = paragraphid;								//Set id

		//Create active button
		var cb_id = "cb_active" + newtask.getnumber();	
		var cb_active = active_checkbox(newtask, cb_id, paragraphid);
		paragraph.appendChild(cb_active);						//Assign 

		//Create text in paragraph
		paragraph.appendChild(document.createTextNode(newtask.full()));	//Set task name in text
		
		//Create edit button
		var btn_edit_id = "btn_edit" + newtask.getnumber();				//Assign ID
		var btn_edit = button_edit(newtask, btn_edit_id, paragraphid);
		paragraph.appendChild(btn_edit);							//Add the edit button

		//Create remove button
		var btn_remove_id = "btn_remove" + newtask.getnumber();			//Assign ID
		var btn_remove = button_remove(btn_remove_id, paragraphid);
		paragraph.appendChild(btn_remove);							//Add the remove button

		//Task created
		document.getElementById("main_middle_activetasks").appendChild(paragraph);

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

//Create active/completed checkbox
var active_checkbox = function(newtask, cb_id, paragraphid) {
	var cb_active = document.createElement("input");		//Create input		
	cb_active.type = "checkbox";							//Set type
	cb_active.id = cb_id;									//Assign ID
	
	//Assign function to set task inactive or active
	cb_active.onclick = function () {
		//Get the checkbox
		var activetask = document.getElementById("main_middle_activetasks");		//Active tasks
		var completedtask = document.getElementById("main_middle_completedtasks");	//Completed tasks
		var p = document.getElementById(paragraphid);	//Paragraph id
		var cb = document.getElementById(cb_id);		//Checkbox id

		//Check for checked or unchecked
		//if(cb.checked == true) {
		//	newtask.setinactive();
		//	p.parentNode.removeChild(p);
		//	completedtask.appendChild(p);
		//} else {
		//	newtask.setactive();
		//	p.parentNode.removeChild(p);
		//	activetask.appendChild(p);
		//}

	}
	return cb_active;
}

//Create edit button
var button_edit = function(task, btn_edit_id, paragraphid){
	var btn_edit = document.createElement("button");			//Create button
	btn_edit.appendChild(document.createTextNode("Edit")); 		//Assig text to button
	btn_edit.id = btn_edit_id;
	btn_edit.onclick = function(){ 								//Create function edit
		var element = document.getElementById(paragraphid);

		//Create input			
		document.getElementById("f_task").value = task.taskname;
		document.getElementById("f_tag").value = task.tasktag;
		document.getElementById("f_priority").value = task.taskpriority;
		document.getElementById("f_duedate").value = task.taskdue;
		document.getElementById("f_reminder").value = task.reminder;
		document.getElementById("f_note").value = task.note;
		element.parentNode.removeChild(element);				//remove the task
		return false;
	};
	return btn_edit;
}

//Creates a remove button based on a btn_id and paragraph_id
var button_remove = function(btn_id, paragraphid) {
	var btn_remove = document.createElement("button");			//Create button
	btn_remove.id = btn_id;
	btn_remove.appendChild(document.createTextNode("Remove"));	//Add text to button
	btn_remove.onclick = function(){ 							//Create function remove
		var element = document.getElementById(paragraphid);
		element.parentNode.removeChild(element);
		return false;
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
