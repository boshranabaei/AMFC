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
			sessionIsValid(data.session);
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
			"userId" : APPLICANT.userId,
			"task" : "getCandidates"
		},
		success : function(data) {
			sessionIsValid(data.session);
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

function requestPairings(operation) {
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
			sessionIsValid(data.session);
			PAIRINGS = data.pairings;
			if (operation == "addOrRemove") {
				while (pairingTable.rows.length > 1) {
					pairingTable.deleteRow(1);
				}
				while (table.rows.length > 1) {
					table.deleteRow(1);
				}
				drawPairingRows();
				drawRows();
				delegate();
			}else if(operation == "changeStatus"){
				return true;
			} 
			else {
				requestCandidates();
			}
			
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
			sessionIsValid(data.session);
			window.open("matchedit.html", "_self");
			return true;
		},
		error : function() {
			return false;
		}
	});
}

function updatePairingStatus(MUserId, FUserId, pairingStatus) {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "updatePairingStatus",
			"MUserId" : MUserId,
			"FUserId" : FUserId,
			"pairingStatus" : pairingStatus
		},
		success : function(data) {
			sessionIsValid(data.session);
			requestPairings("changeStatus");
			toast("Pairing status changes successfully");
			return true;
		},
		error : function() {
			toast("Server Error");
			return false;
		}
	});
}

