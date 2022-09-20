# Messenger API

## locally run

1. build
   ```bash
   cp docker-compose.override.example.yml docker-compose.override.yml

   docker-compose -p messenger build
   ```
1. start
   ```bash
   docker-compose -p messenger up -d
   ```
1. logs
   ```bash
   docker-compose -p messenger logs -f server
   ```
1. stop
   ```bash
   docker-compose -p messenger stop
   # or with cleaning
   docker-compose -p messenger down
   ```
1. run migration in postgres
   ```bash
   docker-compose -p messenger exec -T server yarn run migrate:up
   ```
   