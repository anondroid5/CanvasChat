function ColorPicker(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

ColorPicker.prototype = {
	/**
	 * コンストラクタ
	 */
	initialize: function(){
		//ピッカーUI構築
		ColorPicker.activePickerId = '0';
		$.farbtastic('#colorPicker', function(color){
			if(color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/)){
				r = parseInt(RegExp.$1, 16);
				g = parseInt(RegExp.$2, 16);
				b = parseInt(RegExp.$3, 16);
				$('#rSlider').slider({
					min: 0,
					max: 255,
					step: 1,
					value: r,
					slide: function(event, ui){
						$('#rNum').html(ui.value);
						ColorPicker.prototype.setRGBA($('#rNum').html(), $('#gNum').html(), $('#bNum').html(), $('#alphaNum').html());
					}
				});
				$('#rNum').html(r);

				$('#gSlider').slider({
					min: 0,
					max: 255,
					step: 1,
					value: g,
					slide: function(event, ui){
						$('#gNum').html(ui.value);
						ColorPicker.prototype.setRGBA($('#rNum').html(), $('#gNum').html(), $('#bNum').html(), $('#alphaNum').html());
					}
				});
				$('#gNum').html(g);

				$('#bSlider').slider({
					min: 0,
					max: 255,
					step: 1,
					value: b,
					slide: function(event, ui){
						$('#bNum').html(ui.value);
						ColorPicker.prototype.setRGBA($('#rNum').html(), $('#gNum').html(), $('#bNum').html(), $('#alphaNum').html());
					}
				});
				$('#bNum').html(b);

				new PenWidthManager().updatePenSample();

			}
			$('#colorPickerCell_' + ColorPicker.activePickerId).css('background-color', color);
			$('#currentColor').css('background-color', color);
			var id = ColorPicker.activePickerId;
			new Storage().set('color'+ id, color);
		});
		$('#alphaSlider').slider({
			min: 0,
			max: 100,
			step: 1,
			value: 100,
			slide: function(event, ui){
				$('#alphaNum').html(ui.value);
			}
		});



		//色選択セル設定
		ColorPicker.cellNum = 0;
		ColorPicker.defaultColor = new Array('#000000', '#555555', '#aaaaaa', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ff00ff', '#ffff00');
		$('.colorCell').each(function(){
			//デフォルトの色を設定
			var background = '#ffffff';
			if(ColorPicker.defaultColor[ColorPicker.cellNum] !== undefined){
				background = ColorPicker.defaultColor[ColorPicker.cellNum]
			}
			//保存済みの色を取得
			var storageColor = new Storage().get('color'+ ColorPicker.cellNum);
			if(storageColor !== undefined){
				background = storageColor;
			}
			$(this).attr('id', 'colorPickerCell_' + ColorPicker.cellNum).css('background-color', background).click(function(){
				ColorPicker.activePickerId = $(this).attr('id').replace('colorPickerCell_', '');
				$.farbtastic('#colorPicker').setColor(ColorPicker.prototype.getColorHex($(this).css('background-color')));
				$('.selectColor').css('border', '').attr('class', 'colorCell');
				$(this).css('border', '2px solid #8888ff').attr('class', 'selectColor');
			});
			ColorPicker.cellNum = ColorPicker.cellNum + 1;
		});
		$.farbtastic('#colorPicker').setColor(ColorPicker.prototype.getColorHex($('#colorPickerCell_0').css('background-color')));
		ColorPicker.activePicker = $('#colorPickerCell_0');
		$('#colorPickerCell_0').css('border', '2px solid #8888ff').attr('class', 'selectColor');

	},
	/**
	 * rgb(xx,xx,xx)形式を#xxxxxx形式に変換
	 */
	getColorHex: function(color){
		if(color.match(/rgb\s*\((\d+),\s*(\d+),\s*(\d+)\s*\)/)){
			r = parseInt(RegExp.$1, 10);
			g = parseInt(RegExp.$2, 10);
			b = parseInt(RegExp.$3, 10);
			colorCode = '#' +
					(((r.toString(16).length == 1) ? '0' : '') + r.toString(16)) +
					(((g.toString(16).length == 1) ? '0' : '') + g.toString(16)) +
					(((b.toString(16).length == 1) ? '0' : '') + b.toString(16));

			return colorCode;
		}
	},
	/**
	 * カラーコードをrgba()で取得
	 */
	getColorRGBA: function(){
		if($.farbtastic('#colorPicker').color.match(/rgb\s*\((\d+),\s*(\d+),\s*(\d+)\s*\)/)){
			r = parseInt(RegExp.$1, 10);
			g = parseInt(RegExp.$2, 10);
			b = parseInt(RegExp.$3, 10);
			a = ($('#alphaNum').html() / 100.0);
			return 'rgba(' + r + ', ' + g + ', ' + ', ' + b + ', '  + a + ')';
		}

		if($.farbtastic('#colorPicker').color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/)){
			r = parseInt(RegExp.$1, 16);
			g = parseInt(RegExp.$2, 16);
			b = parseInt(RegExp.$3, 16);
			a = ($('#alphaNum').html() / 100.0);
			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		}
		return $.farbtastic('#colorPicker').color;
	},
	/**
	 * アクティブピッカーに色設定
	 */
	setRGBA: function(r,g,b,a){
		$('#colorPickerCell_' + ColorPicker.activePickerId).css('background-color', ColorPicker.prototype.getColorHex('rgb(' + r + ', ' + g + ', ' + b + ')'));
		$.farbtastic('#colorPicker').setColor(ColorPicker.prototype.getColorHex($('#colorPickerCell_' + ColorPicker.activePickerId).css('background-color')));

		var id = ColorPicker.activePickerId;
		new Storage().set('color'+ id, ColorPicker.prototype.getColorHex('rgb(' + r + ', ' + g + ', ' + b + ')'));
	}
}
