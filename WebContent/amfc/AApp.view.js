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

		var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				"sf1",
				{
					layout: sap.ui.layout.form.SimpleFormLayout.GridLayout,
					editable: true,
					content:[
					        new sap.ui.core.Title({text:"Personal Data"}),
							new sap.m.Label({text:"First Name"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Last Name"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Date of birth"}),
							new sap.m.DatePicker({yyyymmdd:"19900101"}),
							new sap.m.Label({text:"Gender"}),
							new sap.m.RadioButtonGroup({
								columns: 2,
								buttons: [new  sap.m.RadioButton({text: "male"}),
										  new  sap.m.RadioButton({text: "female"})]
							}),
							new sap.m.Label({text:"Marital Status"}),
							new sap.m.ComboBox("maritalStatus",{
								items:[new sap.ui.core.ListItem({id:"single", text:"single"}),
						                new sap.ui.core.ListItem({id:"divorced", text:"divorced"}),
						                new sap.ui.core.ListItem({id:"widowed", text:"widowed"}),
										new sap.ui.core.ListItem({id:"separated", text:"separated"})
						            ],
								selectedItemId: "single",
								change: function(){
						                var x = this.getSelectedItemId();
						            }
							}),
							new sap.m.Label({text:"Number of children if not single"}),
							new sap.m.Input({id:"children", value:0}),
							new sap.m.Label({text:"Ethnicity"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Citizenship"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Highest Level of Education"}),
							new sap.m.ComboBox("education",{
								items:[new sap.ui.core.ListItem({id:"PrimarySchool", text:"Primary School"}),
						                new sap.ui.core.ListItem({id:"SecondarySchool", text:"Secondary School"}),
						                new sap.ui.core.ListItem({id:"PostSecondarySchool", text:"Post Secondary School"}),
						                new sap.ui.core.ListItem({id:"Bachelors", text:"Bachelors"}),
										new sap.ui.core.ListItem({id:"Masters", text:"Masters"}),
										new sap.ui.core.ListItem({id:"PhD", text:"PhD"})
						            ],
								change: function(){
							                var x = this.getSelectedItemId();
							            }
								}),
							new sap.m.Label({text:"Occupation"}),
							new sap.m.Input({}),
							new sap.ui.core.Title({text:"Contact Info"}),
							new sap.m.Label({text:"Email:"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Phone Number (mobile)"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Phone Number (home)"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"City"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Province"}),
							new sap.m.Input({}),
							new sap.m.Label({text:"Country"}),
							new sap.m.Input({}),
							new sap.ui.core.Title({text:"Personal Data"}),
					        new sap.m.Label({text:"ethnicity"}),
							new sap.m.Input({}),
							new sap.ui.core.Title({text:"Personal Data"}),
							new sap.m.Label({text:"ethnicity"}),
							new sap.m.Input({})
							]
				});
		
        return new sap.m.HBox(this.createId("formHBox")).addItem(oSimpleForm);

	}

});