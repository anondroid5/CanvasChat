function DefaultPen(){
	this.mouseDown = false;
	this.x = -1;
	this.y = -1;
}

DefaultPen.prototype = {
	/**
	 * ツール名取得
	 */
	getName: function(){return 'defaultPen';},
	/**
	 * アイコン名取得
	 */
	getIconName: function(){return 'hude';},
	/**
	 * x座標とy座標の設定
	 */
	setXY:function(x,y){this.x =x; this.y =y;},
	/**
	 * マウスのボタンが押されたイベント
	 */
	onMouseDown: function(x, y, size){
		this.mouseDown = true;
		this.x = x;
		this.y = y;
	},
	/**
	 * マウスが動いたイベント
	 */
	onMouseMove: function(x, y, size){
		if(this.mouseDown){
			if(size == 0){
				size = 0.1;
			}
			//拡大縮小の状況把握
			var canvas = $('#mainLayer canvas')[LayerManager().getActiveLayer().getId()];
			if($(canvas).css('transform')[7] != undefined){
				//クリック位置の取得
				var matrix_x = $(canvas).css('transform').split(",")[4].replace(/\s/g, "");
				var matrix_y = $(canvas).css('transform').split(",")[5].replace(/\s/g, "").slice(0, -1);
			}
			switch($(canvas).css('transform')[7]){
				case undefined:
					//通常
					new Socket().draw({
						type: this.getName(),
						layer: new LayerManager().getActiveLayer().getId(),
						width: new PenWidthManager().getWidth() * size,
						color: new ColorPicker().getColorRGBA(),
						x: this.x,
						y: this.y,
						tx: x,
						ty: y,
						user:new Storage().get('loginName')
					});
				break;
				case '2':
					//2倍
					new Socket().draw({
						type: this.getName(),
						layer: new LayerManager().getActiveLayer().getId(),
						width: new PenWidthManager().getWidth() * size,
						color: new ColorPicker().getColorRGBA(),
						x: (this.x - matrix_x) / 2,
						y: (this.y - matrix_y) / 2,
						tx: (x - matrix_x) / 2,
						ty: (y - matrix_y) / 2,
						user:new Storage().get('loginName')
					});
				break;
				case '0':
					//0.5倍
					new Socket().draw({
						type: this.getName(),
						layer: new LayerManager().getActiveLayer().getId(),
						width: new PenWidthManager().getWidth() * size,
						color: new ColorPicker().getColorRGBA(),
						x: (this.x - matrix_x) * 2,
						y: (this.y - matrix_y) * 2,
						tx: (x - matrix_x) * 2,
						ty: (y - matrix_y) * 2,
						user:new Storage().get('loginName')
					});
				break;
			}
			
			this.x = x;
			this.y = y;
			
		}
	},
	/**
	 * マウスのボタンを離したイベント
	 */
	onMouseRelease: function(x, y, size){
		if(this.mouseDown){
			if(size == 0){
				size = 0.1;
			}
			//拡大縮小の状況把握
			var canvas = $('#mainLayer canvas')[LayerManager().getActiveLayer().getId()];
			if($(canvas).css('transform')[7] != undefined){
				//クリック位置の取得
				var matrix_x = $(canvas).css('transform').split(",")[4].replace(/\s/g, "");
				var matrix_y = $(canvas).css('transform').split(",")[5].replace(/\s/g, "").slice(0, -1);
			}
			switch($(canvas).css('transform')[7]){
				case undefined:
					//通常
					new Socket().draw({
						type: this.getName(),
						layer: new LayerManager().getActiveLayer().getId(),
						width: new PenWidthManager().getWidth() * size,
						color: new ColorPicker().getColorRGBA(),
						x: this.x,
						y: this.y,
						tx: x,
						ty: y,
						user:new Storage().get('loginName')
					});
				break;
				case '2':
					//2倍
					new Socket().draw({
						type: this.getName(),
						layer: new LayerManager().getActiveLayer().getId(),
						width: new PenWidthManager().getWidth() * size,
						color: new ColorPicker().getColorRGBA(),
						x: (this.x - matrix_x) / 2,
						y: (this.y - matrix_y) / 2,
						tx: (x - matrix_x) / 2,
						ty: (y - matrix_y) / 2,
						user:new Storage().get('loginName')
					});
				break;
				case '0':
					//0.5倍
					new Socket().draw({
						type: this.getName(),
						layer: new LayerManager().getActiveLayer().getId(),
						width: new PenWidthManager().getWidth() * size,
						color: new ColorPicker().getColorRGBA(),
						x: (this.x - matrix_x) * 2,
						y: (this.y - matrix_y) * 2,
						tx: (x - matrix_x) * 2,
						ty: (y - matrix_y) * 2,
						user:new Storage().get('loginName')
					});
				break;
			}
			this.mouseDown = false;
		}
	},
	/**
	 * マウスがキャンバスから離れたイベント
	 */
	onMouseEscape: function(x, y, size){
		this.mouseDown = false;
	},
	/**
	 * 描写要求
	 */
	draw: function(data){
		layer = new LayerManager().getLayer(data.layer);
		if(layer === null){return;}
		context = layer.getCanvas().getContext();
		if(context === undefined){return;}
		context.lineWidth = data.width;
		if(data.cap === undefined){
			context.lineCap = 'round';
		}else{
			context.lineCap = data.cap;
		}
		context.strokeStyle = data.color;
		//線を引く
		context.beginPath();
		context.moveTo(data.x, data.y);
		context.lineTo(data.tx, data.ty);
		context.stroke();
	}
};
//Toolに登録
(function(){new Tool().addItem('defaultPen', new DefaultPen());})();