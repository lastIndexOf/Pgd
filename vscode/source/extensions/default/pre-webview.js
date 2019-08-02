(function () {
	var styles;
	var realFrame;
	document.body.style.margin = '0';
	document.body.style.padding = '0';

	window.acquireVsCodeApi = function () {
		var vscode = {};

		return vscode;
	}

	window.addEventListener('message', function (e) {
		var type = e.data.$type;
		var data = e.data.$data;

		switch (type) {
			case 'styles':
				return styles = data;
			case 'content':
				return setContent(data[0] && data[0].contents);
			case 'message':
				return realFrame.contentWindow.postMessage({
					type: 'message',
					data: data
				}, '*');
			default:
				return;
		}
	});

	function setContent (text) {
		if (realFrame) {
			var newDocument = new DOMParser().parseFromString(text, 'text/html');
			realFrame.contentDocument.body.innerHTML = newDocument.body.innerHTML;
			return;
		}
		// var newDocument = new DOMParser().parseFromString(text, 'text/html');
		var newFrame = document.createElement('iframe');
		realFrame = newFrame;
		// newFrame.src = "data:text/html;charset=utf-8," + encodeURIComponent(text);
		newFrame.style.width = '100%';
		newFrame.style.height = '100%';
		newFrame.style.border = '0';
		newFrame.style.outline = '0';
		document.body.appendChild(newFrame);
		newFrame.contentDocument.documentElement.innerHTML = text;
		if (styles && styles[1] === 'vscode-dark') {
			newFrame.contentDocument.documentElement.className = 'vscode-dark';
			newFrame.contentDocument.documentElement.style.color = '#c2c2c2';
		}
		Array.from(newFrame.contentDocument.scripts).forEach(function (script) {
			script.parentElement.removeChild(script);
			if (script.innerHTML) {
				var tag = newFrame.contentDocument.createElement('script');
				tag.innerHTML = script.innerHTML;
				newFrame.contentDocument.body.appendChild(tag);
			} else {
				var tag = newFrame.contentDocument.createElement('script');
				tag.src = script.src;
				tag.async = script.async;
				tag.defer = script.defer;
				newFrame.contentDocument.body.appendChild(tag);
			}
		});

		window.postMessage({
			$type: 'onready'
		});

		newFrame.contentWindow.addEventListener('message', function (e) {
			var type = e.data.$type;
			var data = e.data.$data;

			switch (type) {
				case 'message':
					return window.postMessage({
						$type: 'message',
						$data: data
					});
			}
		});
		// document.documentElement.innerHTML = newDocument.documentElement.innerHTML;
	}
})();