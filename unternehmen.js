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

	$(".timeline-fade").each(function () {
		$(this).appendTo($(this).prev(".timeline-slider"));
	});

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

// Testimonial Sliders
function initTestimonialSliders() {
	const progressBar = document.querySelector(".progress");

	// Configuration for each swiper
	const swiperConfigs = [
		{
			selector: ".swiper.testimonial-image-slider.first",
			initialSlide: 0,
			yPercent: { initial: -8, final: 8 },
		},
		{
			selector: ".swiper.testimonial-image-slider.last",
			initialSlide: 1,
			yPercent: { initial: -8, final: 8 },
		},
	];

	function testimonialSliders(config) {
		const swiper = new Swiper(config.selector, {
			loop: true,
			speed: 1200,
			autoplay: {
				delay: 6000,
			},
			allowTouchMove: false,
			initialSlide: config.initialSlide,
			on: {
				touchStart: function () {
					for (var a = 0; a < this.slides.length; a++)
						this.slides[a].style.transition = "";
				},
				setTransition: function (a) {
					for (var b = 0; b < this.slides.length; b++) {
						this.slides[b].style.transition = a + "ms";
						this.slides[b].querySelector("img").style.transition = a + "ms";
					}
				},
			},
			pagination: {
				el: ".swiper-pagination.last",
				clickable: true,
			},
			breakpoints: {
				320: {
					pagination: {
						el: ".swiper-pagination.first",
					},
				},
				768: {
					pagination: {
						el: ".swiper-pagination.last",
					},
				},
			},
		});

		gsap.fromTo(
			swiper.slides.map((slide) => slide.querySelector(".slider-image")),
			{
				yPercent: config.yPercent.initial,
			},
			{
				yPercent: config.yPercent.final,
				ease: "none",
				scrollTrigger: {
					trigger: ".testimonials .image-sliders-container",
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			}
		);

		return swiper;
	}

	const testimonialImageSliderFirst = testimonialSliders(swiperConfigs[0]);
	const testimonialImageSliderLast = testimonialSliders(swiperConfigs[1]);

	const testimonialQuoteSlider = new Swiper(
		".swiper.testimonial-quote-slider",
		{
			loop: true,
			speed: 1200,
			allowTouchMove: false,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			initialSlide: 0,
			pagination: {
				el: ".swiper-pagination.last",
				clickable: true,
			},
			breakpoints: {
				320: {
					pagination: {
						el: ".swiper-pagination.first",
					},
				},
				768: {
					pagination: {
						el: ".swiper-pagination.last",
					},
				},
			},
		}
	);

	// Synchronize Sliders
	testimonialImageSliderFirst.controller.control = testimonialImageSliderLast;
	testimonialImageSliderFirst.controller.control = testimonialQuoteSlider;

	testimonialImageSliderLast.on("click", function () {
		testimonialImageSliderFirst.slideNext();
		testimonialImageSliderLast.slideNext();
	});

	testimonialImageSliderFirst.on("click", function () {
		testimonialImageSliderFirst.slidePrev();
		testimonialImageSliderLast.slidePrev();
	});

	$(".swiper-pagination").on("click", ".swiper-pagination-bullet", function () {
		const index = $(this).index();
		// Slide all sliders to the corresponding index
		testimonialImageSliderFirst.slideToLoop(index);
		testimonialQuoteSlider.slideToLoop(index);
		// Calculate the index for testimonialImageSliderLast considering looped behavior
		const lastIndex =
			index === testimonialImageSliderFirst.slides.length - 1 ? 0 : index + 1;
		testimonialImageSliderLast.slideToLoop(lastIndex);
	});

	// Show arrow while hovering on Desktop
	if ($(window).width() > 992) {
		const testimonialsArrowHover = $(".testimonials .arrow-hover");

		$(".testimonial-image-slider.first").on("mousemove", function (e) {
			testimonialsArrowHover.css({
				top: e.clientY,
				left: e.clientX,
				transform: "translate(-50%, -50%) rotate(180deg)",
				opacity: "1",
			});
		});

		$(".testimonial-image-slider.last").on("mousemove", function (e) {
			testimonialsArrowHover.css({
				top: e.clientY,
				left: e.clientX,
				transform: "translate(-50%, -50%)",
				opacity: "1",
			});
		});

		$(".testimonial-image-slider.first, .testimonial-image-slider.last").on(
			"mouseleave",
			function () {
				// Set opacity to 0 when not hovering
				testimonialsArrowHover.css({ opacity: "0" });
			}
		);
	}
}

Webflow.push(function () {
	initTimelineSlider();
	initTestimonialSliders();
});
