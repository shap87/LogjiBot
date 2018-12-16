# Loji Backend

Loji (QB 3rd party app) backend's repo.  

### Installation

Requirements
* Python 3
* pipenv

To install pipenv
```
 pip install pipenv
```

### Initialization and Running

Get the repo
```
git clone https://github.com/sal-git/LojiBackend.git
```

Move into the directory with the `Pipfile` and `Pipfile.lock` and run the following:

```
pipenv install
```

It may take a while... ☕

```
pipenv shell
```

Move into the directory with `manage.py`

```
python manage.py runserver
```

Then your backend instance should be running on http://127.0.0.1:8000 

### Docs

Several docs are available

* Swagger

https://127.0.0.1:8000/swagger/

* Redoc 

http://127.0.0.1:8000/redoc/

* Django's Docs

http://127.0.0.1:8000/docs/
