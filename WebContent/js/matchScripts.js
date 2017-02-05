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
	for (var i = 1; i <  APPLICANTS.length; i++){
	    var tr = document.createElement('tr');   
	
	    var td1 = document.createElement('td');
	    var td2 = document.createElement('td');
	
	    var text1 = document.createTextNode('Text1');
	    var text2 = document.createTextNode('Text2');
	
	    td1.appendChild(text1);
	    td2.appendChild(text2);
	    tr.appendChild(td1);
	    tr.appendChild(td2);
	
	    table.appendChild(tr);
	}
	document.body.appendChild(table);
}