;(function() {
	'use strict';
	if ( !window.app ) {window.app={}};
	
	var fonts = [
			  {title:'Arial', family:'Arial'}
			, {title:'Tahoma', family:'Tahoma'}
			, {title:'Garamond', family:'Garamond'}
			, {title:'Georgia', family:'Georgia'}
			, {title:'Verdana', family:'Verdana'}
			, {title:'Impact', family:'Impact'}
			, {title:'Times New Roman', family:'Times New Roman'}
			, {title:'MS Sans Serif', family:'MS Sans Serif'}
			, {title:'Courier New', family:'Courier New'}
			, {title:'Comic Sans MS', family:'Comic Sans MS'}
		]
		, fontsLength = fonts.length
		, symbs = "qwertyuiopasdfghjklzxcvbnm".split('')
		, area = document.getElementById('area')
		, title = document.getElementById('title')
		, titleWrap = document.getElementById('title-wrap')
		, score = document.getElementById('score')
		, startWindWidth = 1366
		, startWindHeight = 659
		, currentWind = gwh()
		, areaW = parseInt( 15 * currentWind.w / startWindWidth )
		, areaH = parseInt( 15 * currentWind.h / startWindHeight )
		, elemWidth = 100 / areaW
		, elemHeight = 100 / areaH
		, successFontId = {}
		, successCount = 0
		, successSelected = 0
		, errorSelected = 0
	;
	
	area.onclick = function(e) {
		var   target = e.target || e.srcElement
			, id = target.getAttribute('font-id')
		;
		
		if ( +id != id ) {
			return;
		}
		
		if ( successFontId[ id ] ) {
			target.className = 'success';
			successSelected++;
		} else {
			target.className = 'error';
			errorSelected++;
		}
		
		score.innerHTML = 'Success ('+successSelected+') ' + ', Errors ('+ errorSelected +')';
	}
	
	function genereateArea(_successFontIndex) {
		area.innerHTML = '';
		
		var   successFontIndex = _successFontIndex || parseInt( Math.random() * fontsLength )
			, successFont = fonts[successFontIndex]
			, count = areaW
			, allSuccessPositions = createSuccessPositions(count)
			, params
			, fontId = 0
			, elem
			, row
		;
		successCount = count;
		successFontId = {};
		successSelected = 0
		errorSelected = 0
		
		title.innerHTML = successFont.title + ' ('+successCount+')';
		titleWrap.style.fontFamily = successFont.family;
		
		for (var i=0; i<areaH; i++) {
			row = document.createElement('div');
			row.className = 'row';
			row.style.height = elemHeight + '%';
			area.appendChild(row);
			
			for (var j=0; j<areaW; j++) {
				fontId++;
				params = {
					fontId : fontId
				};
				
				if ( isSuccessPosition(i, j) ) {
					params.family = successFont.family;
					successFontId[ fontId ] = true;
				} else {
					params.family = randomFont(successFontIndex).family;
				}
				
				elem = createElem(params);
				row.appendChild(elem);
			} 
		}
		
		function isSuccessPosition(x, y) {
			for (var i=0; i<successCount; i++) {
				if ( allSuccessPositions[i].x == x && allSuccessPositions[i].y == y ) {
					return true;
				}
			}
			return false;
		}
	}
	
	function createSuccessPositions(count) {
		var positions = [], l, r, out=[];
		
		for (var i=0; i<areaH; i++) {
			for (var j=0; j<areaW; j++) {
				positions.push({x:i,y:j});
			} 
		} 
		
		for (var i=0; i<count; i++) {
			l = positions.length;
			r = parseInt(Math.random() * l);
			out.push(positions[r]);
			positions.splice(r, 1);
		}
		
		return out;
	}
	
	function randomFont(successIndex) {
		if ( successIndex != undefined ) {
			var _fonts = fonts.slice();
			_fonts.splice(successIndex, 1);
			
			return _fonts[parseInt( Math.random() * (fontsLength - 1) )];
		} else {
			return fonts[parseInt( Math.random() * fontsLength )];
		}
	}
	
	function createElem(params) {
		var   div = document.createElement('div')
			, symb = symbs[parseInt( Math.random() * symbs.length )]
			, style = div.style
		;
		
		div.innerHTML = symb.toUpperCase() + symb.toLowerCase();
		style.width = elemWidth + '%';
		style.fontFamily = params.family;
		div.setAttribute('font-id', params.fontId);
		
		return div;
	}
	
	
	app.genereateArea = genereateArea;
	genereateArea();
})();
function gwh(doc){
	doc = doc || document;
	var elem  = doc.compatMode == 'CSS1Compat' ? doc.documentElement : doc.body;
	return {w:elem.clientWidth, h:elem.clientHeight};
}