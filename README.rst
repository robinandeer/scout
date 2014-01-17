# scout

Flask backend
---------------
The Flask server has a number of responsibilities. The main areas include serving as a REST API endpoint and authenticating users through Google OAuth.

REST API
~~~~~~~~~~
The bulk of the requests will simply be routed to a Tornado server that talks to the main database. Flask will intercept, tag a secondary request with privileges, fetch a JSON payload that will be returned to the browser.

As it seems now this can internally be handled by a single Flask route.

A logged in user will also be able to submit an issue to GitHub through a simple HTML form on the POST route '/issue/new'. In the future I might considering adding support for reading and writing comments as well.

OAuth flow
~~~~~~~~~~~~
Each user must login though Google OAuth2 and will be added as a new user or simply logged in as an existing user. A secondary request will also here be sent to the Tornado server to determine proper permissions etc. identified by the user email.

A separate SQLite database will be tied to the Flask environment for storing users and some basic meta-data.

Upon reaching the index route, Flask will determine login status. If OK'd, the full app interface will be revealed. Otherwise a simple login template will be shown instead.
