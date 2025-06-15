import { request } from "http";
import mongoose, { Mongoose } from "mongoose";

declare global {
    // eslint-disable-next-line no-var
    var _mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

const startupSchema = new mongoose.Schema({
    request_id: {
        type: String,
        required: true,
        unique: true,
    },
    request: {
        type: Object,
        required: true,
    },
    geoLocation: {
        type: Object
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    }
},
    {
        timestamps: true,
    });

const Startup = mongoose.models.Startup || mongoose.model("Startup", startupSchema);

export default Startup;

// Using globalThis instead of redefining global
if (!globalThis._mongoose) {
    globalThis._mongoose = {
        conn: null,
        promise: null,
    };
}

async function dbConnect() {
    if (globalThis._mongoose.conn) {
        return globalThis._mongoose.conn;
    }

    if (!globalThis._mongoose.promise) {
        const opts = {
            bufferCommands: false,
        };

        globalThis._mongoose.promise = mongoose.connect(process.env.DB_URL!, opts).then((mongoose) => {
            return mongoose;
        });
    }
    globalThis._mongoose.conn = await globalThis._mongoose.promise;
    return globalThis._mongoose.conn;
}

export { dbConnect };