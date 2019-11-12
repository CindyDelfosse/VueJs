//INSTALL
    let installBtn = document.querySelector(".install")
    
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        //On récupère l’évènement pour l'utiliser plus tard
        deferredPrompt = e;

        //On affiche le bouton d'installation
        installBtn.style.display = 'block';
    });

    installBtn.addEventListener('click', (e) => {
        installBtn.style.display = 'none';
        // Affiche la demande d’installation 
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Installation réussie');
            } else {
                console.log('Installation refusée');
            }
            deferredPrompt = null;
        });
    });