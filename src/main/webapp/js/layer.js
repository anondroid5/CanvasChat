function Layer(layerId){
	this.id = layerId;
	this.name = 'NormalLayer_' + layerId;
	this.text = 'レイヤー' + (layerId + 1);
	this.active = false;
	//キャンバス作成
	this.canvas = new Canvas(layerId, 0);
	//レイヤーリストアイテム作成
	$('#layerSelect').prepend('<tr><td id="' + this.name + '"><input type="checkbox" id="layerShow_' + this.id + '" checked><span id="layer_' + this.id + '">' + this.text + '</span><br><div id="alphaSliderFor_' + this.id + '" class="layerAlphaSlider"></div><div id="layer_' + this.id + '_alpha">アルファ値:<span id="alphaNumFor_' + this.id + '">100</span>%</div></td></tr>');
	$('#layerShow_' + this.id).change(function(){
		check = $(this).is(':checked');
		layer = $(this).attr('id').replace('layerShow_', '');
		if(!check){
			//チェック外れた
			new LayerManager().getLayer(layer).onHide();
		}else{
			//チェックされた
			new LayerManager().getLayer(layer).onShow();
		}
	});
	$('#layer_' + this.id).click(function(){
		new LayerManager().setActiveLayer($(this).attr('id').replace('layer_', ''));
	});
	$('#layer_' + this.id + '_alpha').click(function(){
		new LayerManager().setActiveLayer($(this).attr('id').replace('layer_', '').replace('_alpha', ''));
	});

	$('#alphaSliderFor_' + this.id).slider({
		min: 0,
		max: 100,
		step: 1,
		value: 100,
		slide: function(event, ui){
			id = $(this).attr('id').replace('alphaSliderFor_', '');
			befAlpha = parseFloat($('#alphaNumFor_' + id).html()) / 100.0;
			$('#alphaNumFor_' + id).html(ui.value);
			new LayerManager().setAlpha(id ,befAlpha, parseFloat(ui.value+1) / 100.0);
		}
	});
}

Layer.prototype = {
		getId: function(){
			return this.id;
		},
		/**
		 * レイヤー名取得
		 * @return レイヤー名
		 */
		getName: function(){
			return this.name;
		},
		/**
		 * フォーカスが入った時のイベント
		 */
		onForcus: function(){
			$('#' + this.name).css({
				backgroundColor: '#0000ff',
				color: '#ffffff'
			});
		},
		/**
		 * フォーカスが外れた時のイベント
		 */
		onUnforcus: function(){
			$('#' + this.name).css({
				backgroundColor: '#ffffff',
				color: '#000000'
			});
		},
		/**
		 * 表示イベント
		 */
		onShow: function(){
			$('#' + this.canvas.getId()).css('display', 'block');
		},
		/**
		 * 非表示イベント
		 */
		onHide: function(){
			$('#' + this.canvas.getId()).css('display', 'none');
		},
		/**
		 * キャンバスの取得
		 */
		getCanvas: function(){
			return this.canvas;
		},
		getPixels: function(){
			pixels = this.canvas.getPixels();
			alpha = parseFloat($('#alphaNumFor_' + this.id).html()) / 100.0;
			if($('#alphaNumFor_' + this.id).html() != '100'){
				for(x = 0;x < pixels.width; x++){
					for(y = 0; y < pixels.height; y++){
						if(pixels.data[3 + x * 4 + y * pixels.width * 4] > 0){
							fullAlpha = pixels.data[3 + x * 4 + y * pixels.width * 4] / alpha;///<アルファ値100%の時の色の推定値
							pixels.data[3 + x * 4 + y * pixels.width * 4] = fullAlpha;
						}
					}
				}
			}
			//エクストラレイヤー
			if(!$('#extraLayer_log').is('*')){
				$('#canvas').append('<canvas id="extraLayer_log" width="' + $('#' + this.canvas.getId()).width() + '", height="' + $('#' + this.canvas.getId()).height() + '"></canvas>');
			}
			$('#extraLayer_log').get(0).getContext('2d').putImageData(pixels, 0, 0);
			return $('#extraLayer_log').get(0).toDataURL();
		}
}