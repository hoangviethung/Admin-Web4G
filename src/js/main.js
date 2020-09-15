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

function ajaxFancybox() {
       // TẤT CẢ DATA CẦN CÓ TRONG 1 BUTTONS KHI MUỐN HIỆN POPUP
       var itemId;
       var fancyboxId;
       var dataFieldName;
       var dataURL;
       // POPUP THÔNG BÁO
       $(".btn-popup[fancybox=fancybox-notification]").on("click", functon() {
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
                            beforeShw: function() {
                                   // SUBMIT DELETE
                                   $(".submit-delete").on("cick", function() {
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
                            afterCloe: function() {
                                   $(fancyboxId).remove();
                            },
                     },
              });
       });

       // PUP FORM THAY ĐỔI MẬT KHẨU USER
       $('.btn-popup[fancybox="fancybox-forms"]').on("click", functon() {
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
                     beforeSend:function() {
                            $(".block-loading").addClass("active");
                            $("body").addClass("no-scroll");
                     },
                     // TEST IN FRONR END
                     error:function() {
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

                     success:function(res) {
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
                                          beoreShow: function() {
                                                 // SUBMIT CHANGE PASSWORD
                                                 $(".submit-form")on("click", function(e) {
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
                                          aferClose: function() {
                                                 $("#fancybox-forms").remove();
                                          },
                                   },
                            });
                     },

                     complete:function() {
                            $(".block-loading").removeClass("active");
                            $("body").removeClass("no-scroll");
                     },
              });
       });
}

