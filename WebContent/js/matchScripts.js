var APPLICANTS;
function requestApplicants() {
	$.ajax({
		type : "GET",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "requestApplicants"
		},
		success : function(data) {
			APPLICANTS = data.applicants;
			drawTable();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

requestApplicants()

function drawTable() {

	var table = document.createElement('table');
	
	var headers = ["Name", "Age", "Status", "Date Applied", "List","View Profile"];
	var header = table.createTHead();
	var row = header.insertRow(0);
	for(var i = 0; i <  headers.length; i++){
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		cell.style.background = "#5a8c6d";
		cell.style.color = "white";
	}
	
	for (var i = 0; i <  APPLICANTS.length; i++){
	    var tr = document.createElement('tr');   
	
	    var name = document.createElement('td');
	    name.appendChild(document.createTextNode(APPLICANTS[i].firstName +" "+APPLICANTS[i].lastName));
	    tr.appendChild(name);
	    name.style.fontWeight="bold";
	    name.style.width= "12em";
	    
	    var age = document.createElement('td');
	    age.appendChild( document.createTextNode(APPLICANTS[i].age) );
	    tr.appendChild(age);
	    
	    var status = document.createElement('td');
	    status.appendChild( document.createTextNode(APPLICANTS[i].status) );
	    tr.appendChild(status);
	    if(APPLICANTS[i].status=="free")
	    	status.style.color="grey";
	    else if(APPLICANTS[i].status=="busy")
	    	status.style.color="red";
	    status.style.width="5em";
	    
	    var dateApplied = document.createElement('td');
	    dateApplied.appendChild( document.createTextNode(APPLICANTS[i].dateAdded) );
	    tr.appendChild(dateApplied);
	    dateApplied.style.width="7em";
	    
	    var list = document.createElement('td');
	    var editBtn = document.createElement("BUTTON");
	    var editText = document.createTextNode("MATCH");
	    editBtn.appendChild( editText );
	    list.appendChild( document.createTextNode(0));
	    list.appendChild( editBtn );
	    tr.appendChild(list);
	    list.style.width="5em";
	    
	    var profile = document.createElement('td');
	    var profilelogo = document.createElement("img");
	    profile.appendChild( profilelogo );
	    tr.appendChild(profile);
	    profile.style.width="8em";
	    profilelogo.src="/../img/profile.png";
	    profilelogo.style.height="2em";
	    profilelogo.style.marginTop="0.2em";
	    profilelogo.style.boxShadow= "2px 2px #999";
	    profilelogo.style.boxShadow= "2px 2px #999";
	    
	    //http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
	    
	    if(i%2==0)
	    	tr.style.background="white";
	    else
	    	tr.style.background="#e0ebe4";
	    	
	    table.appendChild(tr);
	}
	document.body.appendChild(table);
}