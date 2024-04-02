
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { TOKEN, GUILD_ID, CHANNEL_ID } from '../../config/index.js'
import updateAttendance from '../mongodb/post/attendance.js'

const connectDiscordBot = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  })

  try {
    // Log in to Discord with your client's token
    client.login(TOKEN)

    // Console log if connection is successfull
    client.once(Events.ClientReady, readyClient => {
      console.log(`Discord.js is Ready! Logged in as ${readyClient.user.tag}`)
    })
  }
  catch (err) {
    console.log('Error connecting to discord')
  }

  // Function fires when a user writes a message
  client.on("messageCreate", event => {
    // Only run function in specified guild & channel to avoid cross contamination
    if (event.guildId === GUILD_ID & event.channelId === CHANNEL_ID) {
      // Creates a payload for database insertion
      const payload = {
        user: event.author.id,
        timestamp: event.createdTimestamp,
        message: event.content
      }

      // Send payload to mongoDB post handler
      updateAttendance(payload)
    }
  })
}

// Export this discord bot for use in main.js > express
export default connectDiscordBot