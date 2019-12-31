var previewNode = document.querySelector("#template-preview");
var previewTemplate = previewNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);
var dataFolder = $('#dataFolder').attr('data-folder');

var myDropzone = new Dropzone(".upload-file", { // Make the whole body a dropzone
	url: '/file-upload', // Set the url
	// uploadMultiple: true,
	previewTemplate: previewTemplate,
	parallelUploads: 100,
	uploadMultiple: true,
	previewsContainer: ".upload-file #list-image-preview",
	clickable: ".upload-file .upload-image-wrapper"
});

myDropzone.on('sendingmultiple', function(res, xhr, formData) {
	formData.append('folder', dataFolder);
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
		url: '/delete-image',
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

// UPLOAD FILE
var template = document.querySelector("#template");
if (template) {
	var templateNew = template.parentNode.innerHTML;
	o.parentNode.removeChild(template);
	var itemDropZone = new Dropzone(".upload-file", {
		url: '/file-upload',
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