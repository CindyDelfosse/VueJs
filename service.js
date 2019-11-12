const version = '1.0.0'

self.addEventListener("install", event => {
    console.log("INSTALL service worker version " + version)
    return self.skipWaiting()
})

self.addEventListener("activate", event => {
    console.log("ACTIVATE service worker version " + version)
    //return self.skipWaiting()
})

self.addEventListener("fetch", () => {
    // met en écoute le service
})