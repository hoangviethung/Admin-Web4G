// import here !!!
import loading from './loading';
import mapping from "./mapping";


// Script Cho Tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block",
					setTimeout(() => {
						targetDOM.classList.add("show")
					}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

// SUBMENU ASIDE
function showSubMenu_AsideMenu() {
	$('.aside-list .aside-item').on('click', function() {
		// THIS IS 'NOT THIS'
		const _notthis = $('.aside-list .aside-item').not(this);
		// SHOW SUB MENU AND ADD CLASS ACTIVE
		$(this).find('.list-link').slideToggle();
		$(this).toggleClass('active');
		// RESET ALL NOT THIS
		_notthis.find('.list-link').slideUp();
		_notthis.removeClass('active');
	});
}

// TOGGLE ASIDE GỌN PHÓNG TÓ
function toogle_AsideMenu() {

	if ($(window).width() < 1024) {
		$('body, aside').addClass('active');
	}

	$('.block-logo .button-close').on('click', function() {
		if ($(window).width() > 1024) {
			console.log('true');
			$(this).toggleClass('active');
			$('body, aside').toggleClass('active');
		} else {
			console.log('asdasdasd');

		}
	});
}

// ACTIVE ITEM MENU BY URL
function activeMenuByUrl() {
	var url = window.location.href.split('/').pop();

	let listNavItem = $('.nav-item a');
	listNavItem.each(function() {
		let currenUrl = $(this).attr('href');
		if (url.includes(currenUrl)) {
			$(this).parents('.nav-item').addClass('active');
		}
	})
}

// HEADER
function dropdownHeader() {
	$('.item-click-dropdown').on('click', function() {
		$(this).siblings('.content-dropdown').slideToggle();
	});
}

// CONTROL SVG
function SVG() {
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');
	});
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	$('[data-toggle="tooltip"]').tooltip();
	// LOADING
	loading();
	// SVG CONTROL
	SVG();
	// HEADER
	activeMenuByUrl();
	dropdownHeader();
	// ASIDE
	showSubMenu_AsideMenu();
	toogle_AsideMenu();
	// WOW
	new WOW().init();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {})