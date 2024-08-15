import express from 'express';
import generateContentRoute from './routes/generateContent.js';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import userModel from './models/User.js';
import connectDB from './config/db.js';
import eventModel from './models/Event.js'
import generateContent from './config/GoogleGenerativeAI.js';

try {
    connectDB();
} catch (error) {
    console.log(err);
    process.kill(process.pid, 'SIGTERM');
}

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Telegraf bot
const bot = new Telegraf(process.env.BOT_KEY);

bot.start(async (ctx) => {
    // console.log(ctx);
    const from = ctx.update.message.from;
    // console.log('from ', from);

    try {
        await userModel.findOneAndUpdate(
            { tgId: from.id },
            {
                $setOnInsert: {
                    firstName: from.first_name,
                    lastName: from.last_name,
                    isBot: from.is_bot,
                    username: from.username,
                },
            },
            { upsert: true, new: true }
        );

        await ctx.reply(`Hey ${from.first_name}, Welcome! 🌟 I'm here to help you keep track of your events throughout the day. You're doing an amazing job staying organized! 💪\n\nFeel free to add events anytime. Have a wonderful day! 😊`);
    } catch (error) {
        console.log('Error while starting bot:', error);
    }

});

bot.command('generate', async (ctx) => {
    try {
        const from = ctx.update.message.from;

        const { message_id: waitingMessageId } = await ctx.reply(
            `Hey ${from.first_name}, kindly wait for a moment. I am creating post for you.`
        );

        // const {message_id: stickerWaitingId} = await ctx.replyWithSticker('CAACAgIAAxkBAAM6ZoFjNgEK2xuj1GNBt9Oq3pM70TYAAkoHAAJG-6wEI0KbDV_exOA1BA'); funny
        const {message_id: stickerWaitingId} = await ctx.replyWithSticker('CAACAgIAAxkBAANFZoFlOWpmZGZlYVOpJ7M8yUvmdXsAAiwAAyRxYhrFIOYD73j85DUE');

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        //get events for the user
        const events = await eventModel.find({
            tgId: from.id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            }
        });

        

        if (events.length === 0) {
            await ctx.reply('No events for the day.');
            return;
        }

        console.log('events', events);

        // Store all events.text in AllEvents
        let AllEvents = [];
        events.forEach(event => {
            AllEvents.push(event.text);
        });


        //make textGeneration api
        const result = await generateContent(AllEvents);
        const response = await result.response;
        console.log('responce :', response);
        const text = await response.text();

        //send response
        await ctx.deleteMessage(waitingMessageId);
        await ctx.deleteMessage(stickerWaitingId);
        await ctx.reply(text)
    } catch (error) {
        console.log('Facing Issues');
    }
});


// bot.on(message('sticker'), (ctx) => {
//     console.log("sticker ", ctx.update.message);
// })


bot.on(message('text'), async (ctx) => {
    const from = ctx.update.message.from;
    // console.log(ctx);
    const message = ctx.update.message.text;

    try {
        await eventModel.create({
            text: message,
            tgId: from.id,
        });

        await ctx.reply('Noted 👍 ,  keep texting me your thoughts. To generate the posts, just enter the command  :  /generate');

    } catch (error) {
        console.log(error);
        await ctx.reply('Facing difficulties, please try again letter.');
    }


});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Use the generate content route
app.use('/api/generatecontent', generateContentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
