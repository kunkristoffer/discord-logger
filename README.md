# discord-logger
A discord bot with a web interface for logging discord chat interactions built using [DiscordJS]() and [Vue](), utilizing [Express](), [Node]() and [MongoDB](https://www.mongodb.com/try/download/community).



### Database and security
This project uses MongoDB to store data gathered trough Discord, while you can connect trough different services while cloning this repo, the code might need refactoring.


# Running this application
### 1. Clone/download files
First step is to clone this repo using your favorite cli/editor tool, if you need more help then you can check out this [vscode](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git) tutorial or this [youtube](https://www.youtube.com/watch?v=ZFFtMyOFPe8) tutorial.
### 2. Install dependencies and set up .env variables
```sh
npm install
```
Locate file named `.env.editme` and remove `.editme` so that the file only is called `.env` In this file you have to fill out all the fields with correct information. For help finding out the specific fields, you can read up on [Discord](https://discord.com/developers/docs/intro) for discord bots, [MongoDB](https://www.mongodb.com/docs/) for database and [ExpressJS](https://expressjs.com/) for express server settings
### 3. Running the server (as dev)
```sh
npm run dev
```
This starts a local server, hosting is out of scope for this readme. Try googling.
### 4. Accessing
You can now access this project by going to your favorite browser and visting `http:localhost:port#`
### 5. Discord logging
This application will only record messages while its running, if you close down the service no messages will be logged. If requested, I'll add the possibility to fetch other messages. However, discord does have certain limitations for fetching old messages or channel histories.

# Common problems
You might encounter some issues while trying to run this application, below are a few of the issues I've encountered with this project.

### Path issues with cli on windows
If you're getting the error ``The term '...' is not recognized as the name of a cmdlet`` when trying to use cli command names, check your system enviromentals path settings. This can be done trough opening system properties > Environment Variables then clicking path and selecting edit.
You can then add paths for the executables you need.