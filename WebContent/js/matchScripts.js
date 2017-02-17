var APPLICANTS;
function requestApplicants() {
	$.ajax({
		type : "Post",
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

requestApplicants();

// Get the modal
// http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

var modalTitle = document.getElementById('modalTitle');
modalTitle.innerHTML = "";

span.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

// $("img").click(function() {
// // modalTitle.appendChild(applicantName);
// // var modalContent = document.getElementById('modalContent');
// // var applicantAge = document.createTextNode(this.rowIndex+" years old");
// // var linebreak1 = document.createElement('br');
// // var applicantCountry = document.createTextNode(APPLICANTS[i].ethnicity);
// // if(APPLICANTS[i].hasOwnProperty('citizenship')){
// // applicantCountry = document.createTextNode(APPLICANTS[i].ethnicity+" with
// // "+APPLICANTS[i].citizenship+" citizenship");
// // var linebreak2 = document.createElement('br');
// // modalContent.innerHTML = "";
// // modalContent.appendChild(applicantAge);
// // modalContent.appendChild(linebreak1);
// // modalContent.appendChild(applicantCountry);
// // modalContent.appendChild(linebreak2);
// // modal.style.display = "block";
// // }
// // var applicantName = document.createTextNode(APPLICANTS[i].firstName + " "+
// APPLICANTS[i].lastName);
// });
$('body').on('click', 'img', function() {
	alert(this.id);
})

function drawTable() {

	var table = document.createElement('table');

	var headers = [ "Profile", "Name", "Age", "ethnicity", "Status",
			"Date Applied", "List" ];
	var header = table.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		cell.style.background = "#5a8c6d";
		cell.style.color = "white";
	}

	for (var i = 0; i < APPLICANTS.length; i++) {
		var tr = document.createElement('tr');

		var profile = document.createElement('td');
		var profilelogo = document.createElement("img");
		profile.appendChild(profilelogo);
		tr.appendChild(profile);
		profile.style.width = "4em";
		if (APPLICANTS[i].gender == "0")
			profilelogo.src = "/../img/maleLogo.png";
		else if (APPLICANTS[i].hasORwantsHijab == "0")
			profilelogo.src = "/../img/femaleLogo.png";
		else
			profilelogo.src = "/../img/femaleHLogo.png";
		profilelogo.style.height = "2.5em";
		profilelogo.style.marginTop = "0.2em";
		profilelogo.style.boxShadow = "2px 2px #999";
		profilelogo.style.boxShadow = "2px 2px #999";
		profilelogo.id=i;
		
		var name = document.createElement('td');
		name.appendChild(document.createTextNode(APPLICANTS[i].firstName + " "
				+ APPLICANTS[i].lastName));
		tr.appendChild(name);
		name.style.fontWeight = "bold";
		name.style.width = "12em";

		var age = document.createElement('td');
		age.appendChild(document.createTextNode(APPLICANTS[i].age));
		tr.appendChild(age);

		var ethnicity = document.createElement('td');
		ethnicity.appendChild(document.createTextNode(APPLICANTS[i].ethnicity));
		tr.appendChild(ethnicity);
		ethnicity.style.width = "6em";

		var status = document.createElement('td');
		status.appendChild(document.createTextNode(APPLICANTS[i].status));
		tr.appendChild(status);
		if (APPLICANTS[i].status == "free")
			status.style.color = "grey";
		else if (APPLICANTS[i].status == "busy")
			status.style.color = "red";
		status.style.width = "5em";

		var dateApplied = document.createElement('td');
		dateApplied.appendChild(document
				.createTextNode(APPLICANTS[i].dateAdded));
		tr.appendChild(dateApplied);
		dateApplied.style.width = "7em";

		var list = document.createElement('td');
		var editBtn = document.createElement("BUTTON");
		var editText = document.createTextNode("MATCH");
		editBtn.appendChild(editText);
		list.appendChild(document.createTextNode(0));
		list.appendChild(editBtn);
		tr.appendChild(list);
		list.style.width = "9em";

		if (i % 2 == 0)
			tr.style.background = "white";
		else
			tr.style.background = "#e0ebe4";

		table.appendChild(tr);
	}
	document.body.appendChild(table);
}
// http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown
