
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { DISCORD_TOKEN, DISCORD_GUILD_ID, DISCORD_CHANNEL_ID } from '../../config/index.js'
import postMessage from '../mongodb/create/message.js'

const connectDiscordBot = () => {
  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  })

  try {
    // Log in to Discord with your client's token
    discordClient.login(DISCORD_TOKEN)

    // Console log if connection is successfull
    discordClient.once(Events.ClientReady, readyClient => {
      console.log(`Discord.js is Ready! Logged in as ${readyClient.user.tag}`)
    })
  }
  catch (err) {
    console.log('Error connecting to discord')
  }

  // Function fires when a user writes a message
  discordClient.on("messageCreate", event => {
    // Only run function in specified guild & channel to avoid cross contamination
    if (event.guildId === DISCORD_GUILD_ID && event.channelId === DISCORD_CHANNEL_ID) {
      // Send payload to database handler
      postMessage( event.author.id, event.author.displayName, new Date(event.createdTimestamp), event.content )
    }
  })
}

// Export this discord bot for use in main.js > express
export default connectDiscordBot