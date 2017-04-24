// add event handler realization
var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

// variables
var aLoops = []; // sound loops

// all the buttons
var aBtns = document.querySelectorAll('#nav li');

function logOut() {
	
	window.open("index.html","_self");
	
};

sessionIsValid = function(session) {
	if (session == "time out") {
		mscAlert({
			title : "Session time out.",
			onOk : function(val) {
				window.open("index.html", "_self");
			}
		});
		return false;
	} else if (session == "denied") {
		mscAlert({
			title : "Access Denied. Please log in.",
			onOk : function(val) {
				window.open("index.html", "_self");
			}
		});
		return false;
	}
	return true;
}