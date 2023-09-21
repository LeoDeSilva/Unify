# Unify

## Workflow

> unify serve (--file) temp.py --port 8000
unify server running on port localhost:8000

> unify listen --port 8000
...syncing folder ./src 

**PERHAPS**

> unify host temp.py --port 8000
unify server running on port localhost:8000

> unify join 8000
...syncing file temp.py 


## Tasks
[ ] Port selection for listener
[ ] Filename argument for listener (for alternate filename write)
[ ] Merge listener and server into partner / instance etc.. and allow **2 way sync**
[ ] Expand this into a full directory sync