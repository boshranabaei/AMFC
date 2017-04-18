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
			APPLICANTS.sort(compareName);
			drawHeaders();
			drawRows();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

requestApplicants();

function getApplicantIndex(userId) {
	var index = 0;
	while (APPLICANTS[index].userId != userId)
		index++;
	return index;
}

// Get the modal
// http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
var modal = document.getElementById('myModal');

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
	modal.style.display = "none";
}


$('body').on('click','img',	function() {
			modal.style.display = "block";
			
			var index = getApplicantIndex(this.id);

			var modalTitle = document.getElementById('modalTitle');
			modalTitle.innerHTML = "";
			modalTitle.appendChild(document.createTextNode(APPLICANTS[index].firstName + " "+ APPLICANTS[index].lastName));
			
			var modalContent = document.getElementById('modalContent');
			modalContent.innerHTML = "";
			modalContent.style.maxHeight = "400px";
			modalContent.style.padding = "5%";
			modalContent.style.overflow="auto";
			var applicantdDetails = document.createElement('p');
			applicantdDetails.innerHTML = APPLICANTS[index].age	+ " years old";
			if(APPLICANTS[index].approximateAge==1)
				applicantdDetails.innerHTML += " (a guess) ";
			applicantdDetails.innerHTML += "<br/>"+APPLICANTS[index].ethnicity;
			if (APPLICANTS[index].citizenship != "")
				applicantdDetails.innerHTML += " / "+ APPLICANTS[index].citizenship+" citizenship";
			applicantdDetails.innerHTML += "<br/> "+ APPLICANTS[index].maritalStatus;
			if (APPLICANTS[index].children != 0)
				applicantdDetails.innerHTML += " with "+ APPLICANTS[index].citizenship+" children";
			applicantdDetails.innerHTML += "<br/> Lives in "+ APPLICANTS[index].city;
			if (APPLICANTS[index].province != "")
				applicantdDetails.innerHTML += ", "+ APPLICANTS[index].province;
			applicantdDetails.innerHTML += ", "+ APPLICANTS[index].country;
			if (APPLICANTS[index].relocate != 0)
				applicantdDetails.innerHTML += "</br> Willing to relocate";
			if (APPLICANTS[index].relocateWhere != "")
				applicantdDetails.innerHTML += " to " +APPLICANTS[index].relocateWhere ;
			if(APPLICANTS[index].smoke==1)
				applicantdDetails.innerHTML += "</br>...Smokes";
			if(APPLICANTS[index].education != "unknown")
				applicantdDetails.innerHTML += "</br>Education level is \""+ APPLICANTS[index].education+"\"";
			if(APPLICANTS[index].occupation != "")
				applicantdDetails.innerHTML += "</br>Currently is "+ APPLICANTS[index].occupation;
			if(APPLICANTS[index].amfcPointOfContact!="self")
				applicantdDetails.innerHTML += "</br> *Introduced by " + APPLICANTS[index].amfcPointOfContact;
			else
				applicantdDetails.innerHTML += "</br> *Applicant approached AMFC";
			if(APPLICANTS[index].comments != "")
				applicantdDetails.innerHTML += "</br></br><b>More info:</b><br/> ";
			
			var applicantdMoreInfo = document.createElement('p');
			applicantdMoreInfo.innerHTML = APPLICANTS[index].comments;
			applicantdMoreInfo.style.textAlign="justify";
			applicantdMoreInfo.style.fontSize="0.9em";
			
			var applicantdPref = document.createElement('p');
			applicantdPref.innerHTML = "";
			if(APPLICANTS[index].gender==0)
				if(APPLICANTS[index].hasORwantsHijab=="no")
					applicantdPref.innerHTML += "<br/>Without Hijab";
				else if(APPLICANTS[index].hasORwantsHijab=="yes")
					applicantdPref.innerHTML += "<br/>Wearing Hijab";
				else
					applicantdPref.innerHTML += "<br/>Hijab does not matter";
			if(APPLICANTS[index].prefMaritalStatus != "unknown")
				applicantdPref.innerHTML += "<br/>Marital status of "+APPLICANTS[index].prefMaritalStatus;
			if(APPLICANTS[index].prefAgeMin != 0)
				applicantdPref.innerHTML += "<br/>>= "+ (APPLICANTS[index].age+ APPLICANTS[index].prefAgeMin) +" years old";
			if(APPLICANTS[index].prefAgeMax != 0)
				applicantdPref.innerHTML += "<br/><= "+ (APPLICANTS[index].age+ APPLICANTS[index].prefAgeMax) +" years old";
			if(APPLICANTS[index].prefEthnicity != "")
				applicantdPref.innerHTML += "<br/>Ethinicity of "+APPLICANTS[index].prefEthnicity;
			if(APPLICANTS[index].prefCountry != "")
				applicantdPref.innerHTML += "<br/>Residence of "+APPLICANTS[index].prefCountry;
			if(APPLICANTS[index].prefEducation != "unknown")
				applicantdPref.innerHTML += "<br/>Education of at least \""+APPLICANTS[index].prefEducation+"\"";
			if(applicantdPref.innerHTML!="")
				applicantdPref.innerHTML = "<br/><b>Looking for:</b>" + applicantdPref.innerHTML;
			if(APPLICANTS[index].prefComments != "")
				applicantdPref.innerHTML += "</br></br><b>About the preferred match:</b><br/> ";
			
			var prefMoreInfo = document.createElement('p');
			prefMoreInfo.innerHTML = APPLICANTS[index].prefComments;
			prefMoreInfo.style.textAlign="justify";
			prefMoreInfo.style.fontSize="0.9em";
			
			
			modalContent.appendChild(applicantdDetails);
			modalContent.appendChild(applicantdMoreInfo);
			modalContent.appendChild(applicantdPref);
			modalContent.appendChild(prefMoreInfo);
			
		})

