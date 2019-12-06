var previewNode = document.querySelector("#template-preview");
var previewTemplate = previewNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

var myDropzone = new Dropzone(".upload-file", { // Make the whole body a dropzone
	url: "http://192.168.1.106/file-upload", // Set the url
	// uploadMultiple: true,
	previewTemplate: previewTemplate,
	parallelUploads: 100,
	uploadMultiple: true,
	previewsContainer: ".upload-file #list-image-preview",
	clickable: ".upload-file .upload-image-wrapper"
});

myDropzone.on('sendingmultiple', function(res, xhr, formData) {
	formData.append('folder', '/Upload/Banner');
})

myDropzone.on('successmultiple', function(files, response) {
	var listNewImages = Array.from(document.querySelectorAll('#list-image-preview .file-item'));
	var listImageDefault = document.getElementById('list-image');
	listNewImages.forEach(function(item, index) {
		item.querySelector('.name').innerHTML = response[index].name;
		item.querySelector('.url').value = response[index].url;
		item.querySelector('.btn-delete').setAttribute('onclick', `deleteImage(this,'${response[index].url}')`);
		item.querySelector('.btn-copy-url').addEventListener('click', function() {
			var urlInput = item.querySelector('.btn-copy-url').previousSibling;
			urlInput.select();
			urlInput.focus();
			urlInput.setSelectionRange(0, 99999);
			document.execCommand("copy");
		})
		item.classList.remove('dz-processing', 'dz-image-preview', 'dz-success', 'dz-complete')
		listImageDefault.append(item);
	})
})

var btnCopy = Array.from(document.querySelectorAll('.file-item .btn-copy-url'));
btnCopy.forEach(function(btn) {
	btn.addEventListener('click', function() {
		var urlInput = btn.previousSibling;
		urlInput.select();
		urlInput.focus();
		urlInput.setSelectionRange(0, 99999);
		document.execCommand("copy");
	})
})

function deleteImage(e, param) {
	$.ajax({
		url: 'http://192.168.1.106/delete-image',
		data: {
			url: param
		},
		type: 'post',
		beforeSend: function() {
			$(e).attr('disabled', 'disabled')
		},
		success: function(response) {
			if (response.Code === 200) {
				$(e).parents('.file-item').remove();
			} else {
				console.log(response.Message)
			}
		},
		complete: function() {
			$(e).removeAttr('disabled')
		}
	})
}