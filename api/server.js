import dotenv from 'dotenv'
import requireDir from 'require-dir'
import express, { json } from 'express'
import cors from 'cors'
import _ from 'lodash'

/**
 * Load environment file
 */
dotenv.config()

/**
 * Generate express instance
 */
const app = express()

/**
 * Enable json and cors on express application
 */
app.use(json())

/**
 * Enable cors
 */
app.use(cors())
app.options('*', cors())

// Configured connection to database
require('./src/configs/database')

// Require all models from models folder
requireDir('./src/models')

/**
 * Load any files from route folder using lodash to loop object
 * and app to import any files for same base path
 */
_.forIn(requireDir('./src/routes'), (value) => {
  app.use('/', value.default)
})

/**
 * Handle 404 errors
 */
app.use(function(req, res, next) {
  res.status(404).send('404: File or route not found. Get out!');
});

/**
 * Listen application on specif port or default
 */
app.listen(process.env.APP_PORT || 3000)
