var fieldLabels =[ [ "firstName", "lastName", "dateOfBirth", "gender", "ethnicity", "citizenship","maritalStatus", 
		                   "children", "smoke", "hasORwantsHijab", "relocate", "relocateWhere", "education", "occupation",
		                   "occupationComments","email","mobilePhoneNumber","homePhoneNumber",  "pointOfContact", 
		                   "city", "province", "country","prefMaritalStatus", "prefAgeMin","prefAgeMax",  
		                   "prefEthnicity", "prefEducation", "prefComments"
		                   "amfcPointOfContact"], [ "firstName", "lastName", "dateOfBirth", "gender", "ethnicity", "citizenship","maritalStatus", 
		                   "children", "smoke", "hasORwantsHijab", "relocate", "relocateWhere", "education", "occupation",
		                   "occupationComments","email","mobilePhoneNumber","homePhoneNumber",  "pointOfContact", 
		                   "city", "province", "country","prefMaritalStatus", "prefAgeMin","prefAgeMax",  
		                   "prefEthnicity", "prefEducation", "prefComments"
		                   "amfcPointOfContact"], [ "firstName", "lastName", "dateOfBirth", "gender", "ethnicity", "citizenship","maritalStatus", 
		                   "children", "smoke", "hasORwantsHijab", "relocate", "relocateWhere", "education", "occupation",
		                   "occupationComments","email","mobilePhoneNumber","homePhoneNumber",  "pointOfContact", 
		                   "city", "province", "country","prefMaritalStatus", "prefAgeMin","prefAgeMax",  
		                   "prefEthnicity", "prefEducation", "prefComments"
		                   "amfcPointOfContact"];

var formIndexes = [ 2, 4, 6, 8, 10,
                    12, 14, 16, 18, 
                    20, 22, 24, 26,
                    28, 31, 33, 35,
                    37, 39, 41, 44,
                    46, 48, 50, 52, 54,57,59];

addApplicant : function(applicantFormData) {
		$.ajax({
			type : "POST",
			url : "/applicant",
			dataType : "json",
			data : {
				"applicant" : applicantFormData,
				"task" : "newApplicant"
			},
			success : function(data) {
				if (data.mission=="accomplished") {
					alert("The new applicant is added successfully");
					return true;
				}
				else{
					return false;
				}
			},
			error : function() {
				alert("Server Error");
				return false;
			}
		});
	};

submitApplicant : function() {

				var content = document.forms[0].elements;
				
//				if(content[2].getValue()==""  || content[4].getValue()=="" ||
//				   content[6].getValue()==""  || content[10].getValue()=="" ||
//				   content[14].getValue()=="" || content[20].getValue()=="" ||
//				   content[31].getValue()=="" || content[33].getValue()=="" ||
//				   content[37].getValue()=="" || content[39].getValue()=="" ||
//				   content[44].getValue()=="" || content[57].getValue()==""){
//					alert("Please fill in the required fields.");
//				}
//				else if(content[52].getValue()!="" && content[54].getValue()!="" && content[52].getValue()>content[54].getValue()){
//						alert("Wrong age range for the prefered match.");
//				}
//				else{
					alert("Are your sure that you want to add this applicant?");
					var json = "{";

				for(var c=0;c<3;c++){
					for (var i = 0; i < fieldLabels[c].length; i++) {
						json += "\'" + fieldLabels[c][i] + "\':";
						switch (formIndexes[i]) {
						// integer
						case 12:
						case 52:
						case 54:
							if(content[formIndexes[i]].getValue()==""){
								json += 0; break;
							}
							else{
								json += content[formIndexes[i]].getValue(); break;
							}
						// radio button
						case 8:
						case 18:
						case 22:
							json += content[formIndexes[i]].getSelectedIndex();break;

						default:
							json += "\'"+ ontent[c].elements[i].value + "\'";break;

						}
					}
				}

						
						}
						if(i!=formIndexes.length-1){
							json += ",";
						}
					json += "}";
					addApplicant(json);
//				}
		};



