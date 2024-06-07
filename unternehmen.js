// Timeline Slider
function initTimelineSlider() {
	const timelineSlider = new Swiper(".swiper.timeline-slider", {
		breakpoints: {
			360: {
				slidesPerView: 1.5,
				spaceBetween: 64,
				centeredSlides: true,
			},
			768: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 2,
			},
			1600: {
				slidesPerView: 2.33,
			},
		},
		centeredSlides: true,
		grabCursor: true,
		freeMode: {
			enabled: false,
			// momentumRatio: 0.5,
		},
		on: {
			slideChange: function () {
				const activeIndex = this.activeIndex;
				updateActiveElements(activeIndex);
			},
		},
	});

	// Fix fade overlay dom hierarchy
	$(".timeline-fade").appendTo(".timeline-slider");

	const $timelineYears = $(".timeline-year");
	const $yearContentContainer = $(".year-content-container");
	const $yearContentItem = $(".year-content-item");
	const $closeYearButtons = $(".x-close-year");
	const timelineArrowHover = $(".timeline .arrow-hover");
	var activeIndex = -1;

	// Show arrow while hovering on Desktop
	if ($(window).width() > 992) {
		$(".timeline-slider").on("mousemove", function (e) {
			timelineArrowHover.css({
				top: e.clientY,
				left: e.clientX,
				transform: "translate(-50%, -50%)",
				opacity: "1",
			});
		});

		$(".timeline-slider").on("mouseleave", function () {
			timelineArrowHover.css({ opacity: "0" });
		});
	}

	$timelineYears.on("click", function () {
		var index = $timelineYears.index(this);
		if (activeIndex === index) {
			// Scenario 1: Same active element is clicked again
			removeActiveElement();
			activeIndex = -1; // Reset activeIndex
		} else {
			// Scenario 2: Different timeline-year is clicked
			timelineSlider.slideTo(index, 800);
			removeActiveElement();
			$(this).addClass("active");
			$yearContentContainer.addClass("active");
			$timelineYears.css("transform", "translateY(-10%) scale(0.8)");
			$yearContentItem.eq(index).addClass("active");
			activeIndex = index;
		}
	});

	$closeYearButtons.on("click", function () {
		removeActiveElement();
		activeIndex = -1; // Reset activeIndex
	});

	function removeActiveElement() {
		$timelineYears.removeClass("active");
		$yearContentContainer.removeClass("active");
		$yearContentItem.removeClass("active");
		$timelineYears.css("transform", ""); // Reset transform
	}

	function updateActiveElements(activeIndex) {
		removeActiveElement(); // Clear previous active elements
		const $activeTimelineYear = $timelineYears.eq(activeIndex);
		const $activeContentItem = $yearContentItem.eq(activeIndex);

		$activeTimelineYear.addClass("active");
		$yearContentContainer.addClass("active");
		$activeContentItem.addClass("active");
		$timelineYears.css("transform", "translateY(-10%) scale(0.8)");
	}

	$closeYearButtons.on("click", function () {
		removeActiveElement();
		$yearContentContainer.removeClass("active");
	});
}

Webflow.push(function () {
	initTimelineSlider();
});
