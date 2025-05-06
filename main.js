// Test change
gsap.registerPlugin(ScrollTrigger);

let lenis;

function initLenis() {
	lenis = new Lenis({
		duration: 1,
	});

	lenis.on("scroll", ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
}

// SplitType
function initSplitType() {
	let windowWidth = window.innerWidth;
	var resizeTimer;
	let elementsToSplitLines = document.querySelectorAll(".split-lines");
	let elementsToSplitWords = document.querySelectorAll(".split-words");
	let elementsToSplitChars = document.querySelectorAll(".split-chars");

	let splitLines = new SplitType(elementsToSplitLines, {
		types: "lines",
		lineClass: "split-line",
	});

	let splitLineInner = document.querySelectorAll(".split-line");

	let splitLinesInner = new SplitType(splitLineInner, {
		types: "lines",
		lineClass: "split-line-inner",
	});

	let splitWords = new SplitType(elementsToSplitWords, {
		types: "words",
		wordClass: "split-word",
	});

	let splitWordInner = document.querySelectorAll(".split-word");

	let splitWordsInner = new SplitType(splitWordInner, {
		types: "word",
		wordClass: "split-word-inner",
	});

	let splitChars = new SplitType(elementsToSplitChars, {
		types: "words, chars",
		wordClass: "split-word",
		charClass: "split-char",
	});

	// SplitType resize

	window.addEventListener("resize", function () {
		if (windowWidth !== window.innerWidth) {
			windowWidth = window.innerWidth;
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				SplitType.revert(".split-line-inner");
				SplitType.revert(".split-line");
				SplitType.revert(".split-word-inner");
				SplitType.revert(".split-word");
				SplitType.revert(".split-char");
				initSplitType();
			}, 500);
		}
	});
}

// Prelaoder Grid
function initPreloaderGrid() {
	function drawDots() {
		// Get all horizontal and vertical lines
		var horizontalLines = $(".line.horizontal");
		var verticalLines = $(".line.vertical");

		// Iterate over each pair of lines
		horizontalLines.each(function () {
			var hTop = $(this).position().top;

			verticalLines.each(function () {
				var vLeft = $(this).position().left;

				// Create a new dot at the intersection
				$('<div class="cross"></div>')
					.css({
						top: hTop + "px",
						left: vLeft + "px",
					})
					.appendTo(".cross-container");
			});
		});
	}

	function removeDuplicates(array, key) {
		var result = [];
		var map = new Map();

		for (var item of array) {
			if (!map.has(item[key])) {
				map.set(item[key], true);
				result.push(item);
			}
		}
		return result;
	}

	function drawGrid() {
		// Clear previous lines and dots
		$(".horizontal-container, .vertical-container, .cross-container").empty();

		// Calculate line distance for both horizontal and vertical lines
		var distance = $(window).height() * 0.12;

		// Calculate the center of the y-axis and x-axis
		var centerY = $(window).height() / 2;
		var centerX = $(window).width() / 2;

		// Arrays to store the lines
		var horizontalLines = [];
		var verticalLines = [];

		// Draw horizontal lines
		var i = 0;
		while (
			centerY - i * distance >= 0 &&
			centerY + i * distance <= $(window).height()
		) {
			if (i % 2 === 0) {
				horizontalLines.push({
					top: centerY - i * distance,
					line: $('<div class="line horizontal"></div>'),
				});
				horizontalLines.push({
					top: centerY + i * distance,
					line: $('<div class="line horizontal"></div>'),
				});
			}
			i++;
		}

		// Draw vertical lines
		var j = 0;
		while (
			centerX - j * distance >= 0 &&
			centerX + j * distance <= $(window).width()
		) {
			if (j % 2 === 0) {
				verticalLines.push({
					left: centerX - j * distance,
					line: $('<div class="line vertical"></div>'),
				});
				verticalLines.push({
					left: centerX + j * distance,
					line: $('<div class="line vertical"></div>'),
				});
			}
			j++;
		}

		// Remove duplicates
		horizontalLines = removeDuplicates(horizontalLines, "top");
		verticalLines = removeDuplicates(verticalLines, "left");

		// Sort and append horizontal lines
		horizontalLines.sort((a, b) => a.top - b.top);
		for (let line of horizontalLines) {
			line.line.css("top", line.top + "px").appendTo(".horizontal-container");
		}

		// Sort and append vertical lines
		verticalLines.sort((a, b) => a.left - b.left);
		for (let line of verticalLines) {
			line.line.css("left", line.left + "px").appendTo(".vertical-container");
		}

		// Draw dots at intersections
		drawDots();
	}

	// Initial draw
	drawGrid();

	// Update on resize
	$(window).on("resize", function () {
		drawGrid();
	});
}

// Master Timeline
let master;

function initMasterTimeline() {
	master = gsap.timeline({ paused: true });
}

let pl;

// Preloader Animation
function initPreloader() {
	pl = gsap.timeline();

	// If not a first time visit in this tab
	if (sessionStorage.getItem("visited") == null) {
		lenis.stop();

		pl.set("html", {
			cursor: "wait",
		});

		pl.to(".preloader .line.horizontal", {
			x: "0%",
			stagger: {
				from: "center",
				axis: "x",
				each: 0.08,
			},
			duration: 1.2,
			ease: "power2.inOut",
		});

		pl.to(
			".preloader .line.vertical",
			{
				y: "0%",
				stagger: {
					from: "center",
					axis: "y",
					each: 0.08,
				},
				duration: 1.2,
				ease: "power2.inOut",
			},
			"<"
		);

		pl.to(
			".preloader .cross",
			{
				opacity: 1,
				duration: 1.2,
				ease: "power2.inOut",
			},
			"<"
		);

		pl.to(
			".preloader .line.horizontal",
			{
				x: "100%",
				stagger: {
					from: "center",
					axis: "x",
					each: 0.08,
				},
				duration: 1.2,
				ease: "power2.inOut",
			},
			">+0.5"
		);

		pl.to(
			".preloader .line.vertical",
			{
				y: "-100%",
				stagger: {
					from: "center",
					axis: "y",
					each: 0.08,
				},
				duration: 1.2,
				ease: "power2.inOut",
			},
			"<"
		);

		pl.to(
			".preloader .cross",
			{
				opacity: 0,
				duration: 1.2,
				ease: "power2.inOut",
			},
			"<"
		);

		pl.to(
			".preloader",
			{
				clipPath: "inset(0% 0% 100% 0%)",
				duration: 1.2,
				ease: "power2.inOut",
				display: "none",
			},
			"<"
		);

		pl.set(
			"html",
			{
				cursor: "auto",
			},
			"-=0.8"
		);
		setTimeout(function () {
			lenis.start();
		}, 2750);
	} else {
		// is a revisit
		pl.set(".preloader .line.horizontal", {
			x: "0%",
			opacity: 0,
		});

		pl.set(".preloader .line.vertical", {
			y: "0%",
			opacity: 0,
		});

		pl.set(".preloader .cross", {
			opacity: 0,
		});

		pl.set(".lottie-logo", {
			opacity: 0,
		});

		pl.to(
			".preloader",
			{
				opacity: 0,
				duration: 0.45,
				ease: "power2.inOut",
				display: "none",
			},
			""
		);
	}
}

