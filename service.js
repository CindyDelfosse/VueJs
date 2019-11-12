const version = '1.0.1'

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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    workbox.precaching.precacheAndRoute([
        {
            "url" : "index.html"
        },
        {
            "url" : "style.css"
        },
        {
            "url" : "manifest.json"
        },
        {
            "url" : "icon-96-96.png"
        },
        {
            "url" : "favicon.ico"
        },
        {
            "url" : "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
        },
        {
            "url" : "main.js"
        },
        {
            "url" : "install.js"
        },
        {
            "url" : "sw-register.js"
        },
        {
            "url" : "https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"
        }
    ])

    workbox.routing.registerRoute(
        /(.*)\.(?:png|gif|jpg|css)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'design-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30*24*60*60 // 30days
                })
            ] 
        })
    )

    workbox.routing.registerRoute(
        "https://api.irail.be/stations/?format=json", 
        new workbox.strategies.NetworkFirst({
            cacheName: "api-cache",
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 30*24*60*60
                })
            ]
        })
    )
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}