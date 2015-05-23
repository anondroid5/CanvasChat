function Storage(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

Storage.prototype = {

	keyPrefix: 'Pictchat::',
	/**
	 * コンストラクタ
	 */
	initialize: function(){
		if(typeof localStorage !== undefined){
			//localStorageが有効
			$('#enableWebStorage').html('localStorage').css({
				backgroundColor: '#00ff00'
			});
		}else{
			//localStorageが無効
			$('#enableWebStorage').html('cookie').css({
				backgroundColor: '#ffff00'
			});
		}
	},
	/**
	 * 登録済みの値を取得
	 * @param key キー
	 * @retval 登録済みの値
	 * @retval 登録がなかったら undefined
	 */
	get: function(key){
		if(typeof localStorage !== undefined){
			if(localStorage[Storage.prototype.keyPrefix + key] === null || localStorage[Storage.prototype.keyPrefix + key] === undefined){
				return undefined;
			}
			return localStorage[Storage.prototype.keyPrefix + key];
		}else{
			//localStorageが無効
			var cookie = document.cookie;
			var re = new RegExp(Storage.prototype.keyPrefix + key + '=(#[0-9a-zA-Z]*);?')
			if(cookie.match(re)){
				return RegExp.$1;
			}
			return undefined;
		}
		return undefined;
	},
	/**
	 * 値の登録
	 * @param key キー
	 * @param value 値
	 */
	set: function(key, value){
		if(typeof localStorage !== undefined){
			localStorage.setItem(Storage.prototype.keyPrefix + key, value);
		}else{
			document.cookie = Storage.prototype.keyPrefix + key + '=' + value;
		}
	}
}