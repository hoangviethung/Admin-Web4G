// Script Cho TAB CHÍNH
class MainTAB {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]");
			this.contentList = this.selector.querySelectorAll("[tab-id]");
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", (e) => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(
					`[tab-id='${tabTarget}']`
				);
				element.classList.add("active");
				Array.prototype.forEach.call(
					this.titleList,
					(eleClicked, eleClickedIndex) => {
						if (eleClickedIndex != index) {
							eleClicked.classList.remove("active");
						}
					}
				);
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none";
						tabContentElement.classList.remove("show");
					}
				});
				(targetDOM.style.display = "block"),
				setTimeout(() => {
					targetDOM.classList.add("show");
				}, 50);
			});
		});
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
			this.titleList = this.selector.querySelectorAll("[subtab-toggle-for]");
			this.contentList = this.selector.querySelectorAll("[sub-tab-id]");
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", (e) => {
				e.preventDefault();
				const tabTarget = element.attributes["subtab-toggle-for"].value;
				const targetDOM = this.selector.querySelector(
					`[sub-tab-id='${tabTarget}']`
				);
				element.classList.add("active");
				Array.prototype.forEach.call(
					this.titleList,
					(eleClicked, eleClickedIndex) => {
						if (eleClickedIndex != index) {
							eleClicked.classList.remove("active");
						}
					}
				);
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["sub-tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none";
						tabContentElement.classList.remove("show");
					}
				});
				(targetDOM.style.display = "block"),
				setTimeout(() => {
					targetDOM.classList.add("show");
				}, 50);
			});
		});
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

function createFormData(selector, fieldName) {
	const formData = new FormData(selector);
	formData.append(fieldName.name, fieldName.id);
	return formData;
}

