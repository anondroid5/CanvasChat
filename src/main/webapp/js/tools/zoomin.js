function Zoomin(){
	this.mouseDown = false;
	this.x = -1;
	this.y = -1;
}

Zoomin.prototype = {
		/**
		 * ツール名取得
		 */
		getName: function(){return 'zoomin';},
		/**
		 * アイコン名取得
		 */
		getIconName: function(){return 'zoomin';},
		/**
		 * クリック時のxy座標のセッター
		 */
		setClickXY: function(x,y){this.x = x; this.y =y;},
		/**
		 * クリック時のx座標のゲッター
		 */
		getClickX: function(){return this.x;},
		/**
		 * クリック時のy座標のゲッター
		 */
		getClickY: function(){return this.y;},
		/**
		 * マウスのボタンが押されたイベント
		 */
		onMouseDown: function(x, y, size){
			this.mouseDown = true;
			this.x = x;
			this.y = y;
			//var layer_num = new LayerManager().getActiveLayer().getId();//レイヤー番号
			//var layer_info = new LayerManager().getLayer(layer_num);//レイヤー情報
			//var context = layer_info.getCanvas().getContext();//コンテキスト生成
			//context.scale(2.0,2.0);
			//console.log(context);//レイヤー情報
			//3枚同時に拡大・縮小
			var canvas = $('#mainLayer canvas')[0];
			var canvas1 = $('#mainLayer canvas')[1];
			var canvas2 = $('#mainLayer canvas')[2];

			//grid用レイヤーも拡縮
			var grid = $('#bottomLayer canvas')[0];
			
			switch($(canvas).css('transform')[7]){
				case undefined:
					//通常→拡大(2.0)
					var topLeftX = x  -(canvas.width/4);
					var topLeftY = y -(canvas.height/4);
					if(topLeftX < 0){
						topLeftX = 0;
					}else if(topLeftX > canvas.width/2){
						topLeftX = canvas.width/2;
					}
					if(topLeftY < 0){
						topLeftY = 0;
					}else if(topLeftY > canvas.height/2){
						topLeftY = canvas.height/2;
					}

					var transformStyle = 'scale(%{scale}) translate(%{tx}px, %{ty}px)';
					transformStyle = transformStyle.replace('%{scale}', 2);
					transformStyle = transformStyle.replace('%{tx}', -topLeftX);
					transformStyle = transformStyle.replace('%{ty}', -topLeftY);
					$(canvas).css('transform', transformStyle);
					$(canvas1).css('transform', transformStyle);
					$(canvas2).css('transform', transformStyle);
					$(grid).css('transform', transformStyle);
					$('#zoomInfo').show();
					$('#zoomInfo').text(200 +'%');
					$('#zoomInfo').fadeOut(1200);
				break;
				case '0':
					//縮小(0.5)→通常(1.0)
					$(canvas).css('transform', '');
					$(canvas1).css('transform', '');
					$(canvas2).css('transform', '');
					$(grid).css('transform', '');
			    	$('#zoomInfo').show();
					$('#zoomInfo').text(100 +'%');
					$('#zoomInfo').fadeOut(1200);
				break;
				case '2':
					//拡大(2.0)→拡大(2.0)
					var topLeftX = x  -(canvas.width/4);
					var topLeftY = y -(canvas.height/4);
					if(topLeftX < 0){
						topLeftX = 0;
					}else if(topLeftX > canvas.width/2){
						topLeftX = canvas.width/2;
					}
					if(topLeftY < 0){
						topLeftY = 0;
					}else if(topLeftY > canvas.height/2){
						topLeftY = canvas.height/2;
					}

					var transformStyle = 'scale(%{scale}) translate(%{tx}px, %{ty}px)';
					transformStyle = transformStyle.replace('%{scale}', 2);
					transformStyle = transformStyle.replace('%{tx}', -topLeftX);
					transformStyle = transformStyle.replace('%{ty}', -topLeftY);
					$(canvas).css('transform', transformStyle);
					$(canvas1).css('transform', transformStyle);
					$(canvas2).css('transform', transformStyle);
					$(grid).css('transform', transformStyle);
					$('#zoomInfo').show();
					$('#zoomInfo').text(200 +'%');
					$('#zoomInfo').fadeOut(1200);
				break;
			}
		},
		/**
		 * マウスが動いたイベント
		 */
		onMouseMove: function(x, y, size){
			if(this.mouseDown){
				if(size == 0){
					size = 0.1;
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
				this.mouseDown = false;
			}
		},
		/**
		 * マウスがキャンバスから離れたイベント
		 */
		onMouseEscape: function(x, y, size){
			this.mouseDown = false;
		}
};

//Toolに登録
(function(){new Tool().addItem('zoomin', new Zoomin());})();