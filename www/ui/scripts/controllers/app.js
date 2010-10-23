var AppController = Class.extend({
	init: function() {
		var self = this;
		this.player = new PlayerView('Player'); 
		this.player.bind("viewCurrent", function(tracks) {
			self.tracks.setTracks(tracks);
		});

		this.playlists = new PlaylistsView('Playlists');
		this.playlists.bind("select", function(id) {
			self.selectPlaylist(id);
		});

		this.tracks = new TracksView('Tracks');
		this.tracks.bind("play", function(trackIndex, track) {
			self.playTrackFromPlaylist(trackIndex);
		});
		this.tracks.bind("playPlaylist", function() {
			self.playCurrentPlaylist();
		});

		this.loadPlaylists();

	},
	loadPlaylists: function() {
		var self = this;
		ajax("/api/playlists", function(data) {
			self.playlists.setPlaylists(data);
			self.selectPlaylist(data[0]['id']);
		});
	},
	selectPlaylist: function(id) {
		var self = this;
		ajax('/api/playlists/'+id, function(data) {
			self.tracks.setTracks(data);
		});
	},
	playTrackFromPlaylist: function(index) {
		this.player.setTracks(this.tracks.tracks);
		this.player.playTrack(index);
	},
	playCurrentPlaylist: function() {
		this.playTrackFromPlaylist(0);	
	}
});
