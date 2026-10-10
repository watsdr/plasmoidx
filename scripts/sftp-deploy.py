import os, posixpath, paramiko
t = paramiko.Transport(("server255.web-hosting.com", 21098))
t.connect(username="plasugku", password=os.environ["SFTP_PASSWORD"])
s = paramiko.SFTPClient.from_transport(t); n = 0
for d, _, fs in os.walk("out"):
    rel = os.path.relpath(d, "out")
    rd = "public_html" if rel == "." else posixpath.join("public_html", rel.replace(os.sep, "/"))
    try: s.mkdir(rd)
    except IOError: pass
    for f in fs:
        s.put(os.path.join(d, f), posixpath.join(rd, f)); n += 1
print("uploaded", n, "files"); s.close(); t.close()
