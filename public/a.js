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
					elButton.innerHTML = "Uploaded !!";
	        	} else {
	        		elButton.innerHTML = "Oops... Upload Fail >.<" + request.status;
	        	}

	        	var result = request.responseText;
	        	console.log("onload test -> " , result);
	        };

		}

		function submitFile() {

			elForm.addEventListener("submit" , function(e) {
				e.preventDefault();
				elButton.innerHTML = "Uploading.........";

				var files = elSelect.files;
				var formData = new FormData();

				alert(files[0]);
				alert(files[0].name);
				formData.append('photo', files[0], files[0].name);

				//Ajax
				sendAjax("POST", "http://localhost:8019/photoUpload", formData);
			});
		}

		submitFile();


})();
