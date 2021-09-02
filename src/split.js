console.log("This is split chunk");

import(/* webpackPrefetch: true */ "./split2.js").catch((error) => {
  console.error("import failed!", error);
})