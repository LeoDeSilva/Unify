# README

A 2 way file syncing service created to learn bun with the side effect of allowing simultaneous live coding. 

# Useage
```bash
> unify host --file trail.py --port 8000
Unify server hosted on port localhost:8000
2023-09-21T17:54:49.919Z: Syncing file trail.py

> unify join --port 8000
Listening to file 'trail.py' hosted on port localhost:8000
```

# Installation
```bash
bun compile
```
