const Discord = require('discord.js')

module.exports = {
    name: 'lock',
    description: 'Tranca o atual canal de texto.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'canal',
            description: 'Mencione um canal para ser trancado.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ ephemeral: true, content: `👋 Usuário: **${interaction.user.username}**, você não possui a permissão \`Gerenciar Canais\` para utilizar este comando.` })
        } else {
            const channel = interaction.options.getChannel('canal')
            channel.permissionOverwrites.edit(interaction.guild.id, {
                    SendMessages: false
                }).then( () => {
                    interaction.reply({ content: `🔒 Admin: **${interaction.user.username}**, este canal foi trancado com sucesso.` })
                }).catch(err => {
                    interaction.reply({ content: `❌ Admin: **${interaction.user.username}**, não foi possível trancar este canal.` })
                })
        }
    }
}