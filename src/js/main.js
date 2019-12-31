// import here !!!
import loading from './lib/loading';
import mapping from "./lib/mapping";

// Script Cho TAB CHÍNH
class MainTAB {
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

// Script Cho TAB CON
class SubTAB {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[subtab-toggle-for]")
			this.contentList = this.selector.querySelectorAll("[sub-tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["subtab-toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[sub-tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["sub-tab-id"].value != tabTarget) {
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

// AJAX BUTTON DELETE
function ajaxFancybox() {
	var itemId;
	var dataFieldName;
	// POPUP THÔNG BÁO
	$('.btn-popup[fancybox=fancybox-notification]').on('click', function() {
		itemId = $(this).attr('dataiD');
		dataFieldName = $(this).attr('dataFieldName');
		const html =
			`<div class="modal-POPUP fancybox-content" id="fancybox-notification">
				<div class="title-modal">
					<h5>Thông báo</h5>
					<p>Web4gsolutions xin thông báo</p>
				</div>
				<div class="content-modal">
					<p>Bạn có chắc chắn xóa ?</p>
				</div>
				<div class="list-button">
					<div class="item">
						<button class="btn-custom cancel" data-fancybox-close>Hủy</button>
					</div>
					<div class="item">
						<button class="btn-custom submit submit-delete" data-url="#">Chấp nhận</button>
					</div>
				</div>
			</div>`
		$("body").append(html);
		$.fancybox.open({
			src: '#fancybox-notification',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				beforeShow: function() {
					// SUBMIT DELETE
					$('.submit-delete').on('click', function() {
						const url = $(this).attr('data-url');
						const data = {};
						data[dataFieldName] = itemId;
						$.ajax({
							type: "POST",
							url: url,
							data: data,
							success: function(res) {
								if (res.Code === 200) {
									location.reload();
								} else {
									console.log('Xóa thất bại');
								}
							}
						});
					});
				},
				afterClose: function() {
					$("#fancybox-notification").remove();
				}
			}
		});
	});

	// PUP FORM THAY ĐỔI MẬT KHẨU USER
	$('.btn-popup[fancybox="fancybox-change-pass"]').on('click', function() {
		itemId = $(this).attr('dataiD');
		dataFieldName = $(this).attr('dataFieldName');
		const html =
			`<div class="modal-POPUP fancybox-content" id="fancybox-change-pass">
				<div class="title-modal">
					<h5>Thay đổi mật khẩu</h5>
					<p>Web4gsolutions xin thông báo</p>
				</div>
				<div class="content-modal">
					<form action="#" method="method">
						<div class="form-group row">
							<label class="col-sm-5 col-form-label" for="staticEmail">Tài khoản</label>
							<div class="col-sm-7">
								<div class="input-group input-group-sm">
									<input class="form-control-plaintext" type="text" readonly="" value="Administrator">
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-5 col-form-label">Mật khẩu cũ</label>
							<div class="col-sm-7">
								<div class="input-group input-group-sm">
									<input class="form-control" id="oldpass" type="Password">
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-5 col-form-label">Mật khẩu mới</label>
							<div class="col-sm-7">
								<div class="input-group input-group-sm">
									<input class="form-control" id="newpass" type="Password">
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-5 col-form-label">Nhập lại mật khẩu mới</label>
							<div class="col-sm-7">
								<div class="input-group input-group-sm">
									<input class="form-control" id="re_newpass" type="Password">
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="list-button">
					<div class="item">
						<button class="btn-custom cancel" data-fancybox-close>Hủy</button>
					</div>
					<div class="item">
						<button class="btn-custom submit submit-change-pass" data-url="#">Cập nhật</button>
					</div>
				</div>
			</div>`
		$("body").append(html);
		$.fancybox.open({
			src: '#fancybox-change-pass',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				beforeShow: function() {
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
							success: function(res) {
								if (res.Code === 200) {
									location.reload();
								} else {
									console.log('Thay đổi mật khẩu thất bại');
								}
							}
						});
					});
				},
				afterClose: function() {
					$("#fancybox-change-pass").remove();
				}
			}
		});
	});
}

// AJAX CHECKBOX
function ajaxCheckBox() {
	$('._checkbox-custom input[type="checkbox"]').on('change', function() {
		const url = $(this).attr('data-url');
		let IsActive = $(this).attr('IsActive');
		if ($(this).attr('IsActive') === "false") {
			IsActive = "true";
			$(this).attr('IsActive', 'true');
		} else {
			IsActive = "false";
			$(this).attr('IsActive', 'false');
		}
		$.ajax({
			type: "POST",
			url: url,
			data: {
				IsActive: IsActive,
			},
		});
	});
}

// TẠO THÊM 1 DÒNG MỚI TABLE INPUT
function createRowTableInput() {
	$('.table-input table thead tr th .submit').on('click', function() {
		const newRow = $(this).parents('thead').siblings('tbody').find('tr').last();
		console.log(newRow);
	})
}

// GET URL PAGE
function setUrlTypeLink() {
	const url = window.location.protocol + '//' + window.location.host + '/';
	$('.url-default span.input-group-text').html(url)
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

// ACTIVE ITEM MENU BY URL
function activeMenuByUrl() {
	const url = window.location.pathname;
	const listLink = $('.aside-item .list-link a');
	listLink.each(function() {
		let allHref = $(this).attr('href');

		if (url === (allHref)) {
			$(this).parents('.aside-item').addClass('active');
			$(this).parents('.list-link').slideToggle();
		}
	})
}

// TOGGLE ASIDE GỌN PHÓNG TÓ
function toogleAsideMenu() {

	if ($(window).width() < 1024) {
		$('body, aside').addClass('active');
	}

	$('.block-logo .button-close').on('click', function() {
		if ($(window).width() > 1024) {
			$(this).toggleClass('active');
			$('body, aside').toggleClass('active');
		} else {
			console.log('asdasdasd');

		}
	});
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

function checkboxAllRow() {
	$('input[type-checkbox="all-row"]').on('click', function() {
		let thisRow = $(this).parents('tr');
		thisRow.each(function() {
			const allCheckBox = $(this).find('input[type=checkbox]');
			if (allCheckBox.attr('checked') == null) {
				allCheckBox.attr('checked', 'checked')
			}
		})
	})
}

function multipleSelect() {
	$("._select-custom").select2({
		tags: true,
		theme: "classic",
	});
}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	$('[data-toggle="tooltip"]').tooltip();
	// LOADING
	loading();
	multipleSelect();
	// TAB
	const blockMainTab = new MainTAB(".block-main .tab-container");
	const blockSubTab = new SubTAB(".block-subTab .tab-container");
	// SVG CONTROL
	SVG();
	// HEADER
	activeMenuByUrl();
	dropdownHeader();
	// ASIDE
	showSubAsideMenu();
	toogleAsideMenu();
	// AJAX
	ajaxFancybox();
	ajaxCheckBox();
	// CHECK ALL ROW
	checkboxAllRow();
	// URL Default
	setUrlTypeLink();
	// TẠO THÊM 1 DÒNG MỚI TABLE INPUT
	createRowTableInput();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {})