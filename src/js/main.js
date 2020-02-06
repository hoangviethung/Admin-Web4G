// import here !!!
import loading from './lib/loading';

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
	var dataURL;
	// POPUP THÔNG BÁO
	$('.btn-popup[fancybox=fancybox-notification]').on('click', function() {
		itemId = $(this).attr('dataiD');
		dataFieldName = $(this).attr('dataFieldName');
		dataURL = $(this).attr('dataUrl');
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
						<button class="btn-custom submit submit-delete">Chấp nhận</button>
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
						const data = {};
						data[dataFieldName] = itemId;
						$.ajax({
							type: "POST",
							url: dataURL,
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
		dataURL = $(this).attr('dataUrl');
		const dataValue = $(this).parents('td').siblings('td[data-value]').attr('data-value');
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
								<div class="input-group input-group-sm old-value">
									<input class="form-control-plaintext" type="text" readonly="" value="">
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
		$('#fancybox-change-pass .old-value input').val(dataValue)
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
									alert('Thay đổi mật khẩu thất bại');
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
	$('.url-default span.input-group-text').html(url);
	let dataUrl = $('.chooseUrlPage option:selected').attr('data-url');
	if (dataUrl && dataUrl.length > 0) {
		$('.url-default span.input-group-text').html(url + dataUrl.slice(1));
	}

	$('.chooseUrlPage').on('change', function() {
		const valueUrl = $('.chooseUrlPage option:selected').attr('data-url');
		$('.url-default').siblings('input').attr('data-url', valueUrl);
		$('.url-default span.input-group-text').html(url + valueUrl.slice(1));
	});
}

// SUBMENU ASIDE
function showSubAsideMenu() {
	// MENU 1 CẤP
	$('.aside-list .aside-item').on('click', function() {
		// THIS IS 'NOT THIS'
		const _notthis = $('.aside-list .aside-item').not(this);
		// SHOW SUB MENU AND ADD CLASS ACTIVE
		$(this).find('.list-link').slideToggle();
		$(this).toggleClass('active');
		// RESET ALL NOT THIS
		$('.aside-list .aside-item__multi-level .list-link-level--1').slideUp();
		_notthis.find('.list-link').slideUp();
		_notthis.removeClass('active');
	});
	// MENU ĐA CẤP
	$('.aside-list .aside-item__multi-level .name').on('click', function() {
		// SHOW SUB MENU AND ADD CLASS ACTIVE
		$(this).siblings('.list-link-level--1').slideToggle();
		$(this).parents('.aside-item__multi-level').toggleClass('active');
		// RESET ALL NOT THIS
		$('.aside-list .aside-item .list-link').slideUp();
		$(this).parent().siblings('.aside-item__multi-level').find('.list-link-level--1').slideUp();
		$(this).parent().siblings('.aside-item__multi-level').find('.list-link-level--2').slideUp();
		$('.aside-item__multi-level .list-link-level--1 .name-link-level--1').not(this).removeClass('active');
	});
	// MỞ MENU CẤP 2
	$('.aside-item__multi-level .list-link-level--1 .name-link-level--1').on('click', function() {
		// SHOW SUB MENU AND ADD CLASS ACTIVE
		$(this).siblings('.list-link-level--2').slideToggle();
		$(this).toggleClass('active');
		// RESET ALL NOT THIS
		$('.aside-item__multi-level .list-link-level--1 .name-link-level--1').not(this).removeClass('active');
		$(this).parent().siblings('.link-level--1').find('.list-link-level--2').slideUp();
	});
}

// ACTIVE ITEM MENU BY URL
function activeMenuByUrl() {
	const url = window.location.pathname;
	// TEST COOKIE //
	// document.cookie = "SiteId=1; expires=Thu, 04 Feb 2020 12:00:00 UTC; path=/";
	if (document.cookie.indexOf('SiteId') >= 0) {
		document.cookie.split('; ').forEach(item => {
			if (item.indexOf('SiteId') === 0) {

				$('[data-siteid="' + item.split('=')[1] + '"]').addClass('acitve');
				$('[data-siteid="' + item.split('=')[1] + '"]').find('.list-link-level--1').slideDown();

				const listLinkChild = $('[data-siteid="' + item.split('=')[1] + '"] a');
				listLinkChild.each(function() {
					let allHref = $(this).attr('href');
					if (allHref.includes(url)) {
						$(this).parents('.list-link-level--2').slideDown();
						$(this).parents('.list-link-level--2').siblings('.name-link-level--1').addClass('active');
					}
				})
			}
		})
	} else {
		const listLink = $('.aside-list a');
		listLink.each(function() {
			let allHref = $(this).attr('href');
			if (allHref.includes(url)) {
				$(this).parents('.aside-item').addClass('active');
				$(this).parents('.list-link').slideToggle();
			}
		})
	}
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
	$('.role-row').each(function() {
		const row = $(this);
		if (row.find('input[type=checkbox]').length > 0) {
			row.addClass('role-checkbox')
		}
	})

	$(".role-checkbox").each(function() {
		const row = $(this);
		const inputCheckAll = row.find('.check-all');
		const inputView = row.find('.view');
		const inputAdd = row.find('.add');
		const inputEdit = row.find('.edit');
		const inputDelete = row.find('.delete');

		const getRowState = () => {
			let obj = {};
			obj['checkAll'] = inputCheckAll[0].checked;
			if (inputView.length > 0) {
				obj['view'] = inputView[0].checked;
			}
			if (inputAdd.length > 0) {
				obj['add'] = inputAdd[0].checked;
			}
			if (inputEdit.length > 0) {
				obj['edit'] = inputEdit[0].checked;
			}
			if (inputDelete.length > 0) {
				obj['delete'] = inputDelete[0].checked;
			}
			return obj;
		}

		inputCheckAll.on('change', function(e) {
			Object.keys(getRowState()).forEach(key => {
				if (e.currentTarget.checked) {
					if (key === 'view') {
						inputView.attr('checked', 'checked');
						inputView[0].checked = true;
					}
					if (key === 'add') {
						inputAdd.attr('checked', 'checked');
						inputAdd[0].checked = true;
					}
					if (key === 'edit') {
						inputEdit.attr('checked', 'checked');
						inputEdit[0].checked = true;
					}
					if (key === 'delete') {
						inputDelete.attr('checked', 'checked');
						inputDelete[0].checked = true;
					}
				} else {
					if (key === 'view') {
						inputView.removeAttr('checked');
						inputView[0].checked = false;
					}
					if (key === 'add') {
						inputAdd.removeAttr('checked');
						inputAdd[0].checked = false;
					}
					if (key === 'edit') {
						inputEdit.removeAttr('checked');
						inputEdit[0].checked = false;
					}
					if (key === 'delete') {
						inputDelete.removeAttr('checked');
						inputDelete[0].checked = false;
					}
				}
			})
		})

		row.find('input[type=checkbox]').not('.check-all').on('change', function(e) {
			const rowState = getRowState();
			let check = true;
			Object.values(rowState).forEach((value, index) => {
				if (index !== 0) {
					check = check && value
				}
			})

			if (check) {
				inputCheckAll.attr('checked', 'checked');
				inputCheckAll[0].checked = true;
			} else {
				inputCheckAll.removeAttr('checked');
				inputCheckAll[0].checked = false;
			}
		})
	})
}

function multipCheckBoxByAttr() {
	// CHECK TẤT CẢ
	function checkAll() {
		$('.check-all[data-checkbox-group]').each(function(index) {
			const _this = $(this);
			// LẤY HẾT TẤT CẢ TÊN NHÓM CHECK
			const nameAllGroup = _this.attr('data-checkbox-group');
			// CHỌN CHÍNH XÁC TÊN NHÓM
			const thisNameGroup = $('[data-checkbox-group=' + nameAllGroup + ']');
			// HÀM CHECK ALL
			_this.on('change', function(e) {
				if (e.currentTarget.checked) {
					thisNameGroup.each(function() {
						$(this).attr('checked', "checked");
						$(this)[0].checked = true;
					})
				} else {
					thisNameGroup.each(function() {
						$(this).removeAttr('checked', "checked");
						$(this)[0].checked = false;
					})
				}
			})
		})
	}
	// KIỂM TRA TRẠNG THÁI NHÓM CHECK
	function getState() {
		$('[data-checkbox-group]').each(function() {
			const _this = $(this);
			// HÀM CHECK TRANG THÁI
			_this.on('change', function() {
				let temp = 0;
				// LẤY HẾT TẤT CẢ TÊN NHÓM CHECK
				const nameAllGroup = _this.attr('data-checkbox-group');
				// CHỌN CHÍNH XÁC TÊN NHÓM
				const thisNameGroup = $('[data-checkbox-group=' + nameAllGroup + ']').not('.check-all');
				// TỔNG SỐ LƯỢNG CÁC Ô CHECKBOX
				const quantity = thisNameGroup.length;
				// LẤY SỐ LƯỢNG CÁC Ô ĐÃ CHECK
				thisNameGroup.each(function() {
					if ($(this)[0].checked === true) {
						temp++;
					}
				})
				if (temp === quantity) {
					$('.check-all[data-checkbox-group=' + nameAllGroup + ']')[0].checked = true;
				} else {
					$('.check-all[data-checkbox-group=' + nameAllGroup + ']')[0].checked = false;
				}
			})
		})
	}

	checkAll();
	getState();
}

function multipleSelect() {
	$("._select-custom").select2({
		tags: true,
		theme: "classic",
	});
}

function CKEditorReplace() {
	let CkEditorList = document.querySelectorAll('.ck-editor');
	CkEditorList.forEach(item => {
		let itemId = item.getAttribute('id');
		const editor = CKEDITOR.replace(itemId, {
			// want to  freely enter any HTML content in source mode without any limitations.
			allowedContent: true,
			filebrowserBrowseUrl: '/Admin/HomeAdmin/CkfinderPopup',
		});
	})
}

function DatePickerInit() {
	$(".date-picker").flatpickr({
		enableTime: true,
		dateFormat: "Y-m-d H:i",
		time_24hr: true,
		defaultDate: new Date(),
	})
}

function getFileNameWhenChooseFileUpload() {
	$('input[type=file]').on('change', function(e) {

		const thisInputFile = $(this);
		const fileName = e.originalEvent.srcElement.files[0].name;
		const fileNameExtension = fileName.split('.')[fileName.split('.').length - 1];
		if (fileNameExtension != "xls" && fileNameExtension != "xlsx") {
			thisInputFile.parents('.file-upload').find('.file-upload-notice').html('Vui lòng chọn file Excel');
			thisInputFile.replaceWith(thisInputFile.val('').clone(true));
		} else {
			thisInputFile.parents('.file-upload').find('.file-upload-notice').html(fileName);
		}
	})

	$('.btn-upload').on('click', function(e) {
		e.preventDefault();
		const thisButton = $(this);
		const url = thisButton.attr('data-url');
		const files = thisButton.parents('.file-upload').find('input[type=file]')[0].files[0];
		const formData = new FormData();
		formData.append('files', files)
		$.ajax({
			url: url,
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data, textStatus, jqXHR) {
				debugger;
			},
		})
	})
}

function notifyAdmin() {
	let tempValue = $('#notify-json').val();

	if (tempValue != "") {
		const notifyValue = JSON.parse(tempValue);
		// KIỂM TRA ĐIỀU KIỆN ĐỂ HIỆN
		if (Number(notifyValue.Code) === 200) {
			$.notify({
				// options
				icon: 'glyphicon glyphicon-warning-sign',
				title: 'Web4gsolutions xin thông báo: ',
				message: notifyValue.Message,
				url: '/',
				target: '_blank'
			}, {
				// settings
				element: 'body',
				position: null,
				type: "success",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 5000,
				timer: 1000,
				url_target: '_blank',
				mouse_over: null,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: 'class',
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					'</div>'
			});
		} else {
			$.notify({
				// options
				icon: 'glyphicon glyphicon-warning-sign',
				title: 'Web4gsolutions xin thông báo: ',
				message: notifyValue[0].Message,
				url: '/',
				target: '_blank'
			}, {
				// settings
				element: 'body',
				position: null,
				type: "danger",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 5000,
				timer: 1000,
				url_target: '_blank',
				mouse_over: null,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: 'class',
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					'</div>'
			});
		}
	}

}

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
	$('[data-toggle="tooltip"]').tooltip();
	// LOADING
	loading();
	multipleSelect();
	notifyAdmin();
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
	// CHECK ALL BY ATTR
	multipCheckBoxByAttr();
	// URL Default
	setUrlTypeLink();
	// TẠO THÊM 1 DÒNG MỚI TABLE INPUT
	createRowTableInput();
	// CKEditor
	CKEditorReplace();
	// Date time picker
	DatePickerInit();
	// lấy file name khi chọn file upload
	getFileNameWhenChooseFileUpload();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener('scroll', () => {})