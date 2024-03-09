# run the web app
run: check_npm close
	@if [ -d "./chat_room/node_modules" ] && [ -d "./chat_room_react/node_modules" ]; then \
		chmod +x ./config/run.sh; \
		./config/run.sh; \
		chmod -x ./config/run.sh; \
	else \
		$(MAKE) install_package; \
		$(MAKE) run; \
	fi

# terminate the application at port 3000
# to avoid issues
close:
	@if [ $$(lsof -ti :3000 | wc -l) -ge 1 ]; then \
		kill -9 $$(lsof -ti :3000); \
	else \
		echo "No processes found!"; \
	fi

# check if npm is installed
# call "make install_npm" if not installed
check_npm:
	@chmod +x ./config/npm_check.sh
	@./config/npm_check.sh
	@chmod -x ./config/npm_check.sh

# install npm for various OS
install_npm:
	@chmod +x ./config/npm_install.sh
	@./config/npm_install.sh
	@chmod -x ./config/npm_install.sh

# install packages using "npm install" for 
# the backend and frontend
install_package: check_npm
	@chmod +x ./config/package_install.sh
	@./config/package_install.sh
	@chmod -x ./config/package_install.sh

.PHONY: run close install_package install_npm check_npm
