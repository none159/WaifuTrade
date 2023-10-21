const { Schema, model } = require("mongoose")


const LevelSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    },

});
const karmaSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    karma: {
        type: Number,
        default: 0,
    },
    lastdaily: {
        type: Date,
        default: 0,
    },
})
const inventory = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    waifu: {
        type: Array,
        default: [],
    }
})
const shop = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    cost: {
        type: Array,
        default: [],
    },
    waifu: {
        type: Array,
        default: [],
    }
})
module.exports = {
    level: model('level', LevelSchema),
    karma: model('karma', karmaSchema),
    inventory: model('inventory', inventory),
    shop: model('shop', shop),
}
