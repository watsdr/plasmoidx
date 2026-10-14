"""Upload out/ to public_html, then prune stale site-output files.

Prune rules (safety first):
- Only files under public_html that are NOT in this build's out/ file set.
- Never touch .htaccess, .well-known/, cgi-bin/, or dotfiles anywhere.
- Only paths that look like site output: _next/, visuals/, og/, explainers/,
  fonts/, data/, or root-level *.html / *.txt (except search-engine
  verification files like google*.html, yandex_*.html, BingSiteAuth.xml).
- Every planned deletion is logged first. More than MAX_DELETES aborts
  before anything is uploaded or deleted. PRUNE_DRY_RUN=1 logs only.
"""
import os, posixpath, stat, sys, fnmatch, paramiko

ROOT = "public_html"
MAX_DELETES = 50
DRY = os.environ.get("PRUNE_DRY_RUN", "").lower() in ("1", "true", "yes")
PROTECTED_TOP = {".htaccess", ".well-known", "cgi-bin"}
OUTPUT_DIRS = ("_next/", "visuals/", "og/", "explainers/", "fonts/", "data/")
VERIFY_PATTERNS = ("google*.html", "yandex_*.html", "BingSiteAuth.xml")

local = set()
for d, _, fs in os.walk("out"):
    for f in fs:
        local.add(os.path.relpath(os.path.join(d, f), "out").replace(os.sep, "/"))

t = paramiko.Transport(("server255.web-hosting.com", 21098))
t.connect(username="plasugku", password=os.environ["SFTP_PASSWORD"])
s = paramiko.SFTPClient.from_transport(t)

def walk(rel=""):
    base = ROOT if not rel else posixpath.join(ROOT, rel)
    for a in s.listdir_attr(base):
        p = a.filename if not rel else posixpath.join(rel, a.filename)
        if stat.S_ISDIR(a.st_mode):
            if a.filename.startswith(".") or (not rel and a.filename in PROTECTED_TOP):
                continue
            yield from walk(p)
        else:
            yield p

def prunable(p):
    parts = p.split("/")
    if parts[0] in PROTECTED_TOP or any(x.startswith(".") for x in parts):
        return False
    if p.startswith(OUTPUT_DIRS):
        return True
    if len(parts) == 1 and (p.endswith(".html") or p.endswith(".txt")):
        return not any(fnmatch.fnmatch(p, g) for g in VERIFY_PATTERNS)
    return False

remote = set(walk())
stale = sorted(p for p in remote - local if prunable(p))
kept = sorted(p for p in remote - local if not prunable(p))
print(f"prune plan: {len(stale)} stale file(s) to delete (dry run: {DRY})")
for p in stale:
    print("  DELETE", p)
if kept:
    print(f"  (left alone, outside site-output rules: {len(kept)} file(s))")
    for p in kept:
        print("  KEEP  ", p)
if len(stale) > MAX_DELETES:
    print(f"ABORT: {len(stale)} deletions exceeds cap of {MAX_DELETES}; nothing uploaded or deleted.")
    s.close(); t.close(); sys.exit(1)

n = 0
for d, _, fs in os.walk("out"):
    rel = os.path.relpath(d, "out")
    rd = ROOT if rel == "." else posixpath.join(ROOT, rel.replace(os.sep, "/"))
    try: s.mkdir(rd)
    except IOError: pass
    for f in fs:
        s.put(os.path.join(d, f), posixpath.join(rd, f)); n += 1
print("uploaded", n, "files")

if not DRY:
    for p in stale:
        s.remove(posixpath.join(ROOT, p))
    print("deleted", len(stale), "stale file(s)")
s.close(); t.close()
