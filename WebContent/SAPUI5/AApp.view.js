sap.ui.jsview("amfc.AApp", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf amfc.AApp
	 */
	getControllerName : function() {
		return "amfc.AApp";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf amfc.AApp
	 */
	createContent : function(oController) {

		var required = new sap.m.Label({
			text : "* Required Fields"
		})
		
		var oSimpleForm = new sap.ui.layout.form.SimpleForm("sf1", {
			layout : sap.ui.layout.form.SimpleFormLayout.GridLayout,
			editable : true,
			content : [ new sap.ui.core.Title({
				text : "Personal Data"
			}), new sap.m.Label({
				text : "* First Name"
			}), new sap.m.Input({}), // 2
			new sap.m.Label({
				text : "* Last Name"
			}), new sap.m.Input({}), // 4
			new sap.m.Label({
				text : "* Date of birth"
			}), new sap.m.DatePicker({
				yyyymmdd : "19900101"
			}), // 6
			new sap.m.Label({
				text : "* Gender"
			}), new sap.m.RadioButtonGroup({// 8
				columns : 2,
				buttons : [ new sap.m.RadioButton({
					text : "male"
				}), new sap.m.RadioButton({
					text : "female"
				}) ]
			}), new sap.m.Label({
				text : "* Marital Status"
			}), new sap.m.ComboBox("maritalStatus", {// 10
				items : [ new sap.ui.core.ListItem({
					id : "single",
					text : "single"
				}), new sap.ui.core.ListItem({
					id : "divorced",
					text : "divorced"
				}), new sap.ui.core.ListItem({
					id : "widowed",
					text : "widowed"
				}), new sap.ui.core.ListItem({
					id : "separated",
					text : "separated"
				}) ],
			}), new sap.m.Label({
				text : "* Number of children if not single"
			}), new sap.m.Input({
				id : "children", // 12
				value : 0
			}), new sap.m.Label({
				text : "* Ethnicity"
			}), new sap.m.Input({}), // 14
				new sap.m.Label({
				text : "Citizenship"
			}), new sap.m.Input({}), // 16
				new sap.m.Label({
				text : "Willing to Relocate"
			}), new sap.m.RadioButtonGroup({ // 18
				columns : 2,
				buttons : [
				    new sap.m.RadioButton({
				    text : "Not willing to Share"
				}), new sap.m.RadioButton({
					text : "Yes"
				}), new sap.m.RadioButton({
					text : "No"
				}) ]
			}), new sap.m.Label({
				text : "* Has/Wants Hijab"
			}),new sap.m.ComboBox("hijab", {// 20
				items : [ new sap.ui.core.ListItem({
					id : "Yes",
					text : "Yes"
				}), new sap.ui.core.ListItem({
					id : "Opentoboth",
					text : "Open to both"
				}), new sap.ui.core.ListItem({
					id : "No",
					text : "No"
				}), ],
			}), 
				new sap.m.Label({
				text : "Smoke"
			}), new sap.m.RadioButtonGroup({ //22
				columns : 2,
				buttons : [ 
				    new sap.m.RadioButton({
				    text : "Not willing to Share"
				}), new sap.m.RadioButton({
					text : "Yes"
				}), new sap.m.RadioButton({
					text : "No"
				}) ]
			}), new sap.m.Label({
				text : "Highest Level of Education" 
			}), new sap.m.ComboBox("education", {//24
				items : [ new sap.ui.core.ListItem({
					id : "PrimarySchool",
					text : "Primary School"
				}), new sap.ui.core.ListItem({
					id : "SecondarySchool",
					text : "Secondary School"
				}), new sap.ui.core.ListItem({
					id : "CollegeDiploma",
					text : "College Diploma"
				}), new sap.ui.core.ListItem({
					id : "Bachelors",
					text : "Bachelors"
				}), new sap.ui.core.ListItem({
					id : "Masters",
					text : "Masters"
				}), new sap.ui.core.ListItem({
					id : "PhD",
					text : "PhD"
				}) ],
			}), new sap.m.Label({
				text : "Occupation"
			}), new sap.m.Input({}),//26 
			new sap.m.Label({
				text : "More information about occupation"
			}), new sap.m.TextArea({}),//28 
			new sap.ui.core.Title({
				text : "Contact Info"
			}), new sap.m.Label({
				text : "* Email"
			}), new sap.m.Input({//31
			}), new sap.m.Label({
				text : "* Phone Number (mobile)"
			}), new sap.m.Input({//33
			}), new sap.m.Label({
				text : "Phone Number (home)"
			}), new sap.m.Input({//35
			}), new sap.m.Label({
				text : "* City"
			}), new sap.m.Input({//37
			}), new sap.m.Label({
				text : "* Province"
			}), new sap.m.Input({//39
			}), new sap.m.Label({
				text : "* Country"
			})
			, new sap.m.Input({//41
			}), new sap.ui.core.Title({
				text : "Preferred Match"
			}), new sap.m.Label({
				text : "* Preferred Marital Status"
			}), new sap.m.ComboBox("prefMaritalStatus", {//44
				items : [ new sap.ui.core.ListItem({
					id : "neverMarried",
					text : "Never Married"
				}), new sap.ui.core.ListItem({
					id : "DoesNotMatter",
					text : "Does Not Matter"
				}), ],
			}), new sap.m.Label({
				text : "Preferred Ethnicity"
			}), new sap.m.Input({//46
			}), new sap.m.Label({
				text : "Preferred Citizenship"
			}), new sap.m.Input({//48
			}), new sap.m.Label({
				text : "Minimum Level of Education"
			}), new sap.m.ComboBox("prefEducation", {//50
				items : [ new sap.ui.core.ListItem({
					id : "prefPrimarySchool",
					text : "Primary School"
				}), new sap.ui.core.ListItem({
					id : "prefSecondarySchool",
					text : "Secondary School"
				}), new sap.ui.core.ListItem({
					id : "prefCollegeDiploma",
					text : "College Diploma"
				}), new sap.ui.core.ListItem({
					id : "prefBachelors",
					text : "Bachelors"
				}), new sap.ui.core.ListItem({
					id : "prefMasters",
					text : "Masters"
				}), new sap.ui.core.ListItem({
					id : "prefPhD",
					text : "PhD"
				}) ]
			}), new sap.m.Label({
				text : "Preferred Age, from"
			}), new sap.m.Input({//52
			}), new sap.m.Label({
				text : "to"
			}), new sap.m.Input({//54
			}), new sap.ui.core.Title({
				text : "Other Information"
			}), new sap.m.Label({
				text : "* AMFC point of contact"
			}), new sap.m.Input({//57
			}), new sap.m.Label({
				text : "Addtional Comments"
			}), new sap.m.TextArea({//59
			}) ]
		});

		var submitBtn = new sap.m.Button(this.createId("submitBtn"), {
			text : "Submit",
			width : "20em",
			press : function() {
				var content = oSimpleForm.getContent();
				
				if(content[2].getValue()==""  || content[4].getValue()=="" ||
				   content[6].getValue()==""  || content[10].getValue()=="" ||
				   content[14].getValue()=="" || content[20].getValue()=="" ||
				   content[31].getValue()=="" || content[33].getValue()=="" ||
				   content[37].getValue()=="" || content[39].getValue()=="" ||
				   content[44].getValue()=="" || content[57].getValue()==""){
					sap.m.MessageBox.warning("Please fill in the required fields.",{
						title: "Incomplete data",
						actions : [sap.m.MessageBox.Action.OK]
					});
				}
				else if(content[52].getValue()!="" && content[54].getValue()!="" && content[52].getValue()>content[54].getValue()){
						sap.m.MessageBox.warning("Wrong age range for the prefered match.",{
							title: "Wrong data",
							actions : [sap.m.MessageBox.Action.OK]
						});
				}
				else{
				sap.m.MessageBox.confirm(
						"Are your sure that you want to add this applicant?", {
							title : "Confirmation",
							actions : [ sap.m.MessageBox.Action.NO,
									sap.m.MessageBox.Action.YES ],
							onClose : function(oAction) {
								if(oAction === sap.m.MessageBox.Action.YES){
									var json = "{";
									for (var i = 0; i < formIndexes.length; i++) {
											json += "\'" + formLabels[i] + "\':";
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
												json += "\'"+ content[formIndexes[i]].getValue() + "\'";break;
											}
											if(i!=formIndexes.length-1){
												json += ",";
											}
									}
									json += "}";
//									sap.m.MessageToast.show(json, {});
									oController.addApplicant(json);
										
								}
							}
						})
			}}
		});

		var formIndexes = [ 2, 4, 6, 8, 10,
		                    12, 14, 16, 18, 
		                    20, 22, 24, 26,
		                    28, 31, 33, 35,
		                    37, 39, 41, 44,
		                    46, 48, 50, 52, 54,57,59];
		var formLabels = [ "firstName", "lastName", "dateOfBirth", "gender", "maritalStatus", 
		                   "children", "ethnicity", "citizenship",	"relocate", 
		                   "hasORwantsHijab", "smoke", "education", "occupation",
		                   "occupationComments","email","mobilePhoneNumber","homePhoneNumber",  
		                   "city", "province", "country","prefMaritalStatus", 
		                   "prefEthnicity","prefCitizenship","prefEducation","prefAgeMin","prefAgeMax",  
		                   "pointOfContact", "comments"];

		return new sap.m.VBox(this.createId("formVBox")).addItem(submitBtn).addItem(required).addItem(oSimpleForm);
				

	}

});