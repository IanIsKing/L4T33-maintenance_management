My Maintenance App

With this app you submit a job that needs doing, including its description, location, and
priority. Each job has a status, being one of submitted, in progress, and completed.
It uses filtering and searching to make finding all Jobs easy.
○ List all jobs, ordered by status and date submitted.
○ Update information about a single job.
○ Update status of multiple jobs at once (batch update).
○ Archive a specific job (so that it is no longer shown on the list, but isn’t
totally deleted)
○ Filter jobs by status, date, status, description (such that only jobs of one status are shown at a
time).

Getting started

BackEnd
This app has a node.js Express back end with mongoDB atlas for data base.
Please create a .env with the following:
DB_URI=<Your mongoBD connection>
PORT=5000
Npm start will start the backend

FrontEnd
React front end,
To start the front end npm start.
should you need to, create a .env file
REACT_APP_BACKEND_URL=http://localhost:5000/api
