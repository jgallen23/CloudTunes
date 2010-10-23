var PlaylistsView = TemplateView.extend({
	useLiveClickEvents: true,
	setPlaylists: function(playlists) {
		this.playlists = playlists;
		this._render()
	},
	_render: function() {
		var data = { playlists: this.playlists }
		this._super("jstPlaylistsView", data);
	},
	onClick: {
		'playlist': function(e) {
			this.trigger("select", [e.target.getAttribute("data-id")]);
		}
	}
});
