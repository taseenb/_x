_x
==

Ultra-simple ajax. Same syntax of jQuery ajax ( http://api.jquery.com/jquery.ajax/ ).

Syntax:

```
_x.req({
		url: "example.json",
		success: function(data) {
			console.log(data);
		},
		error: function(status, statusText, xhr) {
			console.log(status, statusText, xhr);
		}
	});
```
