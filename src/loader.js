importScripts("../node_modules/systemjs/dist/system.src.js", "../node_modules/angular2/bundles/web_worker/worker.dev.js");
importScripts("b64.js");


System.config({
    packages: {"app": {defaultExtension: "js"}}
});

System.import("app/background_index").then(
  function(m) {
    m.main();
  },
  function(error) { console.error("error loading background", error);
});
