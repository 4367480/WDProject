//Global variable
var globaltasknumber = 0;

//Class TaskRegister
function TaskRegister() {
	this.activetasks;
	this.completedtask;
}

//Class basictask
function basictask(task_name, task_due, task_reminder, task_note) {
	this.tasknumber = globaltasknumber + 1;
	this.taskname = task_name;
	this.taskdue = task_due;
	this.reminder = task_reminder;
	this.note = task_note;
	this.completed = false;
	this.taskactive = true;

	globaltasknumber = globaltasknumber + 1;
}
basictask.prototype.setnumber = function(number){this.tasknumber = number;}
basictask.prototype.getnumber = function(){return this.tasknumber;}
basictask.prototype.setname = function(taskname){this.taskname = name;}
basictask.prototype.getname = function(){return this.taskname;}
basictask.prototype.setdue = function(taskdue){this.taskdue = taskdue;}
basictask.prototype.getdue = function(){return this.taskdue;}
basictask.prototype.setreminder = function(reminderdate){this.reminder = reminderdate;}
basictask.prototype.getreminder = function(){return this.reminder;}
basictask.prototype.setnote = function(note){this.note = note;}
basictask.prototype.getnote = function(){return this.note;}
basictask.prototype.setcompleted = function(completed){ if(completed==true||completed==false){this.reminder = reminderdate;}}
basictask.prototype.getcompleted = function(){return this.completed;}
basictask.prototype.setactive = function(){this.taskactive = true;}
basictask.prototype.setinactive = function(){this.taskactive = false;}


//Class task
function MainTask(task_name, task_due, task_reminder, task_note) {
	basictask.call(this, task_name, task_due, task_reminder, task_note);
	this.subtask;
}
MainTask.prototype = Object.create(basictask.prototype);
MainTask.prototype.constructor = MainTask;
MainTask.prototype.setsubtask = function(subtask){this.subtask = subtask;}
MainTask.prototype.getsubtask = function(){return this.subtask;}


//Functions for page
//Function create a task
function createtask(taskname, duedate, reminder, note){
	//Check if task has a taskname
	if(textboxhastext(taskname)){
		//Create the task itself
		var newtask = new MainTask(taskname, duedate, reminder, note);
		
		//Create visual
		//Create paragraph
		var paragraph = document.createElement("p");			//Create paragraph
		var paragraphid = "tasknumber"+ newtask.getnumber();	//Varable with paragraph ID
		paragraph.id = paragraphid;								//Set id
		paragraph.setAttribute("data", newtask);						//Set newtask to the paragraph

		//Create active button
		var cb_active = document.createElement("input");		//Create input
		var cb_id = "cb_active" + newtask.getnumber();			
		cb_active.type = "checkbox";							//Set type
		cb_active.id = cb_id;									//Assign ID
		//Assign function to set task inactive or active
		cb_active.onclick = function () {
			//Get the checkbox
			var activetask = document.getElementById("main_middle_activetasks");
			var completedtask = document.getElementById("main_middle_completedtasks");
			var p = document.getElementById(paragraphid);
			var cb = document.getElementById(cb_id);

			//Check for checked or unchecked
			if(cb.checked == true) {
				newtask.setinactive();
				p.parentNode.removeChild(p);
				completedtask.appendChild(p);
			} else {
				newtask.setactive();
				p.parentNode.removeChild(p);
				activetask.appendChild(p);
			}

		}
		paragraph.appendChild(cb_active);						//Assign 

		//Create text in paragraph
		paragraph.appendChild(document.createTextNode(newtask.getname()));	//Set task name in text
		
		//Create edit button
		var btn_edit = document.createElement("button");			//Create button
		btn_edit.id = "btn_edit" + newtask.getnumber();				//Assign ID
		btn_edit.appendChild(document.createTextNode("Edit")); 		//Assig text to button
		btn_edit.onclick = function(){ 								//Create function edit
			var element = document.getElementById(paragraphid);			
			document.getElementById("f_task").value = newtask.taskname;
			document.getElementById("f_duedate").value = newtask.taskdue;
			document.getElementById("f_reminder").value = newtask.reminder;
			document.getElementById("f_note").value = newtask.note;
			element.parentNode.removeChild(element);				//remove the task
			return false;
		};
		paragraph.appendChild(btn_edit);							//Add the edit button

		//Create remove button
		var btn_remove = document.createElement("button");			//Create button
		btn_remove.id = "btn_remove" + newtask.getnumber();			//Assign ID
		btn_remove.appendChild(document.createTextNode("Remove"));	//Add text to button
		btn_remove.onclick = function(){ 							//Create function remove
			var element = document.getElementById(paragraphid);
			element.parentNode.removeChild(element);
			return false;
		};
		paragraph.appendChild(btn_remove);							//Add the remove button

		//Task created
		document.getElementById("main_middle_activetasks").appendChild(paragraph);

		//Remove text from textboxes
		document.getElementById("f_task").value = "";
		document.getElementById("f_duedate").value = "";
		document.getElementById("f_reminder").value = "";	
		document.getElementById("f_note").value = "";		
	}

}

//Checks if textbox is empty or only contains spaces
function textboxhastext(id){
	return !(id.length === 0 || !id.trim());
}

//

//Sort the tasks for new to old
function sortNewTop() {
	//Sort the active tasks
	var activetasks = document.getElementById("main_middle_activetasks").childNodes;
	for(i = 3; i < activetasks.length; i++ ) {
		var task = activetasks[i].getAttribute("data");
		var id = task.getAttribute().taskname;
		alert(id);
	}
}