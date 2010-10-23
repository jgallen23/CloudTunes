var TracksView = TemplateView.extend({
	useLiveClickEvents: true,
	setTracks: function(tracks) {
		this.tracks = tracks;
		this._render();
	},
	_render: function() {
		var data = { tracks: this.tracks };
		this._super("jstTracksView", data);
	},
	onClick: {
		'play': function(e) {
			var index = e.target.parentNode.parentNode.getAttribute('data-index');
			var track = this.tracks[index];
			this.trigger('play', [index, track]);
		},
		'playPlaylist': function(e) {
			this.trigger('playPlaylist', []);
		}
	}
});