// AJAX FORMS FANCYBOX
function ajaxFancybox() {
	// TẤT CẢ DATA CẦN CÓ TRONG 1 BUTTONS KHI MUỐN HIỆN POPUP
	var itemId;
	var fancyboxId;
	var dataFieldName;
	var dataURL;
	// POPUP THÔNG BÁO
	$(".btn-popup[fancybox=fancybox-notification]").on("click", function() {
		// GET DATA
		itemId = $(this).attr("dataId");
		dataFieldName = $(this).attr("dataFieldName");
		dataURL = $(this).attr("dataUrl");
		fancyboxId = $(this).attr("fancyboxId");
		// HTML POPUP XÓA
		const html = `<div class="modal-POPUP fancybox-content" id="fancybox-notification"><div class="title-modal"><h5>Thông báo</h5><p>Web4gsolutions xin thông báo</p></div><div class="content-modal"><p>Bạn có chắc chắn xóa ?</p></div><div class="list-button"><div class="item"><button class="btn btn-pill btn-danger" data-fancybox-close>Hủy</button></div><div class="item"><button class="btn btn-pill btn-success submit-delete">Chấp nhận</button></div></div></div>`;
		// ĐẨY HTML VÀO BODY
		$("body").append(html);
		// HÀM XÓA
		$.fancybox.open({
			src: fancyboxId,
			type: "inline",
			opts: {
				hash: false,
				closeExisting: true,
				beforeShow: function() {
					// SUBMIT DELETE
					$(".submit-delete").on("click", function() {
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
									alert("Xóa thất bại");
								}
							},
						});
					});
				},
				afterClose: function() {
					$(fancyboxId).remove();
				},
			},
		});
	});

	// PUP FORM THAY ĐỔI MẬT KHẨU USER
	$('.btn-popup[fancybox="fancybox-forms"]').on("click", function() {
		const fieldName = {
			id: $(this).attr("dataiD"),
			name: $(this).attr("dataFieldName"),
		};
		dataURL = $(this).attr("dataUrl");
		fancyboxId = $(this).attr("fancyboxId");
		const dataOldUserName = $(this)
			.parents("td")
			.siblings("td[data-value]")
			.attr("data-value");
		$.ajax({
			type: "GET",
			url: dataURL,
			// HIỆN MÀN HÌNH LOADING
			beforeSend: function() {
				$(".block-loading").addClass("active");
				$("body").addClass("no-scroll");
			},
			// TEST IN FRONR END
			error: function() {
				// const resCode = 200;
				// const res = `
				// 	<div class="modal-POPUP fancybox-content" id="fancybox-forms">
				// 		<div class="title-modal">
				// 			<h5>Thay đổi mật khẩu</h5>
				// 			<p>Web4gsolutions xin thông báo</p>
				// 		</div>
				// 		<div class="content-modal">
				// 			<form action="#" method="method">
				// 				<div class="form-group row"><label class="col-sm-5 col-form-label" for="staticEmail">Tài khoản</label>
				// 					<div class="col-sm-7">
				// 						<div class="input-group input-group-sm old-value">
				// 						<input class="form-control-plaintext" type="text"
				// 								readonly="" value=""></div>
				// 					</div>
				// 				</div>
				// 				<div class="form-group row"><label class="col-sm-5 col-form-label">Mật khẩu cũ</label>
				// 					<div class="col-sm-7">
				// 						<div class="input-group input-group-sm">
				// 						<input name="old-pass" class="form-control" id="oldpass" type="Password">
				// 						</div>
				// 					</div>
				// 				</div>
				// 				<div class="form-group row"><label class="col-sm-5 col-form-label">Mật khẩu mới</label>
				// 					<div class="col-sm-7">
				// 						<div class="input-group input-group-sm">
				// 						<input name="new-pass" class="form-control" id="newpass" type="Password">
				// 						</div>
				// 					</div>
				// 				</div>
				// 				<div class="form-group row"><label class="col-sm-5 col-form-label">Nhập lại mật khẩu mới</label>
				// 					<div class="col-sm-7">
				// 						<div class="input-group input-group-sm">
				// 						<input name="confirm-pass" class="form-control" id="re_newpass" type="Password">
				// 						</div>
				// 					</div>
				// 				</div>
				// 			</form>
				// 		</div>
				// 		<div class="list-button">
				// 			<div class="item"><button class="btn btn-pill btn-danger" data-fancybox-close>Hủy</button></div>
				// 			<div class="item"><button class="btn btn-pill btn-success submit-form">Cập nhật</button></div>
				// 		</div>
				// 	</div>
				// `;
				// // XUẤT HTML VÙA GET ĐƯỢC RA NGOÀI
				// $("body").append(res);
				// var form = $(".modal-POPUP form").removeData("validator").removeData("unobtrusiveValidation");
				// $.validator.unobtrusive.parse(form);
				// // HIỆN CÁI TÊN NGƯỜI BỊ ĐỔI RA
				// $('#fancybox-forms .old-value input').val(dataOldUserName);
				// // HÀM THAY ĐỔI MẬT KHẨU
				// $.fancybox.open({
				// 	src: fancyboxId,
				// 	type: 'inline',
				// 	opts: {
				// 		hash: false,
				// 		closeExisting: true,
				// 		beforeShow: function() {
				// 			// SUBMIT CHANGE PASSWORD
				// 			$('.submit-form').on('click', function(e) {
				// 				e.preventDefault();
				// 				$(".modal-POPUP form").valid();
				// 				const FormElement = document.querySelector('.modal-POPUP form')
				// 				const data = createFormData(FormElement, fieldName);
				// 				// KIỂM TRA XEM VALID CÓ ĐÚNG KHÔNG MỚI CHO Request lên URL
				// 				if ($(".modal-POPUP form").valid() === true) {
				// 					$.ajax({
				// 						type: "POST",
				// 						url: dataURL,
				// 						data: data,
				// 						processData: false,
				// 						contentType: false,
				// 						success: function(res) {
				// 							if (resCode === 200) {
				// 								location.reload();
				// 							} else {
				// 								alert('báo lỗi');
				// 							}
				// 						}
				// 					});
				// 				} else {
				// 					console.log('Không được request lên url vì valid');
				// 				}
				// 			});
				// 		},
				// 		afterClose: function() {
				// 			$("#fancybox-forms").remove();
				// 		}
				// 	}
				// });
			},

			success: function(res) {
				// XUẤT HTML VÙA GET ĐƯỢC RA NGOÀI
				$("body").append(res);
				var form = $(".modal-POPUP form")
					.removeData("validator")
					.removeData("unobtrusiveValidation");
				$.validator.unobtrusive.parse(form);
				// HIỆN CÁI TÊN NGƯỜI BỊ ĐỔI RA
				$("#fancybox-forms .old-value input").val(dataOldUserName);
				// HÀM THAY ĐỔI MẬT KHẨU
				$.fancybox.open({
					src: fancyboxId,
					type: "inline",
					opts: {
						hash: false,
						closeExisting: true,
						beforeShow: function() {
							// SUBMIT CHANGE PASSWORD
							$(".submit-form").on("click", function(e) {
								e.preventDefault();
								$(".modal-POPUP form").valid();
								const FormElement = document.querySelector(".modal-POPUP form");
								const data = createFormData(FormElement, fieldName);
								// KIỂM TRA XEM VALID CÓ ĐÚNG KHÔNG MỚI CHO Request lên URL
								if ($(".modal-POPUP form").valid() === true) {
									$.ajax({
										type: "POST",
										url: dataURL,
										data: data,
										processData: false,
										contentType: false,
										success: function(res) {
											if (res.Code === 200) {
												location.reload();
											} else {
												alert(res.Message);
											}
										},
									});
								} else {
									console.log("Không được request lên url vì valid");
								}
							});
						},
						afterClose: function() {
							$("#fancybox-forms").remove();
						},
					},
				});
			},

			complete: function() {
				$(".block-loading").removeClass("active");
				$("body").removeClass("no-scroll");
			},
		});
	});
}

// AJAX CHECKBOX
function ajaxCheckBox() {
	$('._checkbox-custom input[type="checkbox"]').on("change", function() {
		const url = $(this).attr("data-url");
		let IsActive = $(this).attr("IsActive");
		if ($(this).attr("IsActive") === "false") {
			IsActive = "true";
			$(this).attr("IsActive", "true");
		} else {
			IsActive = "false";
			$(this).attr("IsActive", "false");
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
	$(".table-input table thead tr th .submit").on("click", function() {
		const newRow = $(this).parents("thead").siblings("tbody").find("tr").last();
	});
}

// GET URL PAGE
function setUrlTypeLink() {
	const url = window.location.protocol + "//" + window.location.host + "/";
	$(".url-default span.input-group-text").html(url);
	let dataUrl = $(".chooseUrlPage option:selected").attr("data-url");
	if (dataUrl && dataUrl.length > 0) {
		$(".url-default span.input-group-text").html(url + dataUrl.slice(1));
	}

	$(".chooseUrlPage").on("change", function() {
		const valueUrl = $(".chooseUrlPage option:selected").attr("data-url");
		$(".url-default").siblings("input").attr("data-url", valueUrl);
		$(".url-default span.input-group-text").html(url + valueUrl.slice(1));
	});
}

function initializationClassAsideMenu() {
	// LEVEL 1
	$(".aside-list .aside-item")
		.children(".list-link")
		.addClass("list-link-level--1");
	$(".aside-list .aside-item").children(".name").addClass("name-link-level--1");
	$(".aside-list .aside-item .list-link-level--1")
		.children(".link")
		.addClass("link-level--1");
	// LEVEL 2
	$(".aside-list .aside-item .list-link-level--1")
		.find(".list-link")
		.addClass("list-link-level--2");
	$(".aside-list .aside-item .link-level--1")
		.children(".name")
		.addClass("name-link-level--2");
	$(".aside-list .aside-item .list-link-level--2")
		.children(".link")
		.addClass("link-level--2");
}

function toggleAsideMenu() {
	$(".aside-list .aside-item .name-link-level--1").on("click", function() {
		// THIS IS 'NOT THIS'
		const _notthis = $(".aside-list .aside-item .name-link-level--1").not(this);
		// SHOW SUB MENU ==> ADD CLASS ACTIVE
		$(this).siblings(".list-link").slideToggle();
		$(this).toggleClass("active");
		_notthis.siblings(".list-link").slideUp();
		_notthis.removeClass("active");
		// CLOSE LELVEL 2
		$(".aside-list .aside-item .list-link-level--2").slideUp();
		$(".aside-list .aside-item .name-link-level--2").removeClass("active");
	});

	$(".aside-list .aside-item .name-link-level--2").on("click", function() {
		// THIS IS 'NOT THIS'
		const _notthis = $(".aside-list .aside-item .name-link-level--2").not(this);
		// SHOW SUB MENU AND ADD CLASS ACTIVE
		$(this).siblings(".list-link").slideToggle();
		$(this).toggleClass("active");
		_notthis.siblings(".list-link").slideUp();
		_notthis.removeClass("active");
	});
}

// ACTIVE ITEM MENU BY URL
function activeMenuByUrl() {
	const url = window.location.pathname;
	// TEST COOKIE //
	// document.cookie = "SiteId=1; expires=Thu, 04 Feb 2020 12:00:00 UTC; path=/";
	if (document.cookie.indexOf("SiteId") >= 0) {
		document.cookie.split("; ").forEach((item) => {
			if (item.indexOf("SiteId") === 0) {
				$('[data-siteid="' + item.split("=")[1] + '"]').addClass("acitve");
				$('[data-siteid="' + item.split("=")[1] + '"]')
					.find(".list-link-level--1")
					.slideDown();

				const listLinkChild = $('[data-siteid="' + item.split("=")[1] + '"] a');
				listLinkChild.each(function() {
					let allHref = $(this).attr("href");
					if (allHref.includes(url)) {
						$(this).parents(".list-link-level--2").slideDown();
						$(this)
							.parents(".list-link-level--2")
							.siblings(".name-link-level--1")
							.addClass("active");
					}
				});
			}
		});
	} else {
		const listLink = $(".aside-list a");
		listLink.each(function() {
			let allHref = $(this).attr("href");
			if (allHref.includes(url)) {
				$(this).parents(".aside-item").addClass("active");
				$(this).parents(".list-link").slideToggle();
			}
		});
	}
}

// TOGGLE ASIDE GỌN PHÓNG TÓ
function closeAsideMenu() {
	if ($(window).width() < 1024) {
		$("body, aside").addClass("active");
	}

	$(".block-logo .button-close").on("click", function() {
		if ($(window).width() > 1024) {
			$(this).toggleClass("active");
			$("body, aside").toggleClass("active");
		}
	});
}

// HEADER
function dropdownHeader() {
	$(".item-click-dropdown").on("click", function() {
		$(this).siblings(".content-dropdown").slideToggle();
	});
}

// CONTROL SVG
function SVG() {
	jQuery("img.svg").each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr("id");
		var imgClass = $img.attr("class");
		var imgURL = $img.attr("src");

		jQuery.get(
			imgURL,
			function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find("svg");

				// Add replaced image's ID to the new SVG
				if (typeof imgID !== "undefined") {
					$svg = $svg.attr("id", imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== "undefined") {
					$svg = $svg.attr("class", imgClass + " replaced-svg");
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr("xmlns:a");

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if (
					!$svg.attr("viewBox") &&
					$svg.attr("height") &&
					$svg.attr("width")
				) {
					$svg.attr(
						"viewBox",
						"0 0 " + $svg.attr("height") + " " + $svg.attr("width")
					);
				}

				// Replace image with new SVG
				$img.replaceWith($svg);
			},
			"xml"
		);
	});
}

function checkboxAllRow() {
	$(".role-row").each(function() {
		const row = $(this);
		if (row.find("input[type=checkbox]").length > 0) {
			row.addClass("role-checkbox");
		}
	});

	$(".role-checkbox").each(function() {
		const row = $(this);
		const inputCheckAll = row.find(".check-all");
		const inputView = row.find(".view");
		const inputAdd = row.find(".add");
		const inputEdit = row.find(".edit");
		const inputDelete = row.find(".delete");

		const getRowState = () => {
			let obj = {};
			obj["checkAll"] = inputCheckAll[0].checked;
			if (inputView.length > 0) {
				obj["view"] = inputView[0].checked;
			}
			if (inputAdd.length > 0) {
				obj["add"] = inputAdd[0].checked;
			}
			if (inputEdit.length > 0) {
				obj["edit"] = inputEdit[0].checked;
			}
			if (inputDelete.length > 0) {
				obj["delete"] = inputDelete[0].checked;
			}
			return obj;
		};

		let checkAll = true;
		if (inputView.length > 0) {
			checkAll = checkAll && inputView[0].checked;
		}
		if (inputAdd.length > 0) {
			checkAll = checkAll && inputAdd[0].checked;
		}
		if (inputEdit.length > 0) {
			checkAll = checkAll && inputEdit[0].checked;
		}
		if (inputDelete.length > 0) {
			checkAll = checkAll && inputDelete[0].checked;
		}

		if (checkAll) {
			inputCheckAll.checked = true;
			inputCheckAll.attr("checked", "checked");
		}

		inputCheckAll.on("change", function(e) {
			Object.keys(getRowState()).forEach((key) => {
				if (e.currentTarget.checked) {
					if (key === "view") {
						inputView.attr("checked", "checked");
						inputView[0].checked = true;
					}
					if (key === "add") {
						inputAdd.attr("checked", "checked");
						inputAdd[0].checked = true;
					}
					if (key === "edit") {
						inputEdit.attr("checked", "checked");
						inputEdit[0].checked = true;
					}
					if (key === "delete") {
						inputDelete.attr("checked", "checked");
						inputDelete[0].checked = true;
					}
				} else {
					if (key === "view") {
						inputView.removeAttr("checked");
						inputView[0].checked = false;
					}
					if (key === "add") {
						inputAdd.removeAttr("checked");
						inputAdd[0].checked = false;
					}
					if (key === "edit") {
						inputEdit.removeAttr("checked");
						inputEdit[0].checked = false;
					}
					if (key === "delete") {
						inputDelete.removeAttr("checked");
						inputDelete[0].checked = false;
					}
				}
			});
		});

		row
			.find("input[type=checkbox]")
			.not(".check-all")
			.on("change", function(e) {
				const rowState = getRowState();
				let check = true;
				Object.values(rowState).forEach((value, index) => {
					if (index !== 0) {
						check = check && value;
					}
				});

				if (check) {
					inputCheckAll.attr("checked", "checked");
					inputCheckAll[0].checked = true;
				} else {
					inputCheckAll.removeAttr("checked");
					inputCheckAll[0].checked = false;
				}
			});
	});
}

function multipCheckBoxByAttr() {
	// CHECK TẤT CẢ
	function checkAll() {
		$(".check-all[data-checkbox-group]").each(function(index) {
			const _this = $(this);
			// LẤY HẾT TẤT CẢ TÊN NHÓM CHECK
			const nameAllGroup = _this.attr("data-checkbox-group");
			// CHỌN CHÍNH XÁC TÊN NHÓM
			const thisNameGroup = $("[data-checkbox-group=" + nameAllGroup + "]");
			// HÀM CHECK ALL
			_this.on("change", function(e) {
				if (e.currentTarget.checked) {
					thisNameGroup.each(function() {
						$(this).attr("checked", "checked");
						$(this)[0].checked = true;
					});
				} else {
					thisNameGroup.each(function() {
						$(this).removeAttr("checked", "checked");
						$(this)[0].checked = false;
					});
				}
			});
		});
	}
	// KIỂM TRA TRẠNG THÁI NHÓM CHECK
	function getState() {
		$("[data-checkbox-group]").each(function() {
			const _this = $(this);
			// HÀM CHECK TRANG THÁI
			_this.on("change", function() {
				let temp = 0;
				// LẤY HẾT TẤT CẢ TÊN NHÓM CHECK
				const nameAllGroup = _this.attr("data-checkbox-group");
				// CHỌN CHÍNH XÁC TÊN NHÓM
				const thisNameGroup = $(
					"[data-checkbox-group=" + nameAllGroup + "]"
				).not(".check-all");
				// TỔNG SỐ LƯỢNG CÁC Ô CHECKBOX
				const quantity = thisNameGroup.length;
				// LẤY SỐ LƯỢNG CÁC Ô ĐÃ CHECK
				thisNameGroup.each(function() {
					if ($(this)[0].checked === true) {
						temp++;
					}
				});
				if (temp === quantity) {
					$(
						".check-all[data-checkbox-group=" + nameAllGroup + "]"
					)[0].checked = true;
				} else {
					$(
						".check-all[data-checkbox-group=" + nameAllGroup + "]"
					)[0].checked = false;
				}
			});
		});
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
	let CkEditorList = document.querySelectorAll(".ck-editor");
	CkEditorList.forEach((item) => {
		let itemId = item.getAttribute("id");
		const editor = CKEDITOR.replace(itemId, {
			// want to  freely enter any HTML content in source mode without any limitations.
			allowedContent: true,
			filebrowserBrowseUrl: "/Admin/HomeAdmin/CkfinderPopup",
		});
	});
}

function DatePickerInit() {
	$(".date-picker").each(function() {
		if ($(this).val().length > 0) {
			$(this).flatpickr({
				// enableTime: true,
				dateFormat: "Y-m-d H:i",
				time_24hr: true,
			});
		} else {
			$(this).flatpickr({
				// enableTime: true,
				dateFormat: "Y-m-d H:i",
				time_24hr: true,
				defaultDate: new Date(),
			});
		}
	});
}

function getFileNameWhenChooseFileUpload() {
	$("input[type=file]").on("change", function(e) {
		const thisInputFile = $(this);
		const fileName = e.originalEvent.srcElement.files[0].name;
		const fileNameExtension = fileName.split(".")[
			fileName.split(".").length - 1
		];
		if (fileNameExtension != "xls" && fileNameExtension != "xlsx") {
			thisInputFile
				.parents(".file-upload")
				.find(".file-upload-notice")
				.html("Vui lòng chọn file Excel");
			thisInputFile.replaceWith(thisInputFile.val("").clone(true));
		} else {
			thisInputFile
				.parents(".file-upload")
				.find(".file-upload-notice")
				.html(fileName);
		}
	});

	$(".btn-upload").on("click", function(e) {
		e.preventDefault();
		const thisButton = $(this);
		const url = thisButton.attr("data-url");
		const files = thisButton.parents(".file-upload").find("input[type=file]")[0]
			.files[0];
		const formData = new FormData();
		formData.append("files", files);
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data, textStatus, jqXHR) {
				debugger;
			},
		});
	});
}