function ajaxCheckBox() {
       $('._checkbox-custom input[type="checkbox"]').on("change", functon() {
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

function createRowTableInput() {
       $(".table-input table thead tr th .submit").on("click", functon() {
              const newRow = $(this).parents("thead").siblings("tbody").find("tr").last();
       });
}

function setUrlTypeLink() {
       const url = window.location.protocol + "//" + window.location.host + "/";
       $(".url-default span.input-group-text").html(url);
       let dataUrl = $(".chooseUrlPage option:selected").attr("data-url");
       if (dataUrl && dataUrl.length > 0) {
              $(".url-default span.input-group-text").html(url + dataUrl.slice(1));
       }

       $(".chooseUrlPage").on("change", functon() {
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
       $(".aside-list .aside-item .name-link-level--1").on("click", functon() {
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

       $(".aside-list .aside-item .name-link-level--2").on("click", functon() {
              // THIS IS 'NOT THIS'
              const _notthis = $(".aside-list .aside-item .name-link-level--2").not(this);
              // SHOW SUB MENU AND ADD CLASS ACTIVE
              $(this).siblings(".list-link").slideToggle();
              $(this).toggleClass("active");
              _notthis.siblings(".list-link").slideUp();
              _notthis.removeClass("active");
       });
}

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
                            listLinkChild.ech(function() {
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
              listLink.each(fuction() {
                     let allHref = $(this).attr("href");
                     if (allHref.includes(url)) {
                            $(this).parents(".aside-item").addClass("active");
                            $(this).parents(".list-link").slideToggle();
                     }
              });
       }
}

function closeAsideMenu() {
       if ($(window).width() < 1024) {
              $("body, aside").addClass("active");
       }

       $(".block-logo .button-close").on("click", functon() {
              if ($(window).width() > 1024) {
                     $(this).toggleClass("active");
                     $("body, aside").toggleClass("active");
              }
       });
}

function dropdownHeader() {
       $(".item-click-dropdown").on("click", functon() {
              $(this).siblings(".content-dropdown").slideToggle();
       });
}

function SVG() {
       jQuery("img.svg").each(functon() {
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
                            if (!$svg.attr("viewBox") &&
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
       $(".role-row").each(functon() {
              const row = $(this);
              if (row.find("input[type=checkbox]").length > 0) {
                     row.addClass("role-checkbox");
              }
       });

       $(".role-checkbox").each(functon() {
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

              inputCheckAll.on("change", fuction(e) {
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
                     .on("change",function(e) {
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
              $(".check-all[data-checkbox-group]").each(fuction(index) {
                     const _this = $(this);
                     // LẤY HẾT TẤT CẢ TÊN NHÓM CHECK
                     const nameAllGroup = _this.attr("data-checkbox-group");
                     // CHỌN CHÍNH XÁC TÊN NHÓM
                     const thisNameGroup = $("[data-checkbox-group=" + nameAllGroup + "]");
                     // HÀM CHECK ALL
                     _this.on("change",function(e) {
                            if (e.currentTarget.checked) {
                                   thisNameGrou.each(function() {
                                          $(this).attr("checked", "checked");
                                          $(this)[0].checked = true;
                                   });
                            } else {
                                   thisNameGrou.each(function() {
                                          $(this).removeAttr("checked", "checked");
                                          $(this)[0].checked = false;
                                   });
                            }
                     });
              });
       }
       // KIỂM TRA TRẠNG THÁI NHÓM CHECK
       function getState() {
              $("[data-checkbox-group]").each(fuction() {
                     const _this = $(this);
                     // HÀM CHECK TRANG THÁI
                     _this.on("change",function() {
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
                            thisNameGroup.ech(function() {
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

function initCKEditor__GrapesJs() {
    const coreCSS = window.location.origin + "/Content/resources/css/core.min.css";
    const mainCSS = window.location.origin + "/Content/resources/css/main.min.css";
    const coreJS = window.location.origin + "/Content/resources/js/core.min.js";
    const mainJS = window.location.origin + "/Content/resources/js/main.min.js";

    // OPTIONS
    const defaultOpts = {
        container: [".grapes-html"],
        fromElement: true,
        height: "100%",
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

    // INIT GRAPESJS
    const GrapesEditor = grapesjs.init(defaultOpts);

    // INIT CKEDITOR
    const CkEditorList = document.querySelectorAll(".ck-editor");
    CkEditorList.forEach((itemCKeditor) => {
        let itemID = itemCKeditor.getAttribute("id");
        const CKeditor = CKEDITOR.replace(itemID, {
            height: 500,
            allowedContent: true,
            filebrowserBrowseUrl: "/Admin/HomeAdmin/CkfinderPopup",
        });
        CKeditor.ui.addButton('grapesJS', {
            label: "Chỉnh sửa HTML",
            command: 'grapesJS',
            toolbar: 'insert',
            icon: '../assets/images/icons/html.svg'
        });
        CKeditor.ui.addButton('TempInput', {
            label: "Chỉnh sửa HTML Input",
            command: 'TempInput',
            toolbar: 'insert',
            icon: '../assets/images/icons/temp.svg'
        });
        CKeditor.addCommand("grapesJS", {
            exec: function(item__CKeditor) {
                // OPPEN GRAPES
                openPopup();
                // DATA HERE!!!
                const dataCKEditor = item__CKeditor.getData();
                // SET DATA CỦA CKEDITOR VÀO GRAPE
                GrapesEditor.setComponents(dataCKEditor);
                // SUBMIT GRAPESJS
                $('.btn-submit-grapesJS').on('click', function(e) {
                    e.preventDefault();
                    const dataGrapesHTML = GrapesEditor.getHtml();
                    item__CKeditor.setData(dataGrapesHTML);
                    closePopup();
                });
            }
        });
        CKeditor.addCommand("TempInput", {
            exec: function(item__CKeditor) {
                // OPPEN GRAPES
                openPopupTempInput();
                // DATA HERE!!!
                // const dataCKEditor = item__CKeditor.getData();
                // SET DATA CỦA CKEDITOR VÀO GRAPE
                // GrapesEditor.setComponents(dataCKEditor);
                // SUBMIT GRAPESJS
                $('.btn-submit-TempInput').on('click', function(e) {
                    e.preventDefault();
                    // SUBMIT GRAPESJS
                    const formData = new FormData();
                    $(".popup__TempInput .form-group input").each(function() {
                        const name = $(this).attr("name");
                        const value = $(this).val();
                        formData.append(name, value);
                    });
                    $(".popup__TempInput form .form-group textarea").each(function() {
                        const name = $(this).attr("name");
                        const value = $(this).val();
                        formData.append(name, value);
                    });
                    const data1 = formData.get("img1");
                    const data2 = formData.get("img2");
                    const data3 = formData.get("img3");
                    const data4 = formData.get("img4");
                    const data5 = formData.get("text1");
                    const data6 = formData.get("text2");
                    const dataSrc = "<div class='__main--detail--news'><div class='img-for-detail-post'> <img src='" + data1 + "' alt='something'></div><div class='detail-content--post'><p>" + data5 + "</p></div><div class='img-for-detail-post-2'><div class='row'><div class='col-8'><img src='" + data2 + "' alt='something'></div><div class='col-4'><img src='" + data3 + "' alt='something'><img src='" + data4 + "' alt='something'></div></div></div><div class='detail-content--post'><p>" + data6 + "</p></div></div>";
                    item__CKeditor.setData(dataSrc);
                    closePopupTempInput();
                });
            }
        });
    });

    // CLOSE GRAPES
    $('.btn-close-grapesJS').on('click', function(e) {
        closePopup();
    })

    // ALL SMALL FUNTION
    function openPopup() {
        $('.main__inner').addClass('overlay');
        $('.popup__grapesJS').addClass('show');
        $('body').addClass('no-scroll');
    }

    // CLOSE POPUP
    function closePopup() {
        $('.popup__grapesJS').removeClass('show');
        $('.main__inner').removeClass('overlay');
        $('body').removeClass('no-scroll');
        $('.btn-submit-grapesJS').unbind();
    }
    // CLOSE GRAPES
    $('.btn-close-TempInput').on('click', function(e) {
        closePopupTempInput();
    })

    // ALL SMALL FUNTION
    function openPopupTempInput() {
        $('.main__inner').addClass('overlay');
        $('.popup__TempInput').addClass('show');
        $('body').addClass('no-scroll');
    }

    // CLOSE POPUP
    function closePopupTempInput() {
        $('.popup__TempInput').removeClass('show');
        $('.main__inner').removeClass('overlay');
        $('body').removeClass('no-scroll');
        $('.btn-submit-TempInput').unbind();
    }
}


function DatePickerInit() {
       $(".date-picker").each(functon() {
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
       $(".datetime-picker").each(functon() {
              if ($(this).val().length > 0) {
                     $(this).flatpickr({
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                            time_24hr: true,
                     });
              } else {
                     $(this).flatpickr({
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                            time_24hr: true,
                            defaultDate: new Date(),
                     });
              }
       });
}

function getFileNameWhenChooseFileUpload() {
       $("input[type=file]").on("change", functon(e) {
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

       $(".btn-upload").on("click", functon(e) {
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
                     success:function(data, textStatus, jqXHR) {
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

function lockOneLanguageWhenCheckBox() {
       // CHECK BAN ĐẦU
       function checkWhenDocumentReady() {
              const dataLock = $('input[name="lock-language"]').attr("data-lock");

              if ($('input[name="lock-language"]')[0].checked === true) {
                     $("[data-lock-language]").eachfunction() {
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
                     $("[data-lock-language]").eachfunction() {
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
              $('input[name="lock-language"]').on("change", fuction() {
                     const dataLock = $(this).attr("data-lock");
                     if ($(this)[0].checked === true) {
                            $("[data-lock-language]").ech(function() {
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
                            $("[data-lock-language]").ech(function() {
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
              let later = fuction() {
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

function renderSEO() {
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

function getApiUrl() {
       $('.btn-get-url').on('click', functon() {
              const url = $(this).attr('data-url');
              const input = $(this).siblings('.input-group').find('.input-get-url');
              const btn = $(this);
              $.ajax({
                     type: "GET",
                     url: url,
                     data: "data",
                     success:function(res) {
                            if (res.Code === 200) {
                                   input.val(res.Url);
                                   input.removeClass('hidden');
                                   $(this).addClass('hidden');
                                   btn.addClass('hidden');
                            } else {
                                   console.log('res.Code is not 200');
                            }
                     }
              });
       });
}

function renderHtmlGrapes() {
    const isRender = $(".ck-editor");
    const template = "<!-- POPUP GRAPESJS HERE !!!--><div class='popup__grapesJS'><div class='grapesJS__wrapper mb-3' style='height:500px ; width: 100%'><div class='grapes-html'></div></div><div class='btn btn-danger btn-close-grapesJS mb-3'>hủy bỏ</div><div class='btn btn-success btn-submit-grapesJS mb-3'>xác nhận</div></div>";
    const template1 = "<div class='popup__TempInput'><form action=''><div class='form-row'><div class='form-group col-md-6'><input class='form-control ck-finder-input' type='text' placeholder='Hình ảnh 1' name='img1'></div><div class='form-group col-md-6'><input class='form-control ck-finder-input' type='text' placeholder='Hình ảnh 2' name='img2'></div></div><div class='form-row'><div class='form-group col-md-6'><input class='form-control' type='text' placeholder='Hình ảnh 3' name='img3'></div><div class='form-group col-md-6'><input class='form-control' type='text' placeholder='Hình ảnh 4' name='img4'></div></div><div class='form-row'><div class='form-group col-md-12'><textarea class='form-control' rows='3' placeholder='Nhập nội dung' name='text1'></textarea></div><div class='form-group col-md-12'><textarea name='text2' class='form-control' rows='3' placeholder='Nhập nội dung'></textarea></div></div></form><div class='btn btn-danger btn-close-TempInput mb-3 mr-3'>hủy bỏ</div><div class='btn btn-success btn-submit-TempInput mb-3'>xác nhận</div></div>";
    if (isRender) {
        $(template).insertAfter(".main__inner");
        $(template1).insertAfter(".main__inner");
    }
}

function tableDrap() {
    $("#table-sortable").sortable({
        stop: function(event, ui) {
            const listStt = document.querySelectorAll("#table-sortable tr");
            listStt.forEach((element, index) => {
                $(element).children("td").eq(0).text(index + 1);
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    multipleSelect();
    notifyAdmin();
    SVG();
    activeMenuByUrl();
    dropdownHeader();
    initializationClassAsideMenu();
    toggleAsideMenu();
    closeAsideMenu();
    ajaxFancybox();
    ajaxCheckBox();
    checkboxAllRow();
    multipCheckBoxByAttr();
    setUrlTypeLink();
    createRowTableInput();
    // DatePickerInit();
    getFileNameWhenChooseFileUpload();
    fixedLisTab();
    lockOneLanguageWhenCheckBox();
    renderSEO();
    renderHtmlGrapes();
    initCKEditor__GrapesJs();
       getApiUrl();
    tableDrap();
    // initCKEditor__TemplateInput();
    const blockMainTab = new MainTAB(".block-main .tab-container");
    const blockSubTab = new SubTAB(".block-subTab .tab-container");
});

// CHẠY KHI WINDOWN SCROLL
window.addEventListener("scroll", () => {);