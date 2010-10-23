import itunes
it = itunes.iTunes()
playlists = it.get_playlists()
tracks = it.get_tracks(playlists[0]["id"])
print tracks
