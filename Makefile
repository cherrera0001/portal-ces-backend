SHELL := /bin/bash

all: build run

run: build
	docker-compose up
build: .built

.built: Dockerfile
	docker-compose build

stop:
	docker-compose stop

restart: build
	docker-compose restart app

clean: stop
	docker-compose down -v --rmi all --remove-orphans

test: build
	docker-compose run -e NODE_ENV=test app npm t

testView: build
	docker-compose run -e NODE_ENV=test app npm run testView

logs:
	docker-compose logs
