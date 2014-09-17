/*
* _x
* Ultra-simple ajax. Same syntax of $.ajax().
* 
* Simplified from:
* Twix v1.0 - a lightweight library for making AJAX requests.
* Author: Neil Cowburn (neilco@gmail.com)
* Copyright (c) 2013 Neil Cowburn (http://github.com/neilco/)
*/

(function (exports) {
	
    exports._x = {
	
		req: function(options) {
			
	        options = options || {url:""};
	        options.type = options.type || 'GET';
	        options.headers = options.headers || {};
	        options.timeout = parseInt(options.timeout) || 0;
	        options.success = options.success || function() {};
	        options.error = options.error || function() {};
	        options.async = typeof options.async === 'undefined' ? true : options.async;

	        var xhr = new XMLHttpRequest();
	        if (options.timeout > 0) {
	            xhr.timeout = options.timeout;
	            xhr.ontimeout = function () { 
	                options.error('timeout', 'timeout', xhr); 
	            }
	        }
	        xhr.open(options.type, options.url, options.async);

	        for (var i in options.headers) {
	            if (options.headers.hasOwnProperty(i)) {
	                xhr.setRequestHeader(i, options.headers[i]);
	            }
	        }

	        xhr.send(options.data);
	        xhr.onreadystatechange = function() {
	            if (this.readyState == 4 && this.status == 200) {
	                var data = this.responseText;
	                var contentType = this.getResponseHeader('Content-Type');
	                if (contentType && contentType.match(/json/)) {
	                    data = JSON.parse(this.responseText);
	                }
	                options.success(data, this.statusText, this);
	            } else if (this.readyState == 4) {
	                options.error(this.status, this.statusText, this);
	            }
	        };

	        if (options.async == false) {
	            if (xhr.readyState == 4 && xhr.status == 200) {
	                options.success(xhr.responseText, xhr);
	            } else if (xhr.readyState == 4) {
	                options.error(xhr.status, xhr.statusText, xhr);
	            }
	        } 

	        return xhr;
	    }
	
	};
	
})(window);
