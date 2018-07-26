import { ServerApp } from 'meseret/lib'
import { appConfig } from './configs/appConfig'

export const serverApp = new ServerApp(appConfig)

serverApp.start().catch(console.error)
