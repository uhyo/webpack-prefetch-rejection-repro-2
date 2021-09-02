console.log("Hello, world!")

import("./split.js").catch((err) => {
  console.error("import failed", err)
})