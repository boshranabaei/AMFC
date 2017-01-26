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

		var oSimpleForm = new sap.ui.layout.form.SimpleForm("sf1", {
			layout : sap.ui.layout.form.SimpleFormLayout.GridLayout,
			editable : true,
			content : [ new sap.ui.core.Title({
				text : "Personal Data"
			}), new sap.m.Label({
				text : "First Name"
			}), new sap.m.Input({}), // 2
			new sap.m.Label({
				text : "Last Name"
			}), new sap.m.Input({}), // 4
			new sap.m.Label({
				text : "Date of birth"
			}), new sap.m.DatePicker({
				yyyymmdd : "19900101"
			}), // 6
			new sap.m.Label({
				text : "Gender"
			}), new sap.m.RadioButtonGroup({// 8
				columns : 2,
				buttons : [ new sap.m.RadioButton({
					text : "male"
				}), new sap.m.RadioButton({
					text : "female"
				}) ]
			}), new sap.m.Label({
				text : "Marital Status"
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
				change : function() {
					var x = this.getSelectedItemId();
				}
			}), new sap.m.Label({
				text : "Number of children if not single"
			}), new sap.m.Input({
				id : "children",
				value : 0
			}), new sap.m.Label({
				text : "Ethnicity"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Citizenship"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Willing to Relocate"
			}), new sap.m.RadioButtonGroup({
				columns : 2,
				buttons : [ new sap.m.RadioButton({
					text : "Yes"
				}), new sap.m.RadioButton({
					text : "No"
				}) ]
			}), new sap.m.Label({
				text : "Has/Wants Hijab"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Smoke"
			}), new sap.m.RadioButtonGroup({
				columns : 2,
				buttons : [ new sap.m.RadioButton({
					text : "Yes"
				}), new sap.m.RadioButton({
					text : "No"
				}) ]
			}), new sap.m.Label({
				text : "Highest Level of Education"
			}), new sap.m.ComboBox("education", {
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
				change : function() {
					var x = this.getSelectedItemId();
				}
			}), new sap.m.Label({
				text : "Occupation"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "More information about occupation"
			}), new sap.m.TextArea({}), new sap.ui.core.Title({
				text : "Contact Info"
			}), new sap.m.Label({
				text : "Email:"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Phone Number (mobile)"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Phone Number (home)"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "City"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Province"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Country"
			}), new sap.m.Input({}), new sap.ui.core.Title({
				text : "Preferred Match"
			}), new sap.m.Label({
				text : "Preferred Marital Status"
			}), new sap.m.ComboBox("prefMaritalStatus", {
				items : [ new sap.ui.core.ListItem({
					id : "neverMarried",
					text : "Never Married"
				}), new sap.ui.core.ListItem({
					id : "DoesNotMatter",
					text : "Does Not Matter"
				}), ],
				change : function() {
					var x = this.getSelectedItemId();
				}
			}), new sap.m.Label({
				text : "Preferred Ethnicity"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Preferred Citizenship"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Minimum Level of Education"
			}), new sap.m.ComboBox("prefEducation", {
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
				}) ],
				change : function() {
					var x = this.getSelectedItemId();
				}
			}), new sap.m.Label({
				text : "Preferred Age, from"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "to"
			}), new sap.m.Input({}), new sap.ui.core.Title({
				text : "Other Information"
			}), new sap.m.Label({
				text : "AMFC point of contact"
			}), new sap.m.Input({}), new sap.m.Label({
				text : "Addtional Comments"
			}), new sap.m.TextArea({}) ]
		});

		var submitBtn = new sap.m.Button(this.createId("submitBtn"), {
			text : "Submit",
			press : function() {
				sap.m.MessageBox.confirm(
						"Are your sure that you want to add this applicant?", {
							title : "Confirmation",
							actions : [ sap.m.MessageBox.Action.NO,
									sap.m.MessageBox.Action.YES ],
							onClose : function(oAction) {
								var content = oSimpleForm.getContent();
								var json = "[";
								for (var i = 0; i < formIndexes.length; i++) {
									json += "\"" + formLabels[i] + "\":";
									switch(formIndexes[i]){
									case 8:
										json += "\"" + content[formIndexes[i]]
										.getSelectedIndex() + "\",";break;
									case 16:
										json += "\"" + content[formIndexes[i]]
										.getSelectedKey() + "\",";break;
									default:
									json +=	 "\"" + content[formIndexes[i]]
									.getValue() + "\",";
									}
								}
								json +="]";
								sap.m.MessageToast.show(json, {});

								// if(oAction === sap.m.MessageBox.Action.YES)
								// sap.m.MessageToast.show("Applicant is added
								// successfully", {});
							}
						})
			}
		});

		var formIndexes = [ 2, 4, 6, 8, 10 ];
		var formLabels = [ "firstName", "lastName", "dateOfBirth","gender",
		        "maritalStatus","hasORwantsHijab", "city", "province", "country", "ethnicity",
				"citizenship", "children", "occupation",
				"occupationComments", "education", "smoke", "relocate",
				"prefMaritalStatus", "prefEducation", "prefCitizenship",
				"prefCountry", "prefEthnicity", "prefAgeMin", "prefAgeMax",
				"homePhoneNumber", "mobilePhoneNumber", "email",
				"pointOfContact", "comments", "approvalStatus", "status" ];

		return new sap.m.VBox(this.createId("formVBox")).addItem(oSimpleForm)
				.addItem(submitBtn);

	}

});