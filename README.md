# Rockshave

## Docker

The project is structured to use a docker comntainer that contains the api, web and mobile application images that we'll use to run the application locally.

### Installation and configuration

- In order to use the existent docker images we'll first need to install [Docker Desktop](https://www.docker.com/) to your desired OS. 
- Once it is installed we also need to instantiate the remote containers to our local machine by running the terminal command `docker compose up -d`
- Web and mobile applications runs locally, respectivelly, against `localhost:3000` and `localhost:8100` ports while the database manager runs against `localhost:17017` port

**Note:** the `-d` argument specify the detach option which will run docker in the background while still allowing the terminal to be queried freely

It is also posible to remove docker containers and images running the terminal `docker compose down` command.

**Note:** be aware that this command will remove containers, images, and any storage (e.g. database information). Once executed existent storage is lost and you'll need to compose a fresh container to use it's images again.