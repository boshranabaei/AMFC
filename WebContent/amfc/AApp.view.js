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
								items: [new sap.ui.core.Item({text: "male"}),
												new sap.ui.core.Item({text: "female"})]
							}),
							new sap.m.Label({text:"Marital Status"}),
							new sap.ui.commons.DropdownBox("maritalStatus",{
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
							new sap.ui.core.Title({text:"Personal Data"}),
							new sap.m.Label({text:"ethnicity"}),
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