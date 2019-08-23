import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import morgan from 'morgan'

export default function (server) {
  console.info('SETUP - Loading modules... = ', path.join(__dirname, '..', '..', "public"))

  // Enable CORS
  server.use(cors())

  // Request body parser
  // server.use(bodyParser.json())
  // server.use(bodyParser.urlencoded({ extended: false }))

  server.use(express.static(path.join(__dirname, '..', '..', "public")));
  server.use(bodyParser.json())

  // Request body cookie parser
  server.use(cookieParser())

  // Static files folder
  // server.use(express.static(path.join(__dirname, '..', '..', 'public')))

  // HTTP logger
  // if(NODE_ENV === 'development') {
  //   server.use(morgan('tiny'))
  // }
}
