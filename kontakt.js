function initFormFunctions() {
	$("select option:first-child").attr("disabled", "disabled");

	UPLOADCARE_LOCALE = "de";
	UPLOADCARE_LOCALE_TRANSLATIONS = {
		buttons: {
			choose: {
				files: {
					other: "Dateien anhängen",
				},
			},
		},
	};
	UPLOADCARE_PUBLIC_KEY = "397a47e71a17b411a895";
	UPLOADCARE_SYSTEM_DIALOG = "true";
}

Webflow.push(function () {
	initFormFunctions();
});
