;(function() {
	'use strict';
	if ( !window.console ) {// ie
		window.console = {
			error : function(){}
			, log : function(){}
		};
	}
	
	var Fonts = function(params) {
		return this.init(params);
	}
	
	Fonts.prototype = {
		init : function(params) {
			params = params || {};
			var that = this;
			
			that.initArea();
			
			return that;
		}
		, initArea : function() {
			var that = this;
			
			that.area = typeof params.area == 'string' ? document.getElementById(params.area) : params.area;
			that.area = that.area || document.getElementById('area');
			if ( !(that.area instanceof Element) ) {
				console.error('Area is not an Element');
			}
			
			that.area.onclick = function(e) {
				var   target = e.target || e.srcElement
					, id = target.getAttribute('font-id')
					, successSelectedCount = 0
					, errorSelectedCount = 0
					, percent
					, symb
				;
				
				if ( +id != id ) {
					return;
				}
				
				if ( successFontId[ id ] ) {
					target.className = 'success';
					successSelected[id] = true;
				} else {
					target.className = 'error';
					errorSelected[id] = true;
				}
				
				for (var key in successSelected) {
					successSelectedCount++;
				}
				for (var key in errorSelected) {
					errorSelectedCount++;
				}
				
				score.innerHTML = 'Success ('+successSelectedCount+') ' + ', Errors ('+ errorSelectedCount +')';
				title.innerHTML = 'Where ' + currentSuccessFont.title + ' ('+(successCount - successSelectedCount)+')?';
				
				percent = 100 * successSelectedCount / (successSelectedCount + errorSelectedCount);
				if ( !showedWin && successSelectedCount >= successCount ) {
					showedWin = true;
					alert('You win. Score: ' + Math.round(percent) + '%');
				}
				
				symb = target.getAttribute('symb');
				if ( symb ) {
					addClass(target, 'symb-success');
				}
			}
		}
	};
	
})();