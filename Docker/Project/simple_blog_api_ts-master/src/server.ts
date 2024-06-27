import app from "./app";
import databaseConnection from "./database/database.connection";

// Process.env will always be comprised of strings, so we typecast the port to a number
const PORT: number = Number(process.env.PORT) || 3000;

databaseConnection
  .then(() =>
    app.listen(PORT, () => {
      console.log(`⚡Application running on port: ${PORT}`);
    })
  )
  .catch(console.error);
