sap.ui.jsview("amfc.CApp", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf amfc.CApp
	 */
	getControllerName : function() {
		return "amfc.CApp";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf amfc.CApp
	 */
	createContent : function(oController) {

		this.CAppData = APPLICANTS;
			
			/*[ {
			firstName : "Hamed",
			lastName : "Soltani",
			birthDate : "1980-05-03",
			nationality : "Iranian",
			status:"busy",
			candidates : "(3) Edit"
		}, {
			firstName : "Ahmad",
			lastName : "Habib",
			birthDate : "1992-07-19",
			nationality : "Iraqi",
			status:"free",
			candidates : "(0) Edit"
		}, {
			firstName : "Amal",
			lastName : "Awal",
			birthDate : "1986-08-30",
			nationality : "Lebenies",
			status:"free",
			candidates : "(1) Edit"
		} ];*/

		this.CAppTable = new sap.ui.table.Table(this.createId("tablle"), {
			visibleRowCount : 4,
			fixedColumnCount : 5,
			setSelectionBehavior : sap.ui.table.SelectionBehavior.RowOnly,
			width : "800px",
		});

		this.CAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "First Name"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text",
					"firstName"),
			sortProperty : "firstName",
			filterProperty : "firstName",
			width : "120px"
		}));

		this.CAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Last Name"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text",
					"lastName"),
			sortProperty : "lastName",
			filterProperty : "lastName",
			width : "120px"
		}));

		this.CAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Birth Date"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text",
					"birthDate"),
			sortProperty : "birthDate",
			filterProperty : "birthDate",
			width : "120px"
		}));

		this.CAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Ethnicity"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text",
					"ethnicity"),
			sortProperty : "ethnicity",
			filterProperty : "ethnicity",
			width : "120px"
		}));


		this.CAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Status"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text",
					"status"),
			sortProperty : "status",
			filterProperty : "status",
			width : "120px"
		}));
		
//		this.CAppTable.addColumn(new sap.ui.table.Column({
//			label : new sap.ui.commons.Label({
//				text : "Candidates"
//			}),
//			template : new sap.m.Button(this.createId("list"), {
//				text : "Edit",
//				press : function() {
//				}
//			}).bindProperty("text", "candidates"),
//			width : "120px"
//		}));

		this.CAppModel = new sap.ui.model.json.JSONModel();
		this.CAppModel.setData({
			modelData : this.CAppData
		});
		this.CAppTable.setModel(this.CAppModel);
		this.CAppTable.bindRows("/modelData");

		var placeHolderCApp1 = new sap.ui.commons.Label(this
				.createId("placeHolderCApp1"), {
			width : "40px"
		});
		
		var filterLabel = new sap.m.Label(this.createId("filterLabel"), {
			text : "Heelo",
			design : sap.m.LabelDesign.Bold
		});

		var filterVBox = new sap.m.VBox(this.createId("filterVBox"))
				.setAlignItems("Center");
		filterVBox.addItem(filterLabel);

		return new sap.m.HBox().addItem(filterVBox).addItem(placeHolderCApp1)
				.addItem(this.CAppTable);

	}

});