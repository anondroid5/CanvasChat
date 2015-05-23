function Canvas(id, isExtra){
	if(isExtra == 0){
		this.id = 'NormalLayer_' + id + '__canvas' + id;
		//キャンバス作成
		$('#mainLayer').append('<canvas class="layer" id="' + this.id + '" width="1200" height="675"></canvas>');
	}else if(isExtra == 1){
		this.id = 'ExtraLayer_' + id + '__canvas' + id;

		//キャンバス作成
		$('#topLayer').append('<canvas class="layer" id="' + this.id + '" width="1200" height="675"></canvas>');
	}else if(isExtra == -1){
		this.id = 'ExtraLayer_' + id + '__canvas' + id;
		//キャンバス作成
		$('#bottomLayer').append('<canvas class="layer" id="' + this.id + '" width="1200" height="675"></canvas>');
	}

}

Canvas.prototype = {
	/**
	 * IDを取得
	 */
	getId: function(){
		return this.id;
	},
	/**
	 * 線描写
	 * @param data 線情報
	 */
	draw: function(data){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			if(data.w == 0){
				data.w = 0.1;
			}
			//線の設定
			context.lineWidth = data.w;
			if(data.cap === undefined){
				context.lineCap = 'round';
			}else{
				context.lineCap = data.cap;
			}
			context.strokeStyle = data.c;
			//線を引く
			context.beginPath();
			context.moveTo(data.x, data.y);
			context.lineTo(data.tx, data.ty);
			context.stroke();
		}
	},
	/**
	 * 消しゴム
	 * @param data 消しゴム情報
	 */
	erase: function(data){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			var composition = context.globalCompositeOperation;
			if(data.w == 0){
				data.w = 0.1;
			}
			//線の設定
			context.lineWidth = data.w;
			context.lineCap = 'round';
			context.strokeStyle = 'rgba(0, 0, 0, 1)';
			context.globalCompositeOperation = "destination-out";
			//線を引く
			context.beginPath();
			context.moveTo(data.x, data.y);
			context.lineTo(data.tx, data.ty);
			context.stroke();
			//線の設定を戻す
			context.globalCompositeOperation = composition;
		}
	},
	/**
	 * 全削除
	 */
	bomb: function(){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			//アルファ値を100%にする
			alpha = context.globalAlpha;
			context.globalAlpha = 1.0;
			var composition = context.globalCompositeOperation;
			context.globalCompositeOperation = "destination-out";
			context.strokeStyle = 'rgba(0, 0, 0, 1)';
			context.fillRect(0, 0, $('#' + this.id).attr('width'), $('#' + this.id).attr('height'));
			context.globalCompositeOperation = composition;
			//α値を元に戻す
			context.globalAlpha = alpha;
		}
	},
	/**
	 * ログイメージ書き込み
	 */
	setImage: function(image){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);
		}
	},
	/**
	 * ピクセルを取得
	 * @return 色情報
	 */
	getPixel: function(x, y){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			var x = x - $('#' + this.id).position().left;
			var y = y - $('#' + this.id).position().top;
			var colorArray = context.getImageData(x, y, 1, 1);
			return 'rgba(' + colorArray.data[0] + ', ' + colorArray.data[1] + ', ' + colorArray.data[2] + ', ' + colorArray.data[3] + ')';
		}
		return 'rgba(255, 255, 255, 0)';
	},
	/**
	 * キャンバスのデータを取得
	 * @return 色情報の配列
	 */
	getPixels: function(){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			return context.getImageData(0, 0, $('#' + this.id).width(), $('#' + this.id).height());;
		}
		return new Array();
	},
	/**
	 * URL情報で取得
	 * @return URLでのイメージ情報
	 */
	getDataURL: function(){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined){
			return canvas.toDataURL();
		}
		return 'data:,';
	},
	/**
	 * アルファ値の設定
	 */
	setAlpha: function(befAlpha, alpha){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			context.globalAlpha = alpha;
			pixels = this.getPixels();
			//アルファ値修正
			for(x = 0;x < pixels.width; x++){
				for(y = 0; y < pixels.height; y++){
					if(pixels.data[3 + x * 4 + y * pixels.width * 4] > 0){
						fullAlpha = pixels.data[3 + x * 4 + y * pixels.width * 4] / befAlpha;///<アルファ値100%の時の色の推定値
						pixels.data[3 + x * 4 + y * pixels.width * 4] = fullAlpha * alpha;
					}
				}
			}
			context.putImageData(pixels, 0, 0);
		}
	},
	/**
	 * コンテキスト取得
	 * @return コンテキスト
	 */
	getContext: function(){
		var canvas = $('#' + this.id).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			return canvas.getContext('2d');
		}
		return undefined;
	},
	getWidth: function(){
		return $('#' + this.id).width();
	},
	getHeight: function(){
		return $('#' + this.id).height();
	}
}
