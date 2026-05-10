.DEFAULT_GOAL := help

TITLE_FROM_GOALS = $(strip $(filter-out $@,$(MAKECMDGOALS)))
CONTENT_TITLE = $(strip $(if $(TITLE),$(TITLE),$(TITLE_FROM_GOALS)))
DATE_ARG = $(if $(DATE),--date $(DATE),)

.PHONY: help install build preview content content-dry-run import-wordpress import-wordpress-dry-run clean

help:
	@printf '%s\n' 'Available targets:'
	@printf '%s\n' '  make content "Some title"      Create a dated Markdown file, metadata, and matching assets folder'
	@printf '%s\n' '  make content TITLE="Some title" Same as above, with explicit TITLE='
	@printf '%s\n' '  make content "Some title" DATE=2026-05-10'
	@printf '%s\n' '  make content-dry-run "Some title"'
	@printf '%s\n' '  make preview                   Run the local preview server'
	@printf '%s\n' '  make build                     Build the static site'
	@printf '%s\n' '  make import-wordpress          Import public posts from the old WordPress site'
	@printf '%s\n' '  make import-wordpress-dry-run  Preview the WordPress import'
	@printf '%s\n' '  make install                   Install Node dependencies'
	@printf '%s\n' '  make clean                     Remove local build output'

install:
	npm install

build:
	npm run build

preview:
	npm run start

content:
	@if [ -z "$(CONTENT_TITLE)" ]; then \
		printf '%s\n' 'Usage: make content "Some title"'; \
		printf '%s\n' '   or: make content TITLE="Some title"'; \
		exit 1; \
	fi
	npm run new -- "$(CONTENT_TITLE)" $(DATE_ARG)

content-dry-run:
	@if [ -z "$(CONTENT_TITLE)" ]; then \
		printf '%s\n' 'Usage: make content-dry-run "Some title"'; \
		exit 1; \
	fi
	npm run new -- "$(CONTENT_TITLE)" $(DATE_ARG) --dry-run

import-wordpress:
	npm run import:wordpress

import-wordpress-dry-run:
	npm run import:wordpress -- --dry-run

clean:
	rm -rf _site

%:
	@if [ "$@" = "$(firstword $(MAKECMDGOALS))" ]; then \
		printf '%s\n' 'Unknown target: $@'; \
		printf '%s\n' 'Run make to see available targets.'; \
		exit 2; \
	fi
