# Detect Docker Compose version (v2 first, fallback to v1)
DOCKER := $(shell docker compose version >/dev/null 2>&1 && echo "docker compose" || echo "docker-compose")

# Default target
.PHONY: dev setup down restart build lint typecheck test shell

## Setup project (env file + build images)
setup:
	cp -n .env.local.example apps/web/.env.local || true
	$(DOCKER) build

## Start development server
dev:
	$(DOCKER) up

## Stop containers
down:
	$(DOCKER) down

## Restart containers
restart:
	$(DOCKER) down && $(DOCKER) up

## Build containers without starting
build:
	$(DOCKER) build

## Run lint inside container
lint:
	$(DOCKER) run --rm web npm run lint

## Run TypeScript type check
typecheck:
	$(DOCKER) run --rm web npm run typecheck

## Run tests
test:
	$(DOCKER) run --rm web npm run test

check:
	$(DOCKER) run --rm web npm run lint
	$(DOCKER) run --rm web npm run typecheck
	$(DOCKER) run --rm web npm run build

## Open shell inside container
shell:
	$(DOCKER) run --rm web sh