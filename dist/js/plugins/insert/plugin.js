function getTemplateList(editor) {
	$.ajax({
		url: '/api/get-templates.json',
		type: 'get',
		success: function(res) {
			if (res.Code === 200) {
				let optionsHTML = '';
				const templateList = res.Templates;
				templateList.forEach(template => {
					optionsHTML += `<option value="${template.id}">${template.text}</option>`;
				});
				const popupHTMLDom = document.createElement('div');
				popupHTMLDom.classList.add('d-none')
				popupHTMLDom.innerHTML = `
				<div class="template-select-popup" id="template-select-popup">
					<div class="block-title">
						<h3>Chọn template</h3>
					</div>
					<div class="form-group form-select">
						<select>${optionsHTML}</select>
					</div>
					<div class="form-group form-button">
						<a class="btn btn-primary btn-request-template">Nhập template</a>
					</div>
				</div>`;
				document.body.appendChild(popupHTMLDom);
				document.querySelector('#template-select-popup .btn-request-template').addEventListener('click', getTemplate)
			}
		}
	});
}

function getTemplate(editor) {

	const id = document.querySelector('#template-select-popup select').value;
	$.ajax({
		url: 'api/template.html',
		data: {
			templateId: id
		},
		type: 'get',
		// type: 'get',
		success: function(res) {
			editor.insertHtml(res);
		},
		complete: function() {
			$.fancybox.close(true);
		}
	})
}

function openPopupTemplate() {
	$.fancybox.open({
		type: 'inline',
		src: '#template-select-popup',
		opts: {
			hash: false,
			touch: false,
		}
	})
}


CKEDITOR.plugins.add('insert', {
	icons: 'insert',
	init: function(editor) {
		getTemplateList(editor);
		editor.addCommand('insertHTML', {
			exec: function(editor) {
				openPopupTemplate();
			}
		});
		editor.ui.addButton('Insert', {
			label: 'Insert HTML',
			command: 'insertHTML',
			toolbar: 'insert'
		});
	}
});