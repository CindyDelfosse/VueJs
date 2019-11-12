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
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}