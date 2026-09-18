require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const ProjectModel = require("./models/Projects.model");
const TaskModel = require("./models/Tasks.model");

const app = express();
const port = Number(process.env.PORT) || 5001;
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
}

app.use(cors({
    origin: process.env.CLIENT_URL
        ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
        : ["http://localhost:5173", "http://localhost:5174"],
}));
app.use(express.json());
app.use(routes);

const ensureCodeIndexes = async () => {
    const indexesToReplace = [
        {
            model: ProjectModel,
            keys: ["workspaceId", "projectCode"],
            codeKey: "projectCode",
            replacement: {
                workspaceId: 1,
                projectCode: 1,
            },
            options: {
                unique: true,
                name: "workspace_projectCode_unique_nonempty",
                partialFilterExpression: {
                    projectCode: { $type: "string" },
                },
            },
        },
        {
            model: TaskModel,
            keys: ["taskCode"],
            codeKey: "taskCode",
            replacement: { taskCode: 1 },
            options: {
                unique: true,
                name: "taskCode_unique_nonempty",
                partialFilterExpression: {
                    taskCode: { $type: "string" },
                },
            },
        },
    ];

    for (const indexDefinition of indexesToReplace) {
        await indexDefinition.model.updateMany(
            { [indexDefinition.codeKey]: "" },
            { $unset: { [indexDefinition.codeKey]: 1 } }
        );

        const indexes = await indexDefinition.model.collection.indexes();
        const matchingIndexes = indexes.filter((index) => {
            const indexKeys = Object.keys(index.key || {});
            return indexKeys.includes(indexDefinition.codeKey);
        });

        for (const index of matchingIndexes) {
            await indexDefinition.model.collection.dropIndex(index.name);
        }

        await indexDefinition.model.collection.createIndex(
            indexDefinition.replacement,
            indexDefinition.options
        );
    }
};

mongoose.connect(mongoUri)
    .then(async () => {
        await ensureCodeIndexes();
        app.listen(port, () => {
            console.log(`API listening on port ${port}`);
        });
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed", error);
        process.exitCode = 1;
    });