var table = document.createElement('table');
table.id = "applicantsTable";

function drawHeaders() {

	var headers = [ "Profile", "Name", "Age", "Ethnicity", "Status",
			"Date Added", "" ];
	var header = table.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		if(i!=0 && i!=4 && i!=6)
			cell.innerHTML +="<div class=\"ion-android-funnel\"></div>";
		cell.style.background = "#5a8c6d";
		cell.style.color = "white";
		cell.style.fontSize="1.15em";
		cell.style.padding="0.3em";
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
		else if (APPLICANTS[i].hasORwantsHijab == "no")
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

		var dateAdded = document.createElement('td');
		dateAdded.appendChild(document
				.createTextNode(APPLICANTS[i].dateAdded));
		tr.appendChild(dateAdded);
		dateAdded.style.width = "10em";

		var list = document.createElement('td');
		var editBtn = document.createElement("BUTTON");
		var editText = document.createTextNode("MATCH");
		editBtn.appendChild(editText);
		editBtn.onclick=function() { 
			var userId=this.parentElement.parentElement.firstChild.firstChild.id;
			$.ajax({
				type : "Post",
				url : "/applicant",
				dataType : "json",
				data : {
					"task" : "selectApplicant",
					"userId": userId
				},
				success : function(data) {
					window.open("matchapplicant.html","_self");
					return true;
				},
				error : function() {
					return false;
				}
			});
			return true;
		
		};
		list.appendChild(editBtn);
		tr.appendChild(list);
		list.style.width = "8em";

		if (i % 2 == 0)
			tr.style.background = "white";
		else
			tr.style.background = "#e0ebe4";

		table.appendChild(tr);
	}
	document.body.appendChild(table);
}

function compareName(a,b) {
	  if (a.firstName < b.firstName)
	    return -1;
	  if (a.firstName > b.firstName)
	    return 1;
	  return 0;
}
function compareAge(a,b) {
	  if (a.age < b.age)
	    return -1;
	  if (a.age > b.age)
	    return 1;
	  return 0;
}
function compareEthnicity(a,b) {
	  if (a.ethnicity < b.ethnicity)
	    return -1;
	  if (a.ethnicity > b.ethnicity)
	    return 1;
	  return 0;
}
function compareDate(a,b) {
	  if (a.dateAdded < b.dateAdded)
	    return -1;
	  if (a.dateAdded > b.dateAdded)
	    return 1;
	  return 0;
}
$(document).on('click', ".ion-android-funnel", function() {
	var headers = document.getElementsByClassName("ion-android-funnel");
	for(var h=0; h<headers.length;h++){
		headers[h].style.color= "white";
	}
	this.style.color= "#3ae045";
	if(this.previousSibling.nodeValue=="Name")
		APPLICANTS.sort(compareName);
	if(this.previousSibling.nodeValue=="Ethnicity")
		APPLICANTS.sort(compareEthnicity);
	if(this.previousSibling.nodeValue=="Age")
		APPLICANTS.sort(compareAge);
	if(this.previousSibling.nodeValue=="Date Added")
		APPLICANTS.sort(compareDate);
	if(this.style.transform!="rotateX(180deg)"){
		this.style.transform= "rotateX(180deg)";
	}else{
		this.style.transform= "rotateX(360deg)";
		APPLICANTS.reverse();
	}
	while(table.rows.length > 1) {
		  table.deleteRow(1);
	}
	drawRows();
});

function dropDownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myDropdown").left="300px";
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

