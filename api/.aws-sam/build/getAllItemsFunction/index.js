const express = require("express");
const admin = require("firebase-admin");
const port = 3000;
const app = express();

const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tarefista-default-rtdb.firebaseio.com"
});

const routes = require("./routes/tasks");
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
