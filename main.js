'strict'
class Editor{

	constructor ()  {
		this.contentEditor = document.querySelector('.content__editor');
		this.contentPreview = document.querySelector('.content__preview');
		this.contentSave = document.querySelector('.content__save');
		this.contentPreviewBtn = document.querySelector('.btn--preview');
		this.contentSaveBtn = document.querySelector('.btn--save');
		this.btnLink = document.querySelector('.btn__link');
		this.emojiE = document.querySelectorAll('.emojiE');

		this.previewContent ();
		this.saveContent ();
		this.getLink();

		this.imageDragDrop();

		this.getEmoji();
		this.getImage();
	}

	imageDragDrop() {
		if (window.FileReader) {
			  	this.addEventHandler(window, 'load', function() {
			    var drop = document.querySelector('.content__editor');

			    function cancel(e) {
			      if (e.preventDefault) {
			        e.preventDefault();
			      }
			      return false	;
			    }

			    // Tells the browser that we *can* drop on this target
			    this.addEventHandler(drop, 'dragover', cancel);
			    this.addEventHandler(drop, 'dragenter', cancel);

			    this.addEventHandler(drop, 'drop', function(e) {
			      e = e || window.event; // get window.event if e argument missing (in IE)   
			      if (e.preventDefault) {
			        e.preventDefault();
			      } // stops the browser from redirecting off to the image.

			      var dt = e.dataTransfer;
			      var files = dt.files;
			     
			      for (var i = 0; i < files.length; i++) {
			        var file = files[i];
			        var reader = new FileReader();

			        //attach event handlers here...

			        reader.readAsDataURL(file);
			        this.imageFileReader(reader,file);
			      }
			      return false;
			    }.bind(this));

			    Function.prototype.bindToEventHandler = function bindToEventHandler() {
			      var handler = this;
			      var boundParameters = Array.prototype.slice.call(arguments);
			      console.log(boundParameters);
			      //create closure
			      return function(e) {
			        e = e || window.event; // get window.event if e argument missing (in IE)   
			        boundParameters.unshift(e);
			        handler.apply(this, boundParameters);
			      }
			    };
			  }.bind(this));
		}
	}

	imageFileReader(reader, file){
  		this.addEventHandler(reader, 'loadend', function(file) {
          var bin = this.result;
          var newFile = document.createElement('span');
          drop.appendChild(newFile);         
          var img = document.createElement("img");
          img.file = file;
          img.src = bin;
          img.style.maxWidth = "400px";
          drop.appendChild(img);
        }.bindToEventHandler(file));

         Function.prototype.bindToEventHandler = function bindToEventHandler() {
	      var handler = this;
	      var boundParameters = Array.prototype.slice.call(arguments);
	      console.log(boundParameters);
	      //create closure
	      return function(e) {
	        e = e || window.event; // get window.event if e argument missing (in IE)   
	        boundParameters.unshift(e);
	        handler.apply(this, boundParameters);
	      }
	    };

	}
	
	addEventHandler(obj, evt, handler) {
	 	obj.addEventListener(evt, handler, false);
	}

	previewContent ()  {
		this.contentPreviewBtn.addEventListener('click', function() {

			var preview  = this.contentEditor.innerHTML;

			this.contentPreview.innerHTML = preview;

		}.bind(this));
	}

	saveContent ()  {
		this.contentSaveBtn.addEventListener('click', function() {

			var contentEditorHTML  = this.contentEditor.innerHTML;

			if(contentEditorHTML.length > 0){
				this.contentSave.querySelector('.content__html').innerHTML = contentEditorHTML;
				this.contentEditor.innerHTML = "";
				
				if(!this.contentSave.querySelector('.btn')){
					this.editBtn();	
				}	
			}

		}.bind(this));
	}

	editBtn() {
		var editPost = document.createElement("button");
			editPost.innerText = "Edit Post";
		this.contentSave.appendChild(editPost);	
		editPost.className = "btn"
		this.editPostContent(editPost);	
	}

	editPostContent(btn){
		btn.addEventListener('click', function() {
			this.contentEditor.focus();
			var editContent  = this.contentSave.querySelector('.content__html').innerHTML;
			this.contentEditor.innerHTML = editContent;

		}.bind(this));
	}

	getLink() {
		this.btnLink.addEventListener('click', function(){
			var url = prompt("Enter the URL");
  			document.execCommand("createLink", false, url);
		}.bind(this))
  		
	}

	getEmoji () {

		this.emojiE.forEach(function(e) {
			e.addEventListener("click", function(){
				var emojiData = e.getAttribute('data-emoji');
				this.contentEditor.innerText += String.fromCodePoint(emojiData);
			}.bind(this));
		}.bind(this));

	}

	getImage() {
		this.addEventHandler(window, 'change', function() {

		var editor = this.contentEditor;	
		  var file = document.querySelector("input[type=file]").files[0];

		  var reader = new FileReader();

		  var dataURI;

		  reader.addEventListener(
		    "load",
		    function() {
		      dataURI = reader.result;

		      var img = document.createElement("img");
		      img.src = dataURI;
		      img.style.maxWidth = "400px";
		      editor.appendChild(img);
		    },
		    false
		  );

		  if (file) {
		    reader.readAsDataURL(file);
		  }
		}.bind(this));
	}
 }

new Editor();


