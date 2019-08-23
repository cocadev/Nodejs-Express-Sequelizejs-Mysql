import dotenv from 'dotenv'

// Load .env
dotenv.config()

// URL
export const APP_URL = process.env.APP_URL
export const APP_URL_API = process.env.APP_URL_API

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 5000
export const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY
export const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY
export const GCMAPIKEY = process.env.GCMAPIKEY
export const DATABASE = process.env.DATABASE
export const USERNAME = process.env.USERNAME
export const PASSWORD = process.env.PASSWORD
export const HOST = process.env.HOST
export const DIALECT = process.env.DIALECT
export const POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};