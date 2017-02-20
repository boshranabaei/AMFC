var APPLICANT;

function requestApplicant() {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "getSelectedApplicant"
		},
		success : function(data) {
			APPLICANT = data.applicant;
			setup();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

function getApplicantIndex(userId) {
	var index = 0;
	while (APPLICANTS[index].userId != userId)
		index++;
	return index;
}

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
	modal.style.display = "none";
}

function showModal() {
	modal.style.display = "block";
	var personOnModal;
	if (this.textContent == "More Info") {
		personOnModal = APPLICANT;
	} else {
		var index = getApplicantIndex(this.id);
	}

	var modalTitle = document.getElementById('modalTitle');
	modalTitle.innerHTML = "";
	modalTitle.appendChild(document.createTextNode(personOnModal.firstName
			+ " " + personOnModal.lastName));

	var modalContent = document.getElementById('modalContent');
	modalContent.innerHTML = "";
	modalContent.style.maxHeight = "400px";
	modalContent.style.padding = "5%";
	modalContent.style.overflow = "auto";
	var applicantdDetails = document.createElement('p');
	applicantdDetails.innerHTML = personOnModal.age + " years old </br> "
			+ personOnModal.ethnicity;
	if (personOnModal.citizenship != "")
		applicantdDetails.innerHTML += " / " + personOnModal.citizenship
				+ " citizenship";
	applicantdDetails.innerHTML += "<br/> " + personOnModal.maritalStatus;
	if (personOnModal.children != 0)
		applicantdDetails.innerHTML += " with " + personOnModal.citizenship
				+ " children";
	applicantdDetails.innerHTML += "<br/> Lives in " + personOnModal.city;
	if (personOnModal.province != "")
		applicantdDetails.innerHTML += ", " + personOnModal.province;
	applicantdDetails.innerHTML += ", " + personOnModal.country;
	if (personOnModal.amfcPointOfContact != "self")
		applicantdDetails.innerHTML += "</br>Introduced by "
				+ personOnModal.amfcPointOfContact;
	else
		applicantdDetails.innerHTML += "</br>Applicant approached AMFC";
	if (personOnModal.degree != "unknown")
		applicantdDetails.innerHTML += "</br>" + personOnModal.education;
	if (personOnModal.occupation != "")
		applicantdDetails.innerHTML += "</br>Currently is "
				+ personOnModal.occupation;
	if (personOnModal.comments != "")
		applicantdDetails.innerHTML += "</br></br><b>More info:</b><br/> ";

	var applicantdMoreInfo = document.createElement('p');
	applicantdMoreInfo.innerHTML = personOnModal.comments;
	applicantdMoreInfo.style.textAlign = "justify";
	applicantdMoreInfo.style.fontSize = "0.9em";

	var applicantdPref = document.createElement('p');
	applicantdPref.innerHTML = "<br/><b>Looking for:</b>";
	if (personOnModal.prefMaritalStatus != "unknown")
		applicantdPref.innerHTML += personOnModal.prefMaritalStatus;
	if (personOnModal.prefAgeMin != 0)
		applicantdPref.innerHTML += "<br/>>= "
				+ (personOnModal.age + personOnModal.prefAgeMin) + " years old";
	if (personOnModal.prefAgeMax != 0)
		applicantdPref.innerHTML += "<br/><= "
				+ (personOnModal.age + personOnModal.prefAgeMax) + " years old";
	if (personOnModal.prefEthnicity != "")
		applicantdPref.innerHTML += "<br/>" + personOnModal.prefEthnicity;
	if (personOnModal.prefCountry != "")
		applicantdPref.innerHTML += "<br/>residence of "
				+ personOnModal.prefCountry;
	if (personOnModal.prefEducation != "")
		applicantdPref.innerHTML += "<br/>education of at least "
				+ personOnModal.prefEducation;
	if (personOnModal.prefComments != "")
		applicantdPref.innerHTML += "</br></br><b>More info:</b><br/> ";

	var prefMoreInfo = document.createElement('p');
	prefMoreInfo.innerHTML = personOnModal.prefComments;
	prefMoreInfo.style.textAlign = "justify";
	prefMoreInfo.style.fontSize = "0.9em";

	modalContent.appendChild(applicantdDetails);
	modalContent.appendChild(applicantdMoreInfo);
	modalContent.appendChild(applicantdPref);
	modalContent.appendChild(prefMoreInfo);

};

