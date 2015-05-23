function PluginForm(title){
	this.windowId = 'window_' + (encodeURI(title).replace(/%/g, ''));
	$('<div>').attr('id', this.windowId).appendTo($('#plugin'));
	$('<div>').attr('class', 'titleBar').html(title).appendTo($('#' + this.windowId));
	$('<div>').attr('class', 'frame').appendTo($('#' + this.windowId));
}

PluginForm.prototype = {
	/**
	 * HTML設定
	 * @param html HTML
	 */
	html: function(html){
		$('#' + this.windowId + ' .frame').html(html);
	},
	/**
	 * jqueryオブジェクト設定
	 * @param jqueryObject オブジェクト
	 */
	append: function(jqueryObject){
		$('#' + this.windowId + ' .frame').append($(jqueryObject));
	}
}