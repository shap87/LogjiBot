## Loji
To start working with the project, please do the following:
- setup [docker](https://www.docker.com/get-started)
- setup [docker-compose](https://docs.docker.com/compose/install/)
- setup [dnsmasq](https://wiki.debian.org/HowTo/dnsmasq)
- create `.env` files in `config` directory at the root of the project

`.env` file we use to specify urls for the backend api, the frontend app and the website url. Here is an example of urls, keep `DB_URL` the same, other parts should use your config for `dnsmasq`
```bash
API_URL=api.loji.host
API_PORT=8090
APP_URL=app.loji.host
APP_PORT=8080
WEBSITE_URL=loji.host
WEBSITE_PORT=8081
DB_URL=postgresql://postgres

```


`.app.env` we use for the frontend app, it should contain a link to api and its version
```bash
REACT_APP_API_URL=api.loji.host:8090/api
REACT_APP_API_VERSION=1
```

We use `8080` port for the frontend application, `8081` for the website and `8090` for the backend api service.

#### Comands

- to run the project
```bash
docker-compose up -d --build
```

- to stop the project
```bash
docker-compose down
```

- to restart any service
```bash
docker-compose restart <name_of_service>
```
it can be `api`, `app` or any other service in the project
