import * as dotenv from 'dotenv'
dotenv.config()

// Express config
export const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT
export const EXPRESS_CLIENT_PORT = process.env.EXPRESS_CLIENT_PORT

// MongoDB config
export const DB_KEY = process.env.MONGODB_KEY
export const MONGODB_URL = process.env.MONGODB_URL
export const MONGODB_DB = process.env.MONGODB_DB

// DiscordJS config
export const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
export const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID