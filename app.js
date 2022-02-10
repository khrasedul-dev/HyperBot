const fs = require('fs')
const {Telegraf , Composer} = require('micro-bot')

const bot = new Telegraf('5288985896:AAF9i0ak0a3FPGXuwtaB-0zGZ6UtFmSdNGs')


bot.start((ctx)=>{
    ctx.reply("Bot works only in groups")
})


bot.hears('hyperbotstart',(ctx)=>{

    fs.readFile('db.txt',(err,data)=>{

        const showTest = data.toString()
        
        bot.telegram.sendMessage(ctx.chat.id , showTest ).catch('Something is wrong')

        setInterval(()=>{
            bot.telegram.sendMessage(ctx.chat.id , showTest ).catch('Something is wrong')
        },1000*10)
    })

})

bot.hears(/addhyperbotmessage/gi,(ctx)=>{
    const text = ctx.update.message.text
    const finaltext = text.replace("addhyperbotmessage","")
    const textForSaved = finaltext.trim()

    fs.open('db.txt', 'w', function (err, file) {
        if (err) {
            console.log(err)
        } else {
            fs.writeFile('db.txt', textForSaved , function (err) {
                if (err) throw err;
                ctx.reply("Your message sucessfully set").catch("Something is wrong")
            });  
        }
    });
})





bot.launch()