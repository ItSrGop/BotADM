const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Desbane um usuário.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membro',
            description: 'Membro que será desbanido.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'motivo',
            description: 'Motivo a qual o membro será desbanido.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        },
    ],

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ ephemeral: true, content: `👋 Usuário: **${interaction.user.username}**, você não possui a permissão \`Banir Membros\` para utilizar este comando.` })
        } else {
            const user = interaction.options.getUser('membro')
            let motivo = interaction.options.getString('motivo')
            if(!motivo) motivo = 'Indefinido'

            interaction.guild.members.unban(user.id, motivo).then( () => {
                interaction.reply({ content: `✅ Admin: **${interaction.user.username}**, o membro ${user} (${user.id}) foi desbanido com sucesso.` })
            }).catch(err => {
                interaction.reply({ content: `❌ Admin: **${interaction.user.username}**, não foi possível desbanir o membro ${user} (${user.id}).` })
            })
        }
    }
}