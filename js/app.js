;(function() {
	'use strict';
	if ( !window.app ) {window.app={}};

	//------ '   Test   string ' -> 'Test string'
	String.prototype.normSpace = function() {
		
		return this.replace(/\s{2,}/g, ' ').trim();
	}

	//'My test string test it' -> 'My  string  it test'
	String.prototype.remove = function( substr ) {
		var str = this;
		if ( typeof substr != 'string' ) return str;
		if ( str == '' || substr == '' ) return str;
		return  str.split(substr).join('');
	}

	String.prototype.has = function(str){  return !!~this.indexOf(str)    }//return true, if String has str
	//--------
	
	var fonts = [
			  {title:'Arial', family:'Arial'}
			, {title:'Pinyon Script', family:'Pinyon Script'}
			, {title:'Tahoma', family:'Tahoma'}
			, {title:'Codystar', family:'Codystar'}
			, {title:'Monofett', family:'Monofett'}
			, {title:'Hanalei', family:'Hanalei'}
			, {title:'Ewert', family:'Ewert'}
			, {title:'Creepster', family:'Creepster'}
			, {title:'Wallpoet', family:'Wallpoet'}
			, {title:'Griffy', family:'Griffy'}
			, {title:'Faster One', family:'Faster One'}
			, {title:'Monoton', family:'Monoton'}
			, {title:'UnifrakturMaguntia', family:'UnifrakturMaguntia'}
			, {title:'Press Start 2P', family:'Press Start 2P'}
			, {title:'Freckle Face', family:'Freckle Face'}
			, {title:'Six Caps', family:'Six Caps'}
			, {title:'Homemade Apple', family:'Homemade Apple'}
			, {title:'Fontdiner Swanky', family:'Fontdiner Swanky'}
			, {title:'Frijole', family:'Frijole'}
			, {title:'Butcherman', family:'Butcherman'}
			, {title:'Vast Shadow', family:'Vast Shadow'}
			, {title:'Caesar Dressing', family:'Caesar Dressing'}
			, {title:'Cabin Sketch', family:'Cabin Sketch'}
			, {title:'Fredericka the Great', family:'Fredericka the Great'}
			, {title:'Alfa Slab One', family:'Alfa Slab One'}
			, {title:'Nosifer', family:'Nosifer'}
			, {title:'Shadows Into Light', family:'Shadows Into Light'}
			, {title:'Permanent Marker', family:'Permanent Marker'}
			, {title:'Poiret One', family:'Poiret One'}
			, {title:'Sigmar One', family:'Sigmar One'}
			, {title:'Orbitron', family:'Orbitron'}
			, {title:'Shadows Into Light Two', family:'Shadows Into Light Two'}
			, {title:'Nothing You Could Do', family:'Nothing You Could Do'}
			, {title:'Lobster', family:'Lobster'}
			, {title:'Kaushan Script', family:'Kaushan Script'}
			, {title:'Syncopate', family:'Syncopate'}
			, {title:'Indie Flower', family:'Indie Flower'}
			, {title:'Playball', family:'Playball'}
			, {title:'Pacifico', family:'Pacifico'}
			, {title:'Dancing Script', family:'Dancing Script'}
			, {title:'Architects Daughter', family:'Architects Daughter'}
			, {title:'Chewy', family:'Chewy'}
			, {title:'Rock Salt', family:'Rock Salt'}
			, {title:'Garamond', family:'Garamond'}
			, {title:'Bangers', family:'Bangers'}
			, {title:'Lobster Two', family:'Lobster Two'}
			, {title:'Georgia', family:'Georgia'}
			, {title:'Amatic SC', family:'Amatic SC'}
			, {title:'Covered By Your Grace', family:'Covered By Your Grace'}
			, {title:'Verdana', family:'Verdana'}
			, {title:'Impact', family:'Impact'}
			, {title:'Times New Roman', family:'Times New Roman'}
			, {title:'Courier New', family:'Courier New'}
			, {title:'Comic Sans MS', family:'Comic Sans MS'}
		]
		, wordList = [
			  'apple'
			, 'alphabet'
			, 'picture'
			, 'sheep'
			, 'corn'
			, 'road'
			, 'river'
			, 'sun'
			, 'computer'
			, 'fish'
			, 'boobs'
			, 'people'
		]
		, fontsLength = fonts.length
		, symbs = "qwertyuiopasdfghjklzxcvbnm".split('')
		, area = document.getElementById('area')
		, title = document.getElementById('title')
		, help = document.getElementById('help')
		, themesWrap = document.getElementById('themes')
		, themes = themesWrap.getElementsByTagName('div')
		, titleWrap = document.getElementById('title-wrap')
		, score = document.getElementById('score')
		, html = document.getElementsByTagName('html')[0]
		, startWindWidth = 1366
		, startWindHeight = 659
		, currentWind = gwh()
		, areaW = Math.min(15, parseInt( 15 * currentWind.w / startWindWidth ) )
		, areaH = Math.min(15, parseInt( 15 * currentWind.h / startWindHeight ) )
		, elemWidth = 100 / areaW
		, elemHeight = 100 / areaH
		, successFontId = {}
		, successCount = 0
		, successSelected = {}
		, errorSelected = {}
		, storage = window.localStorage || {}
		, showedWin = false
		, currentSuccessFont
		, successWord
	;
	
	;(function() {
		var elemTheme, storageTheme = storage.theme || 'black';
		
		// заполняем последнюю выбранную тему
		for (var i=0, n=themes.length; i<n; i++) {
			elemTheme = themes[i].getAttribute('theme');
			
			if ( elemTheme == storageTheme ) {
				addClass( themes[i], 'active' );
				html.setAttribute('theme', elemTheme);
			} else {
				removeClass( themes[i], 'active' );
			}
		}
	})();
	
	themesWrap.onclick = function(e) {
		var   target = e.target || e.srcElement	
			, theme = target.getAttribute('theme')
		;
		if ( !theme ) {
			return false;
		}
		
		html.setAttribute('theme', theme);
		for (var i=0, n=themes.length; i<n; i++) {
			removeClass( themes[i], 'active' );
		}
		addClass(target, 'active');
		storage.theme = theme;
		
		return false;
	}
	
	area.onclick = function(e) {
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
		successSelected = {}
		errorSelected = {}
		showedWin = false;
		currentSuccessFont = successFont;
		
		title.innerHTML = 'Where ' + successFont.title + ' ('+successCount+')?';
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
		
		writeRandWord();
		function isSuccessPosition(x, y) {
			for (var i=0; i<successCount; i++) {
				if ( allSuccessPositions[i].x == x && allSuccessPositions[i].y == y ) {
					return true;
				}
			}
			return false;
		}
	}
	
	function writeRandWord() {
		var   word = wordList[ rnd( wordList.length ) ]
			, length = word.length
			, position = {
				  x : rnd( areaW - length )
				, y : rnd( areaH - 1 )
			}
			, row = area.children[position.y]
			, cell
			, symb
		;
		if ( length >= areaW ) {
			// не помещается по горизонтали
			console.log('не поместилось');
			return false;
		}
		
		successWord = word;
		for (var i=0
			, x = position.x
			, cell = row.children[x];
			x < position.x + length && cell; 
			i++, x++) {
				
			cell = row.children[x];
			symb = word[i];
			cell.innerHTML = symb.toUpperCase() + symb.toLowerCase();
			cell.setAttribute('symb', symb);
		}
		console.log('Подсказка: ' + word);
	}
	app.writeRandWord = writeRandWord;
	
	function rnd(a) {
		return parseInt(Math.random() * a);
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
	
	titleWrap.onclick = function() {
		toggleClass(this, 'hover');
		if ( !hasClass(this, 'hover') ) {
			help.style.visibility = 'hidden';
		} else {
			help.removeAttribute('style');
		}
	}

})();
function gwh(doc){
	doc = doc || document;
	var elem  = doc.compatMode == 'CSS1Compat' ? doc.documentElement : doc.body;
	return {w:elem.clientWidth, h:elem.clientHeight};
}
function hasClass(elm, className) {
    var RE;
    try {
        RE = new RegExp('^(.*\\s)?' + className + '\\s.*$');
    } catch (e) {
        return -1;
    }
    if (RE && elm && elm.className) {
        return RE.test(' '+elm.className+' ');
    } else {
        return -2;
    }
}
function addClass( div, className ){
	div.className = ( (div.className + " ").remove(className) + className ).normSpace();
}
function removeClass(div, className){
	div.className = (div.className+'').remove(className).normSpace();
}
function toggleClass(elm, className) {
    if (elm && elm.className && hasClass(elm, className) === true) {
        removeClass(elm, className);
    } else {
        addClass(elm, className);
    }
}
