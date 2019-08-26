import express from 'express'

// App Imports
import setupLoadModules from './app/setup/load-modules'
import setupDB from './app/setup/db-migrate'
import setupNotification from './app/setup/push-notification'
import setupRouter from './app/setup/router'
import setupStartServer from './app/setup/start-server'

// Create express server
const app = express();

setupLoadModules(app)
setupNotification(app)
setupDB(app)
setupRouter(app)
setupStartServer(app)



