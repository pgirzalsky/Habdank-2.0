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
				delay: 5000,
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

	// Stop autoplay initialy
	testimonialImageSliderFirst.autoplay.stop();
	testimonialImageSliderLast.autoplay.stop();

	// Start autoplay when coming into view
	ScrollTrigger.create({
		trigger: ".testimonial-quote-slider",
		start: "top 80%",
		onEnter: () => {
			testimonialImageSliderFirst.autoplay.start();
			testimonialImageSliderLast.autoplay.start();
			$(".progress-bar").removeClass("paused");
		},
		onLeaveBack: () => {
			testimonialImageSliderFirst.autoplay.stop();
			testimonialImageSliderLast.autoplay.stop();
			$(".progress-bar").addClass("paused");
		},
	});

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
	    initArrowHover(".testimonial-image-slider.first", ".testimonial-image-slider.first .arrow-hover");
	    initArrowHover(".testimonial-image-slider.last", ".testimonial-image-slider.last .arrow-hover");
	}
}

// News Slider
function initNewsSlider() {
    // Initialize Swiper
    const newsSlider = new Swiper(".swiper.news-slider", {
        speed: 1200,
        grabCursor: true,
        touchEventsTarget: "container",
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 32,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 40,
            },
            1600: {
                slidesPerView: 2.33,
                spaceBetween: 40,
            },
        },
    });
}

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

// Hero Animation
function initHeroAnimation() {
	const hero = gsap.timeline();

	hero.from(".hero img", {
		y: "100px",
		opacity: 0,
		duration: 1,
		ease: "power4.out",
		clearProps: true,
	});

	hero.from(
		".hero h1 .split-line-inner",
		{
			y: "100%",
			duration: 0.8,
			stagger: {
				each: 0.1,
				from: "end",
			},
			ease: "power3.out",
			clearProps: true,
		},
		"<+0.1"
	);

	hero.from(
		".hero-home-text .split-line-inner",
		{
			y: "100%",
			duration: 0.8,
			stagger: {
				each: 0.02,
				from: "end",
			},
			ease: "power3.out",
			clearProps: true,
		},
		"<+0.1"
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
	initTestimonialSliders();
	initArrowHover(".jobs", ".jobs .arrow-hover");
	initNewsSlider();
    	initArrowHover(".news-item a", ".news .arrow-hover");
	initDateConversion();
	initHeroAnimation();
});
