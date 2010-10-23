import web
import itunes
import simplejson

urls = (
    "/playlists", "playlists",
    "/playlists/(.+)", "tracks"
)

class tracks:
    def GET(self, playlist_id):
        it = itunes.iTunes()
        return simplejson.dumps(it.get_tracks(playlist_id))


class playlists:
    def GET(self):
        it = itunes.iTunes()
        return simplejson.dumps(it.get_playlists())


app = web.application(urls, locals())
