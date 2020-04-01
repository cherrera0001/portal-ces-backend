SHELL := /bin/bash

all: build run

run: build
	docker-compose run app npm i
	docker-compose up

build: .built

.built: Dockerfile
	docker-compose build
	touch .built

stop:
	docker-compose stop

restart: build
	docker-compose restart app

clean: stop
	rm -f tmp/pids/*
	docker-compose rm -f -v bundle_cache
	rm -f .bundled
	docker-compose rm -f
	rm -f .built

test: build
	docker-compose run -e NODE_ENV=test app npm t

logs:
	docker-compose logs
