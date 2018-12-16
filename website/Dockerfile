FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /opt/website
ADD . .
RUN pip install -r requirements.txt
CMD python3 manage.py runserver 0.0.0.0:8081
