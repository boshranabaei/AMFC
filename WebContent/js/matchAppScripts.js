var APPLICANT, PAIRINGS, CANDIDATES;
var pairingTable = document.createElement('table');
pairingTable.id = "pairingsTable";
var table = document.createElement('table');
table.id = "applicantsTable";
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

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
			setupApplicantInfo();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

function requestCandidates() {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"gender" : APPLICANT.gender,
			"task" : "getCandidates"
		},
		success : function(data) {
			CANDIDATES = data.candidates;
			CANDIDATES.sort(compareName);
			setupPairings();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

function requestPairings() {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"userId" : APPLICANT.userId,
			"gender" : APPLICANT.gender,
			"task" : "getPairings"
		},
		success : function(data) {
			PAIRINGS = data.pairings;
			requestCandidates();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

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

function getCandidateIndex(userId) {
	var index = 0;
	while (CANDIDATES[index].userId != userId)
		index++;
	return index;
}

function candidateIsPaired(userId, gender) {
	var index = 0;
	if (gender == 0) {
		while (index < PAIRINGS.length && PAIRINGS[index].FUserId != userId)
			index++;
	} else {
		while (index < PAIRINGS.length && PAIRINGS[index].MUserId != userId)
			index++;
	}
	if (index < PAIRINGS.length)
		return true;
	else
		return false;
}

span.onclick = function() {
	modal.style.display = "none";
}

function showModal() {
	modal.style.display = "block";
	var personOnModal;
	if (this.textContent == "More Info") {
		personOnModal = APPLICANT;
	} else {
		personOnModal = CANDIDATES[getCandidateIndex(this.id)];
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

function drawHeaders() {

	var headers = [ "Profile", "Name", "Age", "Ethnicity", "City", " " ];
	var header = table.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		if (i != 0 && i != 5)
			cell.innerHTML += "<div class=\"ion-android-funnel\"></div>";
		cell.style.background = "#5a8c6d";
		cell.style.color = "white";
		cell.style.fontSize = "1.15em";
		cell.style.padding = "0.3em";
	}
}
function drawRows() {

	for (var i = 0; i < CANDIDATES.length; i++) {
		if (candidateIsPaired(CANDIDATES[i].userId, APPLICANT.gender))
			continue;

		var tr = document.createElement('tr');

		var profile = document.createElement('td');
		var profilelogo = document.createElement("img");
		profile.appendChild(profilelogo);
		tr.appendChild(profile);
		profile.style.width = "3em";
		if (CANDIDATES[i].gender == "0")
			profilelogo.src = "/../img/maleLogo.png";
		else if (CANDIDATES[i].hasORwantsHijab == "no")
			profilelogo.src = "/../img/femaleLogo.png";
		else
			profilelogo.src = "/../img/femaleHLogo.png";
		profilelogo.style.height = "2.5em";
		profilelogo.style.marginTop = "0.2em";
		profilelogo.style.boxShadow = "2px 2px #999";
		profilelogo.style.boxShadow = "2px 2px #999";
		profilelogo.id = CANDIDATES[i].userId;

		var name = document.createElement('td');
		name.appendChild(document.createTextNode(CANDIDATES[i].firstName + " "
				+ CANDIDATES[i].lastName));
		tr.appendChild(name);
		name.style.fontWeight = "bold";
		name.style.width = "12em";

		var age = document.createElement('td');
		age.appendChild(document.createTextNode(CANDIDATES[i].age));
		tr.appendChild(age);

		var ethnicity = document.createElement('td');
		ethnicity.appendChild(document.createTextNode(CANDIDATES[i].ethnicity));
		tr.appendChild(ethnicity);
		ethnicity.style.width = "7em";

		var city = document.createElement('td');
		city.appendChild(document.createTextNode(CANDIDATES[i].city));
		tr.appendChild(city);

		var add = document.createElement('td');
		add.innerHTML = "<div class=\"ion-plus-round\"></div>";
		add.style.fontSize = "1.7em";
		add.style.textShadow = "1px 1px 4px grey";
		add.style.color = "green";
		tr.appendChild(add);
		add.style.width = "0.3em";

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
function compareCity(a, b) {
	if (a.city < b.city)
		return -1;
	if (a.city > b.city)
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
		CANDIDATES.sort(compareName);
	if (this.previousSibling.nodeValue == "Ethnicity")
		CANDIDATES.sort(compareEthnicity);
	if (this.previousSibling.nodeValue == "Age")
		CANDIDATES.sort(compareAge);
	if (this.previousSibling.nodeValue == "City")
		CANDIDATES.sort(compareCity);
	if (this.style.transform != "rotateX(180deg)") {
		this.style.transform = "rotateX(180deg)";
	} else {
		this.style.transform = "rotateX(360deg)";
		CANDIDATES.reverse();
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

function drawPairingHeaders() {
	var headers = [ "Profile", "Name", "Age", "Ethnicity", "City", "Director",
			"Status", "Decision Date", " " ];
	var header = pairingTable.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		cell.style.background = "#efa052";
		cell.style.textShadow = "1px 1px 1px grey";
		cell.style.color = "white";
		cell.style.fontSize = "1.15em";
		cell.style.padding = "0.3em";
	}
}
function drawPairingRows() {

	if (PAIRINGS.length == 0) {
		var tr = document.createElement('tr');
		tr.innerHTML="<td colspan=\"9\">No pairings found</td>";
		tr.style.background = "#fce9c5";
		pairingTable.appendChild(tr);
	} else {
		for (var i = 0; i < PAIRINGS.length; i++) {
			var tr = document.createElement('tr');

			var index;

			if (APPLICANT.gender == 0)
				index = getCandidateIndex(PAIRINGS[i].FUserId);
			else
				index = getCandidateIndex(PAIRINGS[i].MUserId);

			var profile = document.createElement('td');
			var profilelogo = document.createElement("img");
			profile.appendChild(profilelogo);
			tr.appendChild(profile);
			profile.style.width = "3em";
			if (CANDIDATES[index].gender == "0")
				profilelogo.src = "/../img/maleLogo.png";
			else if (CANDIDATES[index].hasORwantsHijab == "no")
				profilelogo.src = "/../img/femaleLogo.png";
			else
				profilelogo.src = "/../img/femaleHLogo.png";
			profilelogo.style.height = "2.5em";
			profilelogo.style.marginTop = "0.2em";
			profilelogo.style.boxShadow = "2px 2px #999";
			profilelogo.id = CANDIDATES[index].userId;

			var name = document.createElement('td');
			name.appendChild(document
					.createTextNode(CANDIDATES[index].firstName + " "
							+ CANDIDATES[index].lastName));
			tr.appendChild(name);
			name.style.fontWeight = "bold";
			name.style.width = "12em";

			var age = document.createElement('td');
			age.appendChild(document.createTextNode(CANDIDATES[index].age));
			tr.appendChild(age);

			var ethnicity = document.createElement('td');
			ethnicity.appendChild(document
					.createTextNode(CANDIDATES[index].ethnicity));
			tr.appendChild(ethnicity);
			ethnicity.style.width = "7em";

			var city = document.createElement('td');
			city.appendChild(document.createTextNode(CANDIDATES[index].city));
			tr.appendChild(city);
			city.style.width = "7em";

			var director = document.createElement('td');
			director.appendChild(document.createTextNode(PAIRINGS[i].director));
			tr.appendChild(director);

			var status = document.createElement('td');
			status.appendChild(document
					.createTextNode(PAIRINGS[i].pairingStatus));
			tr.appendChild(status);
			status.style.color = "blue";
			status.style.width = "5em";

			var pairingDate = document.createElement('td');
			pairingDate.appendChild(document
					.createTextNode(PAIRINGS[i].pairingDate));
			tr.appendChild(pairingDate);
			pairingDate.style.width = "10em";

			var remove = document.createElement('td');
			remove.innerHTML = "<div class=\"ion-close\"></div>";
			remove.style.fontSize = "1.5em";
			remove.style.textShadow = "1px 1px 4px grey";
			remove.style.color = "#800000";
			tr.appendChild(remove);
			remove.style.width = "0.3em";

			if (i % 2 == 0)
				tr.style.background = "#fce9c5";
			else
				tr.style.background = "white";

			pairingTable.appendChild(tr);
		}
	}

}

function setupApplicantInfo() {
	requestPairings();
	document.getElementById("backNavigation").innerHTML = "<a href=\"match.html\"><div class=\"ion-ios-arrow-back\"></div>Applicants</a>";
	drawBox();
	$("#moreInfoBtn").click(showModal);
	$("img").click(showModal);
	$("#editApplicant").click(editApplicant);
	// drawHeaders();
	// drawRows();
}

function setupPairings() {
	var pairingTitle = document.createElement('div');
	pairingTitle.id="pairingsTitle"
	pairingTitle.innerHTML="Pairings";
	document.body.appendChild(pairingTitle);
	drawPairingHeaders();
	drawPairingRows();
	document.body.appendChild(pairingTable);
	var candidatesTitle = document.createElement('div');
	candidatesTitle.id="candidatesTitle"
	candidatesTitle.innerHTML="Candidates";
	document.body.appendChild(candidatesTitle);
	drawHeaders();
	drawRows();
	$("img").click(showModal);
}
requestApplicant();