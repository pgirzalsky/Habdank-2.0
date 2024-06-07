function initProjectFilters() {
	// Function to create show animation timeline
	function createShowTimeline(element) {
		return gsap
			.timeline()
			.set(element, { display: "flex" }) // Set display to flex before animation
			.fromTo(
				element,
				{ scale: 0, opacity: 0 },
				{ duration: 0.3, scale: 1, opacity: 1, ease: "power2.out" }
			);
	}

	// Function to create hide animation timeline
	function createHideTimeline(element) {
		return gsap
			.timeline()
			.to(element, { duration: 0.3, scale: 0, opacity: 0, ease: "power2.out" })
			.set(element, { display: "none" }); // Set display to none after animation
	}

	// Handle filter trigger clicks using event delegation
	$(document).on("click", ".filter-trigger", function (event) {
		// Prevent event propagation to avoid any unwanted behavior
		event.stopPropagation();

		// Get the associated dropdown list
		let dropdown = $(this).find(".dropdown-list");
		let filterDropdown = dropdown.prev(".filter-dropdown");

		// Toggle the dropdown list
		if (dropdown.is(":visible")) {
			// Hide the associated dropdown list if it is already visible
			createHideTimeline(dropdown);
			filterDropdown.removeClass("active");
		} else {
			// Hide all visible dropdown lists with animation
			$(".dropdown-list:visible").each(function () {
				createHideTimeline($(this));
				$(this).prev(".filter-dropdown").removeClass("active");
			});

			// Show the associated dropdown list with animation
			createShowTimeline(dropdown);
			filterDropdown.addClass("active");
		}
	});

	// Prevent dropdown list from hiding when clicking inside it
	$(document).on("click", ".dropdown-list", function (event) {
		event.stopPropagation();
	});

	// Prevent dropdown list from hiding when clicking on a checkbox within the dropdown
	$(document).on(
		"click",
		".dropdown-list input[type='checkbox']",
		function (event) {
			event.stopPropagation();
		}
	);

	// Hide dropdown list if clicking outside of the dropdown list itself
	$(document).click(function (event) {
		if (!$(event.target).closest(".dropdown-list").length) {
			$(".dropdown-list:visible").each(function () {
				createHideTimeline($(this));
				$(this).prev(".filter-dropdown").removeClass("active");
			});
		}
	});

	$(".filter-checkbox-item").change(function () {
		// Select the element with attribute fs-cmsfilter-element="empty"
		var emptyElement = $("[fs-cmsfilter-element='empty']");

		// Check if it doesn't have the style display: none
		if (!emptyElement.is(":hidden")) {
			// If it doesn't have display: none, set margin-top of element with id "all-projects" to 0
			$("#all-projects").css("margin-top", "0");
		}
	});
}

// Hero Animation
const hero = gsap.timeline();

if ($(window).width() > 540) {
	hero.set(".once-in", {
		opacity: 0,
		y: "50vh",
	});
} else {
	hero.set(".once-in", {
		opacity: 0,
		y: "10vh",
	});
}

function initHeroAnimation() {
	hero.from(".hero .split-char", {
		y: "100%",
		stagger: 0.02,
		rotation: 4,
		ease: "power4.out",
		duration: 0.85,
	});

	/*
	hero.from(".split-char-inner", {
		y: "100%",
		duration: 1.2,
		ease: "power3.out",
		clearProps: true,
	});
  */

	hero.to(
		".once-in",
		{
			y: "0vh",
			opacity: 1,
			duration: 1.2,
			stagger: 0.07,
			ease: "power3.out",
			clearProps: true,
		},
		"<"
	);

	master.add(pl);

	if (sessionStorage.getItem("visited") == null) {
		master.add(hero, "-=1");
		sessionStorage.setItem("visited", "true");
	} else {
		master.add(hero, "-=.4");
	}
	master.play();
}

Webflow.push(function () {
	initHeroAnimation();
	initProjectFilters();
});
