function Spoit(){
	this.mouseDown = false;
	this.preItem = '';
	this.x = -1;
	this.y = -1;
}

Spoit.prototype = {
	/**
	 * 前回有効だったアイテムを記録
	 */
	onActive:function(item){
		console.log(item);
		if(item != 'spoit'){
			this.preItem = item;
		}
	},
	/**
	 * ツール名取得
	 */
	getName: function(){return 'spoit';},
	/**
	 * アイコン名取得
	 */
	getIconName: function(){return 'supo';},
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
		this.x = x;
		this.y = y;
	},
	/**
	 * マウスのボタンを離したイベント
	 */
	onMouseRelease: function(x, y, size){
		if(this.mouseDown){
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
					var color = new LayerManager().getPixel(x, y);
				break;
				case '2':
					//2倍
					var color = new LayerManager().getPixel((x - matrix_x) / 2, (y - matrix_y) / 2);
				break;
				case '0':
					//0.5倍
					var color = new LayerManager().getPixel((x - matrix_x) * 2, (y - matrix_y) * 2);
				break;
			}
			if(color.match(/rgba\s*\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/)){
				r = parseInt(RegExp.$1, 10);
				g = parseInt(RegExp.$2, 10);
				b = parseInt(RegExp.$3, 10);
				a = parseInt(RegExp.$4, 10);
				new ColorPicker().setRGBA(r, g, b, a);
			}
			console.log(this.preItem);
			new Tool().setActive(this.preItem);
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
	}
};
//Toolに登録
(function(){new Tool().addItem('spoit', new Spoit());})();