FROM python:3.4
WORKDIR /opt/api
RUN pip install pipenv
ADD . .
RUN pipenv install --system --deploy
CMD python3 ./lojibackend/manage.py runserver 0.0.0.0:8090
