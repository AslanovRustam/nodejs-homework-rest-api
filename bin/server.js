const app = require("../app");
const db = require("../model/db");

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
db.then(() => {
  app.listen(PORT, () => {
    // console.log(`Server running. Use our API on port: ${PORT}`);
    console.log(`Database connection successful`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
