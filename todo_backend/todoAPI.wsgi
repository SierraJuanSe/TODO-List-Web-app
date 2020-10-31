#!/usr/bin/python3

import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, "/var/www/TODO-List-Web-app/todo_backend/venv/lib/python3.8/site-packages")
sys.path.insert(0, "/var/www/TODO-List-Web-app/todo_backend/")
from main import app as application
application.secret_key = 'secretkey'

