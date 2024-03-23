import * as dotenv from 'dotenv'
dotenv.config()

// MongoDB config
export const DB_KEY = process.env.MONGODB_KEY

// DiscordJS config
export const TOKEN = process.env.DISCORD_BOT_TOKEN
export const GUILD_ID = process.env.DISCORD_GUILD_ID
export const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID

