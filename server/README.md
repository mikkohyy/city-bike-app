# Server

## When developing

To be able to run the dev environment you need to have the ability to run Docker containers since the database that is used in development environment runs in a docker container.

Important step is to define the needed environment variables. For development one needs to have defined the DEVELOPMENT_DB i.e. the address of the postgress database that is used when developing and also the PORT variable which is the port that the server is listening to.

Run development server:

    npm run dev

Start docker container that creates the needed postgres database. In root:

    docker compose -f docker-compose-pg.dev.yml up -d

Enter the postgres container eg:

    docker exec -it city-bike-app-dev-postgres-1 psql -U user dev-db

Fill database with data

    npm run dev:fill_database

Rollback migration (for example when wanting to reset the database)

    npm run dev:migration:down

## When tsting

Run tests:

    npm run test

Start docker container that creates the needed postgres database. In root directory:

    docker compose -f docker-compose-pg.test.yml up -d

Enter the postgres container:

    docker exec -it city-bike-app-test-postgres-1 psql -U user test-db
