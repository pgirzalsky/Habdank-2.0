// Convert dates to German local
function initDateConversion() {
	const data = {
		months: {
			en: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
			local: [],
		},
		days: {
			en: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			],
			local: [],
		},
	};

	data.months.local = [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember",
	];

	if (data.months.local.length !== 12) {
		console.error("Months are incorrect! Check your script.");
	}

	const shortenDaysMonths = (daymonth) => daymonth.substring(0, 3);
	const convertToLocal = (daydate, whatToConvert) => {
		whatToConvert.each(function () {
			const theObject = $(this);
			let text = theObject.text();

			if (daydate === "m" || daydate === "month" || daydate === "months") {
				for (let i = 0; i < data.months.en.length; i++) {
					text = text.replace(data.months.en[i], data.months.local[i]);
					text = text.replace(
						shortenDaysMonths(data.months.en[i]),
						shortenDaysMonths(data.months.local[i])
					);
					theObject.text(text);
				}
			}
		});
	};

	const allDates = $(".date-month");

	convertToLocal("m", allDates);
}

Webflow.push(function () {
	initDateConversion();
});
