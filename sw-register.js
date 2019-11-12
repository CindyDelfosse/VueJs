
 if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {    
            navigator.serviceWorker.register('service.js')
            .then(function(reg) {
                console.log('notify', 'Service worker is started @ scope ' + reg.scope);
            }).catch(function(error) {
                console.log('alert', 'Service worker registration failed with ' + error);
            });
            });
    } else {
        console.log('alert', 'Your browser do not support Service Worker');
    }