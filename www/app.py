import os
import web
import urllib
import api
import itunes


urls = (
    '/', 'index',
    '/api', api.app,
    '/audio.mp3', 'audio',
)
app = web.application(urls, globals())

class index:
    def GET(self):
        path = ''
        render = web.template.render('templates')
        #pool = NSAutoreleasePool.alloc().init()
        #del pool
        return render.index(urllib.quote(path))

class audio:
    def GET(self):
        path = web.input().path
        size = os.stat(path).st_size
        web.header("Content-Type", "audio/mpeg")
        web.header("Content-Length", "%d" % size)
        return range_handler(path)

def range_handler(fname):
    "return all or part of the bytes of a fyle depending on whether we were called with the HTTP_RANGE header set"
    f = open(fname, "rb")

    bytes = None
    CHUNK_SIZE = 10 * 1024;

    # is this a range request?
    # looks like: 'HTTP_RANGE': 'bytes=41017-'
    if False and 'HTTP_RANGE' in web.ctx.environ:
        logging.debug("server issued range query: %s" % web.ctx.environ['HTTP_RANGE'])

        # try a start only regex
        regex = re.compile('bytes=(\d+)-$')
        grp = regex.match(web.ctx.environ['HTTP_RANGE'])
        if grp:
            start = int(grp.group(1))
            logging.debug("player issued range request starting at %d" % start)

            f.seek(start)

            # we'll stream it
            bytes = f.read(CHUNK_SIZE)
            while not bytes == "":
                yield bytes
                bytes = f.read(CHUNK_SIZE)

            f.close()

        # try a span regex
        regex = re.compile('bytes=(\d+)-(\d+)$')
        grp = regex.match(web.ctx.environ['HTTP_RANGE'])
        if grp:
            start,end = int(grp.group(1)), int(grp.group(2))
            logging("player issued range request starting at %d and ending at %d" % (start, end))

            f.seek(start)
            bytes_remaining = end-start+1 # +1 because range is inclusive
            chunk_size = min(bytes_remaining, chunk_size)
            bytes = f.read(chunk_size)

            while not bytes == "":
                yield bytes

                bytes_remaining -= chunk_size
                chunk_size = min(bytes_remaining, chunk_size)
                bytes = f.read(chunk_size)

            f.close()
        
        # try a tail regex
        regex = re.compile('bytes=-(\d+)$')
        grp = regex.match(web.ctx.environ['HTTP_RANGE'])
        if grp:
            end = int(grp.group(1))
            logging.debug("player issued tail request beginning at %d from end" % end)

            f.seek(-end, os.SEEK_END)
            bytes = f.read()
            yield bytes
            f.close()

    else:
        # write the whole thing
        # we'll stream it
        bytes = f.read(CHUNK_SIZE)
        while not bytes == "":
            yield bytes
            bytes = f.read(CHUNK_SIZE)
        
        f.close()

if __name__ == "__main__":
    app.run()

