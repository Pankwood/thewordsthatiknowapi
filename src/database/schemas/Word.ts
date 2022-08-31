import mongoose from "mongoose";

var currentDate = new Date();
const timeStampFromTheServer = new Date(Date.UTC(currentDate.getFullYear(),
    currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(),
    currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()));

const Word = new mongoose.Schema(
    {
        wordName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        userId: {
            type: Number,
            required: true,
            trim: true,
        },
        languageId: {
            type: String,
            required: true,
        },
        createAt: {
            type: Date,
            default: timeStampFromTheServer,
            immutable: true,
        }
    }
)

Word.pre('save', function (next) {
    this.createAt = timeStampFromTheServer;
    next();
});

export default mongoose.model("Word", Word);