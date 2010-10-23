var PlayerView = View.extend({
	useLiveClickEvents: true,
	init: function(element) {
		this._super(element);
		this.currentTrack = '';
		this.currentIndex = 0;
		this.player = this.find("audio");
	},
	setTracks: function(tracks) {
		this.tracks = tracks;
	},
	playTrack: function(trackIndex) {
		this.currentTrack = this.tracks[trackIndex];
		this.currentIndex = trackIndex;
		this.player.src = "/audio.mp3?path="+this.currentTrack.location;
		this.player.play();
		this._render();
	},
	_render: function() {
		var data = { currentTrack: this.currentTrack };
		this.find("#currentTrack").innerHTML = template("jstCurrentTrackView", data);
	},
	nextTrack: function() {
		if (this.tracks.length - 1 == this.currentIndex) 
			this.playTrack(0);
		else	
			this.playTrack(this.currentIndex+1);
	},
	previousTrack: function() {
		if (this.currentIndex == 0) 
			this.playTrack(this.tracks.length - 1);
		else
			this.playTrack(this.currentIndex-1);
	},
	onClick: {
		'next': function(e) {
			this.nextTrack();
		},
		'previous': function(e) {
			this.previousTrack();
		},
		'viewCurrent': function(e) {
			this.trigger("viewCurrent", [this.tracks]);
		}
	}
});