var table = document.createElement('table');
table.id = "applicantsTable";
function drawHeaders() {

	var headers = [ "Profile", "Name", "Age", "Ethnicity", "Status",
			"Date Applied", "List" ];
	var header = table.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		if (i != 0 && i != 4 && i != 6)
			cell.innerHTML += "<div class=\"ion-android-funnel\"></div>";
		cell.style.background = "#5a8c6d";
		cell.style.color = "white";
		cell.style.fontSize = "1.15em";
		cell.style.padding = "0.3em";
	}

}
function drawRows() {

	for (var i = 0; i < APPLICANTS.length; i++) {
		var tr = document.createElement('tr');

		var profile = document.createElement('td');
		var profilelogo = document.createElement("img");
		profile.appendChild(profilelogo);
		tr.appendChild(profile);
		profile.style.width = "3em";
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
		profilelogo.id = APPLICANTS[i].userId;

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
		ethnicity.style.width = "7em";

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
		dateApplied.style.width = "10em";

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

function compareName(a, b) {
	if (a.firstName < b.firstName)
		return -1;
	if (a.firstName > b.firstName)
		return 1;
	return 0;
}
function compareAge(a, b) {
	if (a.age < b.age)
		return -1;
	if (a.age > b.age)
		return 1;
	return 0;
}
function compareEthnicity(a, b) {
	if (a.ethnicity < b.ethnicity)
		return -1;
	if (a.ethnicity > b.ethnicity)
		return 1;
	return 0;
}
function compareDate(a, b) {
	if (a.dateApplied < b.dateApplied)
		return -1;
	if (a.dateApplied > b.dateApplied)
		return 1;
	return 0;
}
$(document).on('click', ".ion-android-funnel", function() {
	var headers = document.getElementsByClassName("ion-android-funnel");
	for (var h = 0; h < headers.length; h++) {
		headers[h].style.color = "white";
	}
	this.style.color = "#3ae045";
	if (this.previousSibling.nodeValue == "Name")
		APPLICANTS.sort(compareName);
	if (this.previousSibling.nodeValue == "Ethnicity")
		APPLICANTS.sort(compareEthnicity);
	if (this.previousSibling.nodeValue == "Age")
		APPLICANTS.sort(compareAge);
	if (this.previousSibling.nodeValue == "Date Applied")
		APPLICANTS.sort(compareDate);
	if (this.style.transform != "rotateX(180deg)") {
		this.style.transform = "rotateX(180deg)";
	} else {
		this.style.transform = "rotateX(360deg)";
		APPLICANTS.reverse();
	}
	while (table.rows.length > 1) {
		table.deleteRow(1);
	}
	drawRows();
});

function dropDownFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
	document.getElementById("myDropdown").left = "300px";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {

	if (event.target == modal) {
		modal.style.display = "none";
	}

	if (!event.target.matches('.ion-android-funnel')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function drawBox() {
	var box = document.getElementsByClassName("box effect2")[0];
	box.innerHTML = APPLICANT.firstName + " " + APPLICANT.lastName;
	box.innerHTML += "<p>" + APPLICANT.age + " years old, "
			+ APPLICANT.ethnicity + ", lives in " + APPLICANT.city + ", "
			+ APPLICANT.country + "</p>";

	var edit = document.createElement("BUTTON");
	var editText = document.createTextNode("Edit");
	edit.appendChild(editText);
	edit.id = "editApplicant";
	box.appendChild(edit);

	var moreInfo = document.createElement("BUTTON");
	var moreInfoText = document.createTextNode("More Info");
	moreInfo.appendChild(moreInfoText);
	moreInfo.id = "moreInfoBtn";
	box.appendChild(moreInfo);

}
function editApplicant() {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "selectApplicant",
			"userId" : APPLICANT.userId
		},
		success : function(data) {
			window.open("matchedit.html", "_self");
			return true;
		},
		error : function() {
			return false;
		}
	});
}

function setup() {
	document.getElementById("backNavigation").innerHTML = "<a href=\"match.html\"><div class=\"ion-ios-arrow-back\"></div>Applicants</a>";
	drawBox();
	$("#moreInfoBtn").click(showModal);
	$("#editApplicant").click(editApplicant);
	// drawHeaders();
	// drawRows();
}

requestApplicant();