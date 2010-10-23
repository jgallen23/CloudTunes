var ajax = function(url, callback) { 
	var o = {};
	var self   = this,
		req    = new XMLHttpRequest(),
		method = o.method || 'get',
		async  = o.async || true,           
		params = o.data || null,
		i = 0;

	req.queryString = params;
	req.open(method, url, async);

	if (o.headers) {
		for (; i<o.headers.length; i++) {
		  req.setRequestHeader(o.headers[i].name, o.headers[i].value);
		}
	}

	/*req.handleResp = (o.callback != null) ? o.callback : function() { that.html(location, this.responseText); };*/
	req.handleError = (o.error && typeof o.error == 'function') ? o.error : function () {};
	function hdl(){ 
		if(req.readyState==4) {
			delete(self.xmlHttpRequest);
			if(req.status===0 || req.status==200) {
				callback(eval(req.responseText));
			}
			if((/^[45]/).test(req.status)) req.handleError();
		}
	}
	if(async) {
		req.onreadystatechange = hdl;
		this.xmlHttpRequest = req;
	}
	req.send(params);
	if(!async) hdl();

	return this
}
