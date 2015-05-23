function LayerManager(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

LayerManager.prototype = {
		/**
		 * コンストラクタ
		 */
		initialize: function(){
			this.layerList = new Array();///<レイヤーリスト
			this.activeLayerId = -1;     ///<アクティブレイヤー
			this.totalLayerNum = 0;      ///<レイヤー総作成数
		},
		/**
		 * アクティブラレイヤーを取得
		 */
		getActiveLayerId: function(){
			return this.activeLayerId;
		},
		/**
		 * アクティブラレイヤーを取得
		 */
		getActiveLayer: function(){
			if(this.activeLayerId == -1){
				return null;
			}
			return this.layerList[this.activeLayerId];
		},
		/**
		 * レイヤー新規作成
		 */
		add: function(){
			this.layerList.push(new Layer(this.totalLayerNum));
			this.totalLayerNum++;
		},
		/**
		 * レイヤー数を取得
		 * @return レイヤー数
		 */
		getNum: function(){
			return this.lyerList.length;
		},
		setActiveLayer: function(layerId){
			if((layerId) in this.layerList){
				if(this.activeLayerId in this.layerList){
					this.layerList[this.activeLayerId].onUnforcus();
				}
				this.layerList[layerId].onForcus();
				this.activeLayerId = layerId;
			}
		},
		/**
		 * レイヤーを取得
		 * @param layerId レイヤーID
		 */
		getLayer: function(layerId){
			if((layerId) in this.layerList){
				return this.layerList[layerId];
			}
			return null;
		},
		/**
		 * 描写
		 * @param data 描写情報
		 */
		//draw: function(data){
		//	if(data.l in this.layerList){
		//		this.layerList[data.l].getCanvas().draw(data);
		//	}
		//},
		/**
		 * 消しゴム
		 * @param data 描写情報
		 */
		//erase: function(data){
		//	if(data.l in this.layerList){
		//		this.layerList[data.l].getCanvas().erase(data);
		//	}
		//},
		/**
		 * 全削除
		 */
		bomb: function(){
			for(i = 0; i < this.layerList.length; i++){
				this.layerList[i].getCanvas().bomb();
			}
		},
		/**
		 * ピクセルの値を取得
		 * @param x X座標
		 * @param y Y座標
		 * @return ピクセル情報
		 */
		getPixel: function(x, y){
			if(this.activeLayerId != -1){
				return this.layerList[this.activeLayerId].getCanvas().getPixel(x, y);
			}
			return 'rgba(255, 255, 255, 0)';
		},
		/**
		 * ログ情報の取得
		 */
		getLog: function(){
			logs = new Array();
			for(i = 0; i < this.layerList.length; i++){
				logs.push({layer: i,data: this.layerList[i].getPixels()});
			}
			return logs;
		},
		setImage: function(layer, data){
			if(layer in this.layerList){
				this.layerList[layer].getCanvas().setImage(data);
			}
		},
		setAlpha: function(layer, befAlpha, alpha){
			if(layer in this.layerList){
				this.layerList[layer].getCanvas().setAlpha(befAlpha, alpha);
			}
		}
}