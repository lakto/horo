BIN = ./node_modules/.bin
# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
THIS_FILE := $(lastword $(MAKEFILE_LIST))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
LIB_DIR := $(shell node -pe "require('$(CURRENT_DIR)/angular.json').projects['@lakto/horo'].root")

define update-version
	# update version: first as dry-run (which doesn't exist with npm version). The user has to confirm the update
	CURRENT_VERSION=`node -pe "require('./package.json').version"` && \
	npm version $(1) --preid=$(2) --git-tag-version=false --commit-hooks=false && \
	VERSION=`node -pe "require('./package.json').version"` && \
	echo -n "This will update from $$CURRENT_VERSION to $$VERSION ($(1)). Do you want to continue? [Y/n]" && \
	read ans && \
	([ $${ans:-N} != Y ] && \
	npm version $$CURRENT_VERSION --git-tag-version=false --commit-hooks=false && exit 1) || \
	([ $${ans:-N} = Y ]) && \
	cd $(LIB_DIR) && \
	npm version "$$VERSION" && \
	cd $(CURRENT_DIR) && \
	git add package.json $(LIB_DIR)package.json

	# If answer is not "yes": reset version (= dry-run)
	# else: continue and update lib package and make release tag on github

	# if $$ans:-n = Y echo 'good' else 'bad' fi
	#
	# Confirm the action
	# update to next version

	# read current version and update package version
	# VERSION=`node -pe "require('./package.json').version"` && \
	echo "Current_VERSION $(CURRENT_VERSION)" && \
	echo "VERSION $$VERSION" && \
	cd $(LIB_DIR) && \
	npm version "$$VERSION" && \
	cd $(CURRENT_DIR)
endef

.PHONY: clean

.PHONY: npm-install
npm-install: ## runs 'npm install'
	@npm install

.PHONY: release-candidate
release-candidate: ## updates version to next release candidate e.g. from 3.0.0-rc.0 to 3.0.0-rc.1
	@$(call update-version,prerelease,rc)

.PHONY: release-patch
release-patch: ## updates version to next PATCH version e.g. from 3.0.0 to 3.0.1
	@$(call update-version,patch)

.PHONY: release-prepatch
release-prepatch: ## updates version to next PATCH as release-candidate e.g. from 3.0.1 to 3.0.2-rc.0
	@$(call update-version,prepatch,rc)

.PHONY: release-minor
release-minor: ## updates version to next MINOR version e.g. from 3.0.0 to 3.1.0
	@$(call update-version,minor)

.PHONY: release-preminor
release-preminor: ## updates version to next MINOR as release-candidate e.g. from 3.1.0 to 3.2.0-rc.0
	@$(call update-version,preminor,rc)

.PHONY: release-major
release-major: ## updates version to next MAJOR version e.g. from 3.0.0 to 4.0.0
	@$(call update-version,major)

.PHONY: release-premajor
release-premajor: ## updates version to next MAJOR as release candidate e.g. from 4.0.0 to 5.0.0-rc.0
	@$(call update-version,premajor,rc)

# Re-usable target for yes no prompt. Usage: make .prompt-yesno message="Is it yes or no?"
# Will exit with error if not yes
.prompt-yesno:
	@exec 9<&0 0</dev/tty
	echo "$(message) [Y]:"
	[[ -z $$FOUNDATION_NO_WAIT ]] && read -rs -t5 -n 1 yn;
	exec 0<&9 9<&-
	[[ -z $$yn ]] || [[ $$yn == [yY] ]] && echo Y >&2 || (echo N >&2 &&  && exit 1)

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
