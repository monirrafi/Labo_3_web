let connexion = [
    {"id":1,"courriel":"curie@gmail.com", "pass":"12345","statut":"A","role":"M"},
    {"id":2,"courriel":"bond@gmail.com", "pass":"12345","statut":"I","role":"M"}
];

let seConnecter = () => {
     let courriel = document.getElementById('courrielc').value;
     let pass = document.getElementById('passc').value;
     let msgErr="";
     //Parcourrir le tableau connexion.
     //uneConnexion est un objet de ce tableau
     for(let uneConnexion of connexion){
        if(uneConnexion.courriel == courriel && uneConnexion.pass == pass){
            if(uneConnexion.statut == "A") {
                document.getElementById('formConnexion').reset(); //Vider le formulaire
                basculerVisibilteModal('modalConnexion','cacher'); //Cacher le modal de id modalConnexion
                window.open('pages/commande.html');//rediriger vers la page membre.html
            } else {
                msgErr="Impossible de vous connecter. Contactez l'administrateur.";
                break;
            }
        }
     }
     if(msgErr.length == 0){
        msgErr="Vérifiez vos paramètres de connexion.";
     }
     document.getElementById('formConnexionErr').innerHTML = msgErr;
     setTimeout(() => {
             document.getElementById('formConnexionErr').innerHTML="";
             document.getElementById('formConnexion').reset();
        }, 5000);
    }

