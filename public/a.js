(function() {

		var elForm = document.getElementById("fileForm");
		var elSelect = document.getElementById("imgUpload");
		var elButton = document.getElementById("upload-button");

		function sendAjax(sMethod, sUrl, sFormData) {
			var _method = sMethod || "GET";
			var _url 	= sUrl || "http://localhost:8019/jsonTest";
			var _sFormData = sFormData || null;

			var request = new XMLHttpRequest();
	        request.open( _method, _url , true);
	        request.send(_sFormData);

	        request.onload = function() {

	        	if(request.status === 200) {

	        		try {
						elButton.innerHTML = "Uploaded !!";
			        	var result = JSON.parse(request.responseText);
			        	console.log("file Info -> " , result.aPhotoInfo[0].path,result.aPhotoInfo[1].path);
	        		} catch(error) {
	        			console.log("error....", error.message);
	        		}

	        	} else {

	        		elButton.innerHTML = "Oops... Upload Fail >.<" + request.status;

	        	}

	        };

		}

		function submitFile() {

			elForm.addEventListener("submit" , function(e) {
				e.preventDefault();
				elButton.innerHTML = "Uploading.........";

				var files = elSelect.files;
				var formData = new FormData();

				for (var i = files.length - 1; i >= 0; i--) {
					formData.append('photo', files[i], files[i].name);
				}

				//Ajax
				sendAjax("POST", "http://localhost:8019/photoUpload", formData);
			});
		}

		submitFile();

})();
