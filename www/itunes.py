from ScriptingBridge import *

class iTunes(object):
    def __init__(self):
        self.app = SBApplication.applicationWithBundleIdentifier_("com.apple.iTunes")
        self.source = self.app.sources()[0]

    def get_library_playlist(self):
        return self.source.libraryPlaylists()[0]

    def get_playlists(self):
        playlists = self.source.playlists()
        data = []
        for playlist in playlists:
            obj = {
                'name': playlist.name(),
                'id': playlist.id()
            }
            data.append(obj)
        return data

    def get_tracks(self, playlist_id):
        playlist = self.source.playlists().objectWithID_(playlist_id)
        tracks = playlist.tracks()
        data = []
        for track in tracks:
            ftrack = track.get()
            obj = {
                'name': track.name(),
                'artist': track.artist(),
                'album': track.album(),
                'rating': track.rating(),
                'location': str(ftrack.location())
            }
            data.append(obj)
        return data
