function Zoomout(){
	this.mouseDown = false;
	this.x = -1;
	this.y = -1;
}

Zoomout.prototype = {
		/**
		 * ツール名取得
		 */
		getName: function(){return 'zoomout';},
		/**
		 * アイコン名取得
		 */
		getIconName: function(){return 'zoomout';},
		/**
		 * マウスのボタンが押されたイベント
		 */
		onMouseDown: function(x, y, size){
			this.mouseDown = true;
			this.x = x;
			this.y = y;
			
			//3枚同時に拡大・縮小
			var canvas = $('#mainLayer canvas')[0];
			var canvas1 = $('#mainLayer canvas')[1];
			var canvas2 = $('#mainLayer canvas')[2];
			
			//grid用レイヤーも拡縮
			var grid = $('#bottomLayer canvas')[0];
			
			switch($(canvas).css('transform')[7]){
				case undefined:
					//通常(1.0)→縮小(0.5)
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
					transformStyle = transformStyle.replace('%{scale}', 0.5);
					transformStyle = transformStyle.replace('%{tx}', -topLeftX);
					transformStyle = transformStyle.replace('%{ty}', -topLeftY);
					$(canvas).css('transform', transformStyle);
					$(canvas1).css('transform', transformStyle);
					$(canvas2).css('transform', transformStyle);
					$(grid).css('transform', transformStyle);
					$('#zoomInfo').show();
					$('#zoomInfo').text(50 +'%');
					$('#zoomInfo').fadeOut(1200);
				break;
				case '0':
					//縮小(0.5)→縮小(0.5)
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
					transformStyle = transformStyle.replace('%{scale}', 0.5);
					transformStyle = transformStyle.replace('%{tx}', -topLeftX);
					transformStyle = transformStyle.replace('%{ty}', -topLeftY);
					$(canvas).css('transform', transformStyle);
					$(canvas1).css('transform', transformStyle);
					$(canvas2).css('transform', transformStyle);
					$(grid).css('transform', transformStyle);
					$('#zoomInfo').show();
					$('#zoomInfo').text(50 +'%');
					$('#zoomInfo').fadeOut(1200);
				break;
				case '2':
					//拡大(2.0)→縮小(1.0)
					$(canvas).css('transform', '');
					$(canvas1).css('transform', '');
					$(canvas2).css('transform', '');
					$(grid).css('transform', '');
			    	$('#zoomInfo').show();
					$('#zoomInfo').text(100 +'%');
					$('#zoomInfo').fadeOut(1200);
				break;
				
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
		 * マウスがキャンバスから離れたイベント
		 */
		onMouseEscape: function(x, y, size){
			this.mouseDown = false;
		}
};
//Toolに登録
(function(){new Tool().addItem('zoomout', new Zoomout());})();