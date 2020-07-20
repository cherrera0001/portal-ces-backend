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
	docker-compose down
	docker volume rm portal-ces-backend_db
	rm -f tmp/pids/*
	rm -f .bundled
	docker-compose rm -f
	rm -f .built

test: build
	docker-compose run -e NODE_ENV=test app npm t

testView: build
	docker-compose run -e NODE_ENV=test app npm run testView

logs:
	docker-compose logs
