import { testConnection } from "./db/pool";

testConnection()
  .then(success => {
    if (!success) {
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
