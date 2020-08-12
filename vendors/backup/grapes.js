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
			success: function (res) {
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

	GrapesJS.find("[data-src]").each(function () {
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
			success: function (res) {
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
				success: function (res) {
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
			uploadForm.ondrop = function (e) {
				this.className = "";
				e.preventDefault();
				uploadFile(e);
				return;
			};
			$(uploadInput).change(uploadFile);
			editor.uploaderModified = true;
		}
	});

	$("#btn-grapesjs-import-html").on("click", function (e) {
		e.preventDefault();
		ckeditor.insertHtml(editor.getHtml());
		$("#grapesjs-popup").addClass("active");
	});

	$("#btn-grapesjs-popup-discard").on("click", function (e) {
		e.preventDefault();
		ckeditor.setData("");
		$("#grapesjs-popup").removeClass("active");
	});

	$("#btn-grapesjs-popup-save").on("click", function (e) {
		const data = ckeditor.getData();
		editor.destroy();
		ckeditor.setData("");
		$("#grapesjs-popup").removeClass("active");
		$("#grapes-html").html(data);
		editor = grapesjs.init(defaultOpts);
	});

	$("#btn-grapesjs-popup-select").on("click", openPopupTemplate);

	$("body").on("click", "#btn-get-template", function (e) {
		ckeditor.setData("");
		const id = Number($("#template-select-popup select").val());
		const item = templates.filter((template) => template.Id === id);
		setTimeout(() => {
			const storeHTML = document.createElement("div");
			$(storeHTML).html(item[0].Text);

			$(storeHTML)
				.find("[data-src]")
				.each(function () {
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

	$("#btn-grapesjs-save-html").on("click", function (e) {
		e.preventDefault();
		const storeHTML = document.createElement("div");
		const htmlEdited = editor.getHtml();
		$(storeHTML).html(htmlEdited);
		$(storeHTML)
			.find(".temporary-data-src")
			.each(function () {
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