function notifyAdmin() {
	let tempValue = $("#notify-json").val();

	if (tempValue != "") {
		const notifyValue = JSON.parse(tempValue);
		// KIỂM TRA ĐIỀU KIỆN ĐỂ HIỆN
		if (Number(notifyValue.Code) === 200) {
			$.notify({
				// options
				icon: "glyphicon glyphicon-warning-sign",
				title: "Web4gsolutions xin thông báo: ",
				message: notifyValue.Message,
				url: "/",
				target: "_blank",
			}, {
				// settings
				element: "body",
				position: null,
				type: "success",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right",
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 5000,
				timer: 1000,
				url_target: "_blank",
				mouse_over: null,
				animate: {
					enter: "animated fadeInDown",
					exit: "animated fadeOutUp",
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: "class",
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					"</div>" +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					"</div>",
			});
		} else {
			$.notify({
				// options
				icon: "glyphicon glyphicon-warning-sign",
				title: "Web4gsolutions xin thông báo: ",
				message: notifyValue.Message,
				url: "/",
				target: "_blank",
			}, {
				// settings
				element: "body",
				position: null,
				type: "danger",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right",
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 5000,
				timer: 1000,
				url_target: "_blank",
				mouse_over: null,
				animate: {
					enter: "animated fadeInDown",
					exit: "animated fadeOutUp",
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: "class",
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					"</div>" +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					"</div>",
			});
		}
	}
}

function fixedLisTab() {
	const heightHeader = $("header").height();
	const widthAside = $("aside").width();
	const heightListTab = $(".block-list-tab .list-tab").outerHeight();

	$(".block-list-tab").css({
		"padding-top": heightListTab + "px",
	});

	$(".list-tab").css({
		position: "absolute",
		top: "0px",
		left: "0px",
	});

	window.addEventListener("scroll", () => {
		const locationLisTab = $(".block-list-tab").offset();
		const locationWindow = window.scrollY;

		if ($(".list-tab").hasClass("fixed")) {
			$(".list-tab").css({
				top: heightHeader + "px",
				left: widthAside + "px",
			});
		} else {
			$(".list-tab").css({
				position: "absolute",
				top: "0px",
				left: "0px",
			});
		}
	});
}

// KHÓA 1 NGÔN NGỮ KHI SẢN PHẨM CHƯA CÓ TIẾNG ANH (HOẶC TIẾNG VIỆT)
function lockOneLanguageWhenCheckBox() {
	// CHECK BAN ĐẦU
	function checkWhenDocumentReady() {
		const dataLock = $('input[name="lock-language"]').attr("data-lock");

		if ($('input[name="lock-language"]')[0].checked === true) {
			$("[data-lock-language]").each(function() {
				if (dataLock === $(this).attr("data-lock-language")) {
					$(this).css({
						"pointer-events": "none",
						opacity: "0.5",
					});
					$(this)
						.find("input, textarea , select , checkbox")
						.attr("readonly", true);
					// COPY DATA
					for (
						let i = 0; i < $(this).find("input[type!='hidden']").length; i++
					) {
						const dataCopy = $("[data-lock-language]")
							.not(this)
							.find("input[type!='hidden']")[i].value;
						$(this).find("input[type!='hidden']")[i].value = dataCopy;
					}
				} else {
					$(this)
						.find("input, textarea , select , checkbox")
						.attr("readonly", true);
				}
			});
		} else {
			$("[data-lock-language]").each(function() {
				if (dataLock === $(this).attr("data-lock-language")) {
					$(this).css({
						"pointer-events": "visible",
						opacity: "1",
					});
					$(this).find("textarea , select , checkbox").val("");
					$(this)
						.find("input, textarea , select , checkbox")
						.attr("readonly", false);
				} else {
					$(this)
						.find("input, textarea , select , checkbox")
						.attr("readonly", false);
				}
			});
		}
	}
	// CHECK KHI CLICKS
	function checkWhenClick() {
		$('input[name="lock-language"]').on("change", function() {
			const dataLock = $(this).attr("data-lock");
			if ($(this)[0].checked === true) {
				$("[data-lock-language]").each(function() {
					if (dataLock === $(this).attr("data-lock-language")) {
						$(this).css({
							"pointer-events": "none",
							opacity: "0.5",
						});
						$(this)
							.find("input, textarea , select , checkbox")
							.attr("readonly", true);
						// COPY DATA
						for (
							let i = 0; i < $(this).find("input[type!='hidden']").length; i++
						) {
							const dataCopy = $("[data-lock-language]")
								.not(this)
								.find("input[type!='hidden']")[i].value;
							$(this).find("input[type!='hidden']")[i].value = dataCopy;
						}
					} else {
						$(this)
							.find("input, textarea , select , checkbox")
							.attr("readonly", true);
					}
				});
			} else {
				$("[data-lock-language]").each(function() {
					if (dataLock === $(this).attr("data-lock-language")) {
						$(this).css({
							"pointer-events": "visible",
							opacity: "1",
						});
						$(this).find("textarea , select , checkbox").val("");
						$(this)
							.find("input, textarea , select , checkbox")
							.attr("readonly", false);
					} else {
						$(this)
							.find("input, textarea , select , checkbox")
							.attr("readonly", false);
					}
				});
			}
		});
	}
	// CHECK BAN ĐẦU
	if ($('input[name="lock-language"]').length > 0) {
		checkWhenDocumentReady();
	}
	// CHECK KHI CLICK
	checkWhenClick();
}

const editHTMLWithGrapesJS = () => {
	const GrapesJS = $("#grapes-html");
	const dataFolder = $("#ImageFolder").val();
	const hiddenInput = $("#grapesjs-input-hidden");
	const coreCSS =
		window.location.origin + "/Content/resources/css/core.min.css";
	const mainCSS =
		window.location.origin + "/Content/resources/css/main.min.css";
	const coreJS = window.location.origin + "/Content/resources/js/core.min.js";
	const mainJS = window.location.origin + "/Content/resources/js/main.min.js";
	let templates, ckeditor;
	$("body").append(`
		<div class="d-none">
			<div class="template-select-popup" id="template-select-popup">
				<div class="block-title">
					<h3>Chọn template</h3>
				</div>
				<div class="form-group form-select">
					<select id="select-template"></select>
				</div>
				<div class="form-group form-button">
					<span class="btn btn-success" id="btn-get-template">Chọn</span>
				</div>
			</div>
		</div>
	`);

	if ($("#grapesjs-ckeditor").length > 0) {
		ckeditor = CKEDITOR.replace("grapesjs-ckeditor", {
			allowedContent: true,
			filebrowserBrowseUrl: "/Admin/HomeAdmin/CkfinderPopup",
		});
	}

	const openPopupTemplate = () => {
		const url = $("#btn-grapesjs-popup-select").attr("data-url");
		$.ajax({
			url: url,
			type: "get",
			success: function(res) {
				templates = res;
				let optionsHTML = "<option disabled>-- Chọn giao diện --</option>";
				templates.forEach((template) => {
					optionsHTML += `<option value="${template.Id}">${template.Name}</option>`;
				});
				$("#template-select-popup")
					.find(".form-select select")
					.html(optionsHTML);
			},
		});
		$.fancybox.open({
			type: "inline",
			src: "#template-select-popup",
			opts: {
				hash: false,
				touch: false,
			},
		});
	};

	const defaultOpts = {
		container: "#grapes-html",
		fromElement: true,
		height: "700px",
		width: "100%",
		noticeOnUnload: false,
		assetManager: false,
		storageManager: false,
		panels: {
			defaults: [],
		},
		forceClass: false,
		draggable: false,
		canvas: {
			styles: [coreCSS, mainCSS],
			scripts: [coreJS, mainJS],
		},
	};

	GrapesJS.find("[data-src]").each(function() {
		const src = $(this).attr("data-src");
		$(this).addClass("temporary-data-src");
		$(this).attr("src", src);
		$(this).attr("data-src", "");
	});

	let editor = grapesjs.init(defaultOpts);

	function uploadFile(e) {
		var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		let formData = new FormData();
		Array.from(files).forEach((file, index) => {
			formData.append(`file[${index}]`, file);
		});
		formData.append("folder", dataFolder);

		$.ajax({
			url: "/file-upload",
			data: formData,
			type: "POST",
			processData: false,
			contentType: false,
			success: function(res) {
				// const imagesList = res.map(item => {
				// 	return item = {
				// 		src: item.Link,
				// 		name: item.Name,
				// 	}
				// })
				// editor.AssetManager.add(imagesList);

				var iframe = document.getElementById("upload");
				iframe.src = iframe.src;
			},
		});
	}
	editor.on("run:open-assets", () => {
		if (editor.uploaderModified) {
			return;
		} else {
			const modal = editor.Modal;
			const modalBody = modal.getContentEl();
			const uploader = $(modalBody).find(".gjs-am-file-uploader");
			const insideFormHtml = $(uploader).find("form").html();
			$(uploader).html(`<div id="gjs-form-upload">${insideFormHtml}</div>`);
			const uploadForm = $(uploader).find("#gjs-form-upload");
			const uploadInput = $(uploader).find("#gjs-am-uploadFile");
			$.ajax({
				url: "/get-files",
				data: {
					folder: dataFolder,
				},
				success: function(res) {
					if (typeof res == "object") {
						const imagesList = res.map((item) => {
							return (item = {
								src: item.Link,
								name: item.Name,
							});
						});
						editor.AssetManager.add(imagesList);
					}
				},
			});
			uploadForm.ondrop = function(e) {
				this.className = "";
				e.preventDefault();
				uploadFile(e);
				return;
			};
			$(uploadInput).change(uploadFile);
			editor.uploaderModified = true;
		}
	});

	$("#btn-grapesjs-import-html").on("click", function(e) {
		e.preventDefault();
		ckeditor.insertHtml(editor.getHtml());
		$("#grapesjs-popup").addClass("active");
	});
	$("#btn-grapesjs-popup-discard").on("click", function(e) {
		e.preventDefault();
		ckeditor.setData("");
		$("#grapesjs-popup").removeClass("active");
	});
	$("#btn-grapesjs-popup-save").on("click", function(e) {
		const data = ckeditor.getData();
		editor.destroy();
		ckeditor.setData("");
		$("#grapesjs-popup").removeClass("active");
		$("#grapes-html").html(data);
		editor = grapesjs.init(defaultOpts);
	});
	$("#btn-grapesjs-popup-select").on("click", openPopupTemplate);

	$("body").on("click", "#btn-get-template", function(e) {
		ckeditor.setData("");
		const id = Number($("#template-select-popup select").val());
		const item = templates.filter((template) => template.Id === id);
		setTimeout(() => {
			const storeHTML = document.createElement("div");
			$(storeHTML).html(item[0].Text);

			$(storeHTML)
				.find("[data-src]")
				.each(function() {
					const src = $(this).attr("data-src");
					$(this).addClass("temporary-data-src");
					$(this).attr("src", src);
					$(this).attr("data-src", "");
				});
			const htmlIsInserted = $(storeHTML).html();
			ckeditor.insertHtml(htmlIsInserted);

			$.fancybox.close(true);
		}, 150);
	});

	$("#btn-grapesjs-save-html").on("click", function(e) {
		e.preventDefault();
		const storeHTML = document.createElement("div");
		const htmlEdited = editor.getHtml();
		$(storeHTML).html(htmlEdited);
		$(storeHTML)
			.find(".temporary-data-src")
			.each(function() {
				const src = $(this).attr("src");
				$(this).attr("data-src", src);
				$(this).attr("src", "");
				$(this).removeClass("temporary-data-src");
			});
		const newHTML = $(storeHTML).html();
		$("#grapesjs-html").val(newHTML);
		$(hiddenInput).val(newHTML);
		$("#grapesjs-form").submit();
	});
};
// Credit từ David Walsh: https://davidwalsh.name/javascript-debounce-function

// debounce sẽ return fn và fn sẽ không chạy cho đến khi debounce không được thực thi
// trong khoản thời gian delay. Nếu immediate là true, thì fn sẽ được thực thi ngay lặp tức
// rồi mới được debounced cho những lần tiếp theo.
function debounce(fn, delay, immediate) {
	let timeout;

	// Đây là function sẽ được thực thi khi debouncedKeyUp được thực thi ở ví dụ trên
	return function executedFn() {
		// Mình save lại this vào biến context
		let context = this; // "this" context của executedFn

		// Save lại arguments vào args. Trong JS, arguments giữ giá trị của tất cả tham số được truyền vào cho một function.
		// Cho dù bạn không khai báo tham số cho một hàm, thì khi truyền tham số vào cho hàm đó, các bạn vẫn có thể truy xuất
		// đến các tham số bằng biến arguments này. Theo ví dụ trên, thì arguments ở đây sẽ chứa "event" 
		let args = arguments; // "arguments" của fn

		// Function later này sẽ được gọi sau khi delay được chạy xong. 
		// Nghĩa là mình return executedFn, khi executedFn được thực thi thì sau khoản delay, later sẽ được thực thi.
		let later = function() {
			// Gán null cho timeout => cho thấy delay đã chạy xong
			timeout = null;

			// Gọi hàm fn với apply
			if (!immediate) fn.apply(context, args);
		};

		// Xác định xem nên gọi fn dựa vào tham số immediate
		let callNow = immediate && !timeout;

		// Dòng clearTimeout sẽ reset timeout đang hiện hữu (*existed*). Đây là điều cần thiết, 
		// vì mình cần hủy timeout và tạo 1 timeout mới nếu như debounce được thực thi khi 
		// delay chưa chạy xong.
		clearTimeout(timeout);

		// Khởi tạo (lại) timeout mới và gán vào biến timeout để có thể clear/check.
		timeout = setTimeout(later, delay);

		// Nếu như immediate là true, thì mình sẽ gọi fn lần đầu tiên ở đây.
		if (callNow) fn.apply(context, args);
	}
}

//SEO
const renderSEO = () => {
	const title = $(".SEO input.title");
	const desc = $(".SEO input.desc");
	const keyupHandletitle = (e) => {
		let temp = $(".SEO input.title").val();
		$(".SEO .tab-content h3").html(`${temp}`);
	};
	const keyupHandletitledesc = (e) => {
		let temp = $(".SEO input.desc").val();
		$(".SEO .tab-content p.desc-subtab").html(`${temp}`);
	};
	const debouncetitle = debounce(keyupHandletitle, 2000);
	const debouncedesc = debounce(keyupHandletitledesc, 2000);

	title.keyup(debouncetitle);
	desc.keyup(debouncedesc);
};

// CHẠY KHI DOCUMENT SẴN SÀNG
document.addEventListener("DOMContentLoaded", () => {
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
	initializationClassAsideMenu();
	toggleAsideMenu();
	closeAsideMenu();
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
	fixedLisTab();
	lockOneLanguageWhenCheckBox();
	editHTMLWithGrapesJS();
	//SEO
	renderSEO();
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener("scroll", () => {});