function addPairing(MUserId, FUserId, director) {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "addPairing",
			"MUserId" : MUserId,
			"FUserId" : FUserId,
			"director" : cleanSpecialChars(director)
		},
		success : function(data) {
			sessionIsValid(data.session);
			toast("Pairing added successfully");
			requestPairings("addOrRemove");
			return true;
		},
		error : function() {
			toast("Server Error");
			return false;
		}
	});
}
function removePairing(MUserId, FUserId) {
	mscConfirm({
		title : 'Confirmation',
		subtitle : 'Are your sure that you want to remove this matching?',
		okText : 'Yes', // default: OK
		cancelText : 'Cancel', // default: Cancel,
		onOk : function() {
			$.ajax({
				type : "Post",
				url : "/applicant",
				dataType : "json",
				data : {
					"task" : "removePairing",
					"MUserId" : MUserId,
					"FUserId" : FUserId
				},
				success : function(data){
					sessionIsValid(data.session);
					toast("Matching removed successfully");
					requestPairings("addOrRemove");
					return true;
				},
				error : function() {
					toast("Server Error");
					return false;
				}
			});
		}
	});	
}
function sendComments(comment,FUserId,MUserId) {
		$.ajax({
			type : "Post",
			url : "/applicant",
			dataType : "json",
			data : {
				"task" : "addComment",
				"MUserId" : MUserId,
				"FUserId" : FUserId,
				"comment" : cleanSpecialChars(comment)
			},
			success : function(data) {
				sessionIsValid(data.session);
				return true;
			},
			error : function() {
				toast("Server Error");
				return false;
			}
		});
	
}
function archiveApplicant() {
	mscConfirm({
		title : 'Confirmation',
		subtitle : 'Are your sure that you want to archive this applicant?',
		okText : 'Yes', // default: OK
		cancelText : 'Cancel', // default: Cancel,
		onOk : function() {
			$.ajax({
				type : "Post",
				url : "/applicant",
				dataType : "json",
				data : {
					"task" : "archiveApplicant",
					"userId": APPLICANT.userId
				},
				success : function(data) {
					sessionIsValid(data.session);
					if(data.mission=="accomplished")
						window.open("match.html", "_self");
					else
						toast("Unable to archive, the applicant is involved in a matching.");
					return true;
				},
				error : function() {
					toast("Server Error");
					return false;
				}
			});
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

	var modalTitle = document.getElementById('modalTitle');
	modalTitle.innerHTML = "";
	var modalContent = document.getElementById('modalContent');
	modalContent.innerHTML = "";
	modalContent.style.maxHeight = "400px";
	modalContent.style.padding = "5%";
	modalContent.style.overflow="auto";
	modalContent.style.textAlign="left";
	
	if(this.className == "ion-compose"){
		var rowIndex = this.parentElement.parentElement.rowIndex-1;
		modalContent.style.textAlign="center";
		modalTitle.innerHTML += "Comments" ;
		var comments = document.createElement('textarea');
		comments.id="comments";
		comments.rows="4";
		if(PAIRINGS[rowIndex].hasOwnProperty("note"))
			comments.value = PAIRINGS[rowIndex].note; 
		var saveComments = document.createElement('BUTTON');
		saveComments.innerHTML="Save Comment";
		saveComments.style.marginTop="2em";
		saveComments.onclick = function() {
			if(comments.value!="") 
				sendComments(comments.value,PAIRINGS[rowIndex].FUserId,PAIRINGS[rowIndex].MUserId);
				PAIRINGS[rowIndex].note=comments.value;
				toast("Comments saved successfuly.");
			};
		
		modalContent.appendChild(comments);
		modalContent.appendChild(saveComments);
	}
	else if(this.id=="contactBtn"){
		modalTitle.innerHTML += "Contact Info" ;
		var contactInfo = document.createElement('p');
		if(APPLICANT.hasOwnProperty("email") && APPLICANT.email!="")
			contactInfo.innerHTML += "<b>Email:</b> "+APPLICANT.email+"<br/>";
		if(APPLICANT.hasOwnProperty("mobilePhoneNumber") && APPLICANT.mobilePhoneNumber!="")
			contactInfo.innerHTML += "<b>Cell Phone #:</b> "+APPLICANT.mobilePhoneNumber+"<br/>";
		if(APPLICANT.hasOwnProperty("homePhoneNumber") && APPLICANT.homePhoneNumber!="")
			contactInfo.innerHTML += "<b>Home Phone #:</b> "+APPLICANT.homePhoneNumber+"<br/>";
		if(APPLICANT.hasOwnProperty("pointOfContact") && APPLICANT.pointOfContact!="")
			contactInfo.innerHTML += "<b>Point of contact:</b> "+APPLICANT.pointOfContact+"<br/>";
		modalContent.appendChild(contactInfo);
	}
	else if(this.id=="pictureBtn"){
		modalTitle.innerHTML += "Photo";
		var image = new Image();
		image.src = "data:image/jpg;base64,"+ APPLICANT.photo;
		image.style.maxWidth = "100%"
		modalContent.appendChild(image);
	}
	else{
		if (this.textContent == "More Info"){
			personOnModal = APPLICANT;
		} else {
			personOnModal = CANDIDATES[getCandidateIndex(this.id)];
		}
		
		modalTitle.innerHTML = personOnModal.firstName+ " " + personOnModal.lastName;
	
		var applicantDetails = document.createElement('p');
		applicantDetails.innerHTML = personOnModal.age	+ " years old";
		if(personOnModal.approximateAge==1)
			applicantDetails.innerHTML += " (a guess) ";
		applicantDetails.innerHTML += "<br/>"+personOnModal.ethnicity;
		if (personOnModal.citizenship != "")
			applicantDetails.innerHTML += " / "+ personOnModal.citizenship+" citizenship";
		applicantDetails.innerHTML += "<br/> "+ personOnModal.maritalStatus;
		if (personOnModal.children != 0)
			applicantDetails.innerHTML += " with "+ personOnModal.citizenship+" children";
		applicantDetails.innerHTML += "<br/> Lives in "+ personOnModal.city;
		if (personOnModal.province != "")
			applicantDetails.innerHTML += ", "+ personOnModal.province;
		applicantDetails.innerHTML += ", "+ personOnModal.country;
		if (personOnModal.relocate != 0)
			applicantDetails.innerHTML += "</br> Willing to relocate";
		if (personOnModal.relocateWhere != "" && personOnModal.relocateWhere != "where?")
			applicantDetails.innerHTML += " to " +personOnModal.relocateWhere ;
		if(personOnModal.smoke==1)
			applicantDetails.innerHTML += "</br>...Smokes";
		if(personOnModal.education != "unknown")
			applicantDetails.innerHTML += "</br>Education level is \""+ personOnModal.education+"\"";
		if(personOnModal.occupation != "")
			applicantDetails.innerHTML += "</br>Currently is "+ personOnModal.occupation;
		if(personOnModal.amfcPointOfContact!="self")
			applicantDetails.innerHTML += "</br> *Introduced by " + personOnModal.amfcPointOfContact;
		else
			applicantDetails.innerHTML += "</br> *Applicant approached AMFC";
		if(personOnModal.comments != "")
			applicantDetails.innerHTML += "</br></br><b>More info:</b><br/> ";
		
		var applicantdMoreInfo = document.createElement('p');
		applicantdMoreInfo.innerHTML = personOnModal.comments;
		applicantdMoreInfo.style.textAlign="justify";
		applicantdMoreInfo.style.fontSize="0.9em";
		
		var applicantdPref = document.createElement('p');
		applicantdPref.innerHTML = "";
		if(personOnModal.gender==0)
			if(personOnModal.hasORwantsHijab=="no")
				applicantdPref.innerHTML += "<br/>Without Hijab";
			else if(personOnModal.hasORwantsHijab=="yes")
				applicantdPref.innerHTML += "<br/>Wearing Hijab";
			else
				applicantdPref.innerHTML += "<br/>Hijab does not matter";
		if(personOnModal.prefMaritalStatus != "unknown")
			applicantdPref.innerHTML += "<br/>Marital status of "+personOnModal.prefMaritalStatus;
		if(personOnModal.prefAgeMin != 0)
			applicantdPref.innerHTML += "<br/>>= "+ (personOnModal.age- personOnModal.prefAgeMin) +" years old";
		if(personOnModal.prefAgeMax != 0)
			applicantdPref.innerHTML += "<br/><= "+ (personOnModal.age- personOnModal.prefAgeMax) +" years old";
		if(personOnModal.prefEthnicity != "")
			applicantdPref.innerHTML += "<br/>Ethinicity of "+personOnModal.prefEthnicity;
		if(personOnModal.prefCountry != "")
			applicantdPref.innerHTML += "<br/>Residence of "+personOnModal.prefCountry;
		if(personOnModal.prefEducation != "unknown")
			applicantdPref.innerHTML += "<br/>Education of at least \""+personOnModal.prefEducation+"\"";
		if(applicantdPref.innerHTML!="")
			applicantdPref.innerHTML = "<br/><b>Looking for:</b>" + applicantdPref.innerHTML;
		if(personOnModal.prefComments != "")
			applicantdPref.innerHTML += "</br></br><b>About the preferred match:</b><br/> ";
		
		var prefMoreInfo = document.createElement('p');
		prefMoreInfo.innerHTML = personOnModal.prefComments;
		prefMoreInfo.style.textAlign="justify";
		prefMoreInfo.style.fontSize="0.9em";
		
		
		modalContent.appendChild(applicantDetails);
		modalContent.appendChild(applicantdMoreInfo);
		modalContent.appendChild(applicantdPref);
		modalContent.appendChild(prefMoreInfo);
	}
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
			profilelogo.src = "/img/maleLogo.png";
		else if (CANDIDATES[i].hasORwantsHijab == "no")
			profilelogo.src = "/img/femaleLogo.png";
		else
			profilelogo.src = "/img/femaleHLogo.png";
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
	delegate();
});

function drawBox() {
	var box = document.getElementsByClassName("box effect2")[0];
	box.innerHTML = APPLICANT.firstName + " " + APPLICANT.lastName;
	box.innerHTML += "<p>" + APPLICANT.age + " years old, "
			+ APPLICANT.ethnicity + ", lives in " + APPLICANT.city + ", "
			+ APPLICANT.country + "</p>";

	var archive = document.createElement("BUTTON");
	var archiveText = document.createTextNode("Archive");
	archive.appendChild(archiveText );
	archive.id = "archiveBtn";
	archive.style.color="DarkRed";
	box.appendChild(archive);
	
	var edit = document.createElement("BUTTON");
	var editText = document.createTextNode("Edit");
	edit.appendChild(editText);
	edit.id = "editApplicant";
	box.appendChild(edit);

	var moreInfo = document.createElement("BUTTON");
	var moreInfoText = document.createTextNode("More Info");
	moreInfo.appendChild(moreInfoText);
	moreInfo.id = "moreInfoBtn";
	moreInfo.style.fontWeight="bold";
	box.appendChild(moreInfo);
	
	var contactLogo = document.createElement("BUTTON");
	contactLogo.innerHTML = "<div class=\"ion-email\"></div>";
	contactLogo.id = "contactBtn";
	box.appendChild(contactLogo);
	
	if(APPLICANT.hasOwnProperty("photo") && APPLICANT.photo != "null"){
		var pictureLogo = document.createElement("BUTTON");
		pictureLogo.innerHTML = "<div class=\"ion-ios-camera\"></div>";
		pictureLogo.id = "pictureBtn";
		box.appendChild(pictureLogo);
	}
}

function drawPairingHeaders() {
	var headers = [ "Profile", "Name", "Age", "Ethnicity", "City", "Coordinator",
			"Status", "Match Date", " " ];
	var header = pairingTable.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		cell.style.background = "#efa052";
		cell.style.textShadow = "1px 1px 1px grey";
		cell.style.color = "white";
		cell.style.fontSize = "1.15em";
		cell.style.padding = "0.2em";
	}
}
function drawPairingRows() {

	if (PAIRINGS.length == 0) {
		var tr = document.createElement('tr');
		tr.innerHTML = "<td colspan=\"9\">No pairings found</td>";
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
				profilelogo.src = "/img/maleLogo.png";
			else if (CANDIDATES[index].hasORwantsHijab == "no")
				profilelogo.src = "/img/femaleLogo.png";
			else
				profilelogo.src = "/img/femaleHLogo.png";
			profilelogo.style.height = "2.5em";
			profilelogo.style.marginTop = "0.2em";
			profilelogo.style.boxShadow = "2px 2px #999";
			profilelogo.id = CANDIDATES[index].userId;

			var name = document.createElement('td');
			if(CANDIDATES[index].archived==1){
				name.appendChild(document
						.createTextNode("--Archived  "+CANDIDATES[index].firstName + " "
								+ CANDIDATES[index].lastName));
			}
			else
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
			var dropDown = document.createElement("select");
			var opt1 = document.createElement("option");
			opt1.text = 'on going';
			opt1.value = 'on going';
			dropDown.options.add(opt1);
			var opt2 = document.createElement("option");
			opt2.text = 'failed';
			opt2.value = 'failed';
			dropDown.options.add(opt2);
			var opt3 = document.createElement("option");
			opt3.text = 'successful';
			opt3.value = 'successful';
			dropDown.options.add(opt3);
			var note = document.createElement("div");
			note.className += "ion-compose";
			if (PAIRINGS[i].pairingStatus == "on going")
				dropDown.selectedIndex = 0;
			else if (PAIRINGS[i].pairingStatus == "failed")
				dropDown.selectedIndex = 1;
			else
				dropDown.selectedIndex = 2;
			status.appendChild(dropDown);
			status.appendChild(note);
			dropDown.style.width = "6em";
			status.style.width = "9em";
			tr.appendChild(status);
			
			
			var pairingDate = document.createElement('td');
			pairingDate.appendChild(document
					.createTextNode(PAIRINGS[i].pairingDate));
			tr.appendChild(pairingDate);
			pairingDate.style.width = "7em";

			var remove = document.createElement('td');
			remove.innerHTML = "<div class=\"ion-close\"></div>";
			remove.style.fontSize = "1.5em";
			remove.style.textShadow = "1px 1px 4px grey";
			remove.style.color = "#800000";
			tr.appendChild(remove);
			remove.style.width = "0.1em";

			if(CANDIDATES[index].archived==1){
				tr.style.background = "#dad3d1";
				tr.style.color = "grey";
			}
			else if (i % 2 == 0)
				tr.style.background = "#fce9c5";
			else
				tr.style.background = "white";

			pairingTable.appendChild(tr);
		}
	}

}

function setupApplicantInfo() {
	requestPairings("start");
	document.getElementById("backNavigation").innerHTML = "<a href=\"match.html\"><div class=\"ion-ios-arrow-back\"></div>Applicants</a>";
	drawBox();
	$("#moreInfoBtn").click(showModal);
	$("img").click(showModal);
	$("#contactBtn").click(showModal);
	$("#pictureBtn").click(showModal);
	$("#editApplicant").click(editApplicant);
	$("#archiveBtn").click(archiveApplicant);
}

function toast(message) {
	var x = document.getElementById("snackbar")
	x.className = "show";
	x.innerText = message;
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}
function delegate() {
	$("img").click(showModal);
	$("select").change(
			function() {
				var index = this.parentElement.parentElement.rowIndex - 1;
				updatePairingStatus(PAIRINGS[index].MUserId,
						PAIRINGS[index].FUserId,
						this.options[this.selectedIndex].value);
			});
	$(".ion-plus-round").click(function() {
		var that = this;
		mscPrompt({
			title : 'Add Pairing',
			subtitle : 'Who is responsible for introducing?',
			okText : 'Yes', // default: OK
			placeholder:'Coordinator',
			cancelText : 'Cancel', // default: Cancel,
			onOk : function(val) {
				var name = that.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
				var i;
				for (i = 0; i < CANDIDATES.length; i++)
					if ((CANDIDATES[i].firstName + " " + CANDIDATES[i].lastName) == name)
						break;
				if (APPLICANT.gender == 1)
					addPairing(CANDIDATES[i].userId,
							APPLICANT.userId, val);
				else
					addPairing(APPLICANT.userId,
							CANDIDATES[i].userId, val);
			}
		})
	});
	$(".ion-close").click(function() {
		var that = this;
		var index = this.parentElement.parentElement.rowIndex - 1;
		if (APPLICANT.gender == 1)
			removePairing(PAIRINGS[index].MUserId,
					APPLICANT.userId);
		else
			removePairing(APPLICANT.userId,
					PAIRINGS[index].FUserId);
	});
	
	$(".ion-compose").click(showModal);
}
function setupPairings() {
	var pairingTitle = document.createElement('div');
	pairingTitle.id = "pairingsTitle"
	pairingTitle.innerHTML = "Pairings";
	document.body.appendChild(pairingTitle);
	drawPairingHeaders();
	drawPairingRows();
	document.body.appendChild(pairingTable);
	var candidatesTitle = document.createElement('div');
	candidatesTitle.id = "candidatesTitle"
	candidatesTitle.innerHTML = "Candidates";
	document.body.appendChild(candidatesTitle);
	drawHeaders();
	drawRows();
	delegate();
}

requestApplicant();
