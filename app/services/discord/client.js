
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { TOKEN, GUILD_ID, CHANNEL_ID } from '../../config/index.js'

const discord = () => {
  const bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  })

  bot.once(Events.ClientReady, readyClient => {
    console.log(`Discord.js is Ready! Logged in as ${readyClient.user.tag}`);
  })

  bot.on("messageCreate", message => {
    // Only run function in specified guild & channel to avoid cross contamination
    if (message.guildId === GUILD_ID & message.channelId === CHANNEL_ID) {
      // Creates a payload for database insertion
      const payload = {
        user: message.author.id,
        time: Date.now(),
        content: message.content
      }

      console.log(payload)
    }
  })

  // Log in to Discord with your client's token
  bot.login(TOKEN)
}

// Export this discord bot for use in main.js > express
export default discord