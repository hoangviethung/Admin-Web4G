// import here !!!
import loading from './lib/loading';
import mapping from "./lib/mapping";

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

Date.prototype.toDateInputValue = (function() {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
});

// AJAX BUTTON DELETE
function ajaxAction() {
	// BUTTON POPUP
	var itemId;
	var dataFieldName;
	// POPUP THÔNG BÁO
	$('.btn-popup[fancybox=fancybox-notification]').on('click', function() {
		itemId = $(this).attr('dataiD');
		dataFieldName = $(this).attr('dataFieldName');

		$.fancybox.open({
			src: '#fancybox-notification',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
			}
		});
	});

	// PUP FORM
	$('.btn-popup[fancybox="fancybox-form-submit"]').on('click', function() {
		itemId = $(this).attr('dataiD');
		dataFieldName = $(this).attr('dataFieldName');
		$.fancybox.open({
			src: '#fancybox-form-submit',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
			}
		});
	});

	// SUBMIT DELETE
	$('.submit-delete').on('click', function() {
		const url = $(this).attr('data-url');
		const data = {};
		data[dataFieldName] = itemId;
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			error: function(res) {
				$.fancybox.close({
					src: '#popup_notification',
					type: 'inline',
					opts: {
						hash: false,
						closeExisting: true,
					}
				});
			},
			success: function(data) {
				location.reload();
			}
		});
	});

	// SUBMIT CHANGE PASSWORD
	$('.submit-change-pass').on('click', function() {
		const url = $(this).attr('data-url');
		const oldpass = $('#oldpass').val();
		const newpass = $('#newpass').val();
		const re_newpass = $('#re_newpass').val();
		const data = {};
		data[dataFieldName] = itemId;
		data['oldpass'] = oldpass;
		data['newpass'] = newpass;
		data['re_newpass'] = re_newpass;
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			error: function(response) {},
			success: function(data) {
				location.reload();
			}
		});
	});

	// SUBMIT CHANGE
	$('.submit-change-setting').on('click', function() {
		const url = $(this).attr('data-url');
		const settingChange = $('#settingChange').val();
		const data = {};
		data[dataFieldName] = itemId;
		data['settingChange'] = settingChange;
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(data) {
				location.reload();
			}
		});
	});
}

// SUBMENU ASIDE
function showSubAsideMenu() {
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
function toogleAsideMenu() {

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

// UPLOAD FILE
function uploadFile() {
	var template = document.querySelector("#template");
	if (template) {
		var templateNew = template.parentNode.innerHTML;
		o.parentNode.removeChild(template);
		var itemDropZone = new Dropzone(".upload-file", {
			url: "/upload",
			thumbnailWidth: 80,
			thumbnailHeight: 80,
			parallelUploads: 20,
			previewTemplate: templateNew,
			autoQueue: !1,
			previewsContainer: "#previews",
			clickable: ".fileinput-button"
		});
		i.on("addedfile", (function(e) {
			e.previewElement.querySelector(".start").onclick = function() {
				itemDropZone.enqueueFile(e)
			}
		})), itemDropZone.on("totaluploadprogress", (function(e) {
			document.querySelector("#total-progress .progress-bar").style.width = e + "%"
		})), itemDropZone.on("sending", (function(e) {
			document.querySelector("#total-progress").style.opacity = "1", e.previewElement.querySelector(".start").setAttribute("disabled", "disabled")
		})), itemDropZone.on("queuecomplete", (function(e) {
			document.querySelector("#total-progress").style.opacity = "0"
		})), document.querySelector("#actions .start").onclick = function() {
			itemDropZone.enqueueFiles(i.getFilesWithStatus(Dropzone.ADDED))
		}, document.querySelector("#actions .cancel").onclick = function() {
			itemDropZone.removeAllFiles(!0)
		}
	}
}

// CHỌN NGÀY HIỆN TẠI LÀM MẶC ĐỊNH INPUT TYPE DATE
function setDateDefault() {
	let today = new Date().toDateInputValue();

	$($('input[type=date]')).val(today);

	$($('input[type=date]')).attr('min', today)
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	$('[data-toggle="tooltip"]').tooltip();
	// LOADING
	loading();
	// DROPZONE
	uploadFile();
	setDateDefault();
	// TAB
	const blockMainTab = new Tab(".block-main .tab-container");
	// SVG CONTROL
	SVG();
	// HEADER
	activeMenuByUrl();
	dropdownHeader();
	// ASIDE
	showSubAsideMenu();
	toogleAsideMenu();
	// AJAX
	ajaxAction()
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {})