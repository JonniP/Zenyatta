const firstMessage = require('./first-message')

module.exports = (client) => {
  const channelId = '770742386602672169'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    wow: 'World of Warcraft',
    lol: 'League of Legends',
    impostor: 'Among Us',
    mtg: 'Magic the Gathering',
  }

  const reactions = []

  let emojiText = 'Hello Tema! React below which channels you want to see:\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = ${role}\n`
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '404002340174036992') {
      return
    }

    const emoji = reaction._emoji.name
    var roleName = emojis[emoji]
    const { guild } = reaction.message

    if (!roleName) {
      console.log("no emoji found: " + emoji)
      return
    }

    switch(roleName){
      case "League of Legends":
        roleName = "Kutsuja"
        break
      case "Among Us":
        roleName = "Impostor"
        break
      case "Magic the Gathering":
        roleName = "Taikuri"
        break
      case "World of Warcraft":
        roleName = "Lorewalker Cho"
        break
      default:
        console.log("Switch failed")
    }

    console.log(roleName)

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)


    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}