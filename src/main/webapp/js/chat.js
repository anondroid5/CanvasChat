function Chat(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

Chat.prototype = {
		/**
		 * コンストラクタ
		 */
		initialize: function(){
			$('#chatForm').submit(function(){
				Chat.prototype.sendMessage();
				return false;
			})
		},
		/**
		 * 参加者追加
		 * @param name 参加者名
		 */
		login: function(name, hash){
			$('#participantList').append($('<option>').html(name).attr({value: hash}));
			$('#participantList').children('[value="参加者なし"]').remove();
			var time = new Date().toString().split(' ')[4].substring(0,5); 
			ion.sound.play('post');
			this.receiveMessage(time+' '+'[System] ' +  name + 'さんが入室しました。');
		},
		/**
		 * 参加者削除
		 * @param name 参加者名
		 */
		logout: function(name, hash){
			$('#participantList').children('[value="' +  hash + '"]').remove();
			var time = new Date().toString().split(' ')[4].substring(0,5); 
			ion.sound.play('post');
			this.receiveMessage(time+' '+'[System] ' +  name + 'さんが退室しました。');
		},
		/**
		 * 既存参加者の追加
		 * @param name 既存参加者名
		 */
		addParticipant: function(name, hash){
			$('#participantList').append($('<option>').html(name).attr({value: hash}));
			$('#participantList').children('[value="参加者なし"]').remove();
			var time = new Date().toString().split(' ')[4].substring(0,5); 
			ion.sound.play('post');
			this.receiveMessage(time+' '+'[System] ' +  name + 'さんが参加しています。');
		},
		/**
		 * メッセージ送信
		 */
		sendMessage: function(){
			//投稿時刻
			var time = new Date().toString().split(' ')[4].substring(0,5); 
			if($('#message').val()){
				new Socket().message(time+' '+'('+new Storage().get('loginName')+')'+$('#message').val());//送信
				ion.sound.play('post');//送信音
			}
			$('#message').val('');
		},
		/**
		 * メッセージ受信
		 * @param msg 受信メッセージ
		 */
		receiveMessage: function(msg){
			$('#messages').val(msg + '\n' + $('#messages').val());
			ion.sound.play('post');//受信音
			//時刻を表示用に除去処理
			msg = msg.slice(6);
			$('#ms').t(msg+ ' ');
		}
}