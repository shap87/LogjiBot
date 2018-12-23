FROM python:latest
WORKDIR /opt/api
RUN pip3 install pipenv
ADD . .
RUN pipenv install --system --deploy
CMD python3 ./lojibackend/manage.py runserver 0.0.0.0:8090