function initMenuInteractions() {
	// Hamburger Menu
	const hamburgerMenu = $(".hamburger-menu");
	const navbar = $(".navbar");

	// Function to update on resize
	function showHamburgerMenu() {
		if ($(window).width() < 992) {
			gsap.set(hamburgerMenu, {
				opacity: 1,
				scale: 1,
			});
		} else {
			gsap.set(hamburgerMenu, {
				opacity: 0,
				scale: 0,
			});
		}

		gsap.to(hamburgerMenu, {
			scrollTrigger: {
				trigger: navbar,
				start: "bottom top",
				toggleActions: "play none none reverse",
			},
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power4.out",
		});
	}

	showHamburgerMenu();

	// Update on resize
	$(window).on("resize", function () {
		showHamburgerMenu();
	});

	// Animation

	const fsmIn = gsap.timeline({
		paused: true,
	});

	fsmIn.fromTo(
		".fullscreen-menu",
		{
			display: "none",
			opacity: 0,
		},
		{
			display: "grid",
			opacity: 1,
			duration: 0.4,
			ease: "power2.out",
		}
	);

	fsmIn.from(
		".fullscreen-menu .menu-item .split-line-inner",
		{
			yPercent: 100,
			duration: 0.4,
			stagger: 0.05,
			ease: "power2.out",
		},
		"<"
	);

	const fsmOut = gsap.timeline({
		paused: true,
	});

	fsmOut.to(".fullscreen-menu", {
		display: "none",
		opacity: 0,
		duration: 0.6,
		ease: "power2.in",
	});

	fsmOut.to(
		".fullscreen-menu .menu-item .split-line-inner",
		{
			yPercent: -100,
			duration: 0.4,
			ease: "power2.out",
		},
		"<+0.1"
	);

	// Mobile Menu Trigger

	$(".hamburger-menu").click(function () {
		if ($(this).hasClass("menu-open")) {
			$(this).removeClass("menu-open");
			fsmOut.restart();
			lenis.start();
		} else {
			$(this).addClass("menu-open");
			fsmIn.restart();
			lenis.stop();
		}
	});
}

// Heading Animations
function initHeadingAnimations() {
	$("h2.split-words.animated").each(function () {
		let triggerElement = $(this);
		let targetElement = $(this).find(".split-word-inner");

		gsap.from(targetElement, {
			scrollTrigger: {
				trigger: triggerElement,
				start: "top 80%",
				toggleActions: "play none none none",
			},
			yPercent: 100,
			ease: "power3.out",
			duration: 0.8,
			stagger: 0.05,
			clearProps: "all",
		});
	});
}

// Footer Animation

function initFooterAnimation() {
	setTimeout(function () {
		const footerAnim = gsap.from(".footer h2 .split-word-inner", {
			y: "100%",
			stagger: 0.4,
			duration: 1.2,
			ease: "power4.out",
			paused: true,
		});

		ScrollTrigger.create({
			trigger: "footer h2",
			start: "70% bottom",
			onEnter: () => footerAnim.play(),
		});

		ScrollTrigger.create({
			trigger: "footer h2",
			start: "top bottom",
			onEnterBack: () => footerAnim.restart(),
			onLeaveBack: () => footerAnim.pause(0),
		});
	}, 300);
}

// Arrow Hover
function initArrowHover(triggerElement, arrowElement, options = {}) {
    const $trigger = $(triggerElement);
    const $arrow = $(arrowElement);
    
    // Default options
    const {
        opacity = { show: "1", hide: "0" }
    } = options;

    // Set initial state
    $arrow.css({
        opacity: opacity.hide,
    });

    $trigger.on("mousemove", function (event) {
        $arrow.css({
            left: event.clientX + "px",
            top: event.clientY + "px",
            transform: "rotate(var(--arrow-rotation)) translate(-50%, -100%) scale(1)",
            opacity: opacity.show,
        });
    });

    $trigger.on("mouseleave", function () {
        $arrow.css({
            transform: "rotate(var(--arrow-rotation)) translate(-50%, -100%) scale(0)",
            opacity: opacity.hide,
        });
    });
}


/* // Update ScrollTrigger when lazy images are loaded (Causes sccrolling to stutter on Mobile)
initLazyLoadFix() {
	const lazyImages = $("img[loading='lazy']");
	lazyImages.each(function () {
		$(this).on("load", function () {
			ScrollTrigger.refresh();
		});
	});
} */

var Webflow = Webflow || [];

Webflow.push(function () {
	initLenis();
	initSplitType();
	initMasterTimeline();
	initPreloaderGrid();
	initPreloader();
	initMenuInteractions();
	initHeadingAnimations();
	initFooterAnimation();
	initArrowHover(".footer h2", ".footer .arrow-hover");
});
