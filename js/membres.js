
let membres = [
    {"id":1,"prenom":"Marie","nom":"Curie","sexe":"F","daten":"1925-04-23"},
    {"id":2,"prenom":"James","nom":"Bond","sexe":"M","daten":"1967-02-16"}
];

let autoIncrement=membres.length+1;

let trouverSexeChoisit = () => {
    let tabSexe = document.getElementsByName('sexe');
    for(let unSexe of tabSexe){
        if(unSexe.checked){
            return unSexe.value;
        }
    }
    return null;
}

//Fonction fléchée (arrow function, lambda)
let enregistrerMembre = () => {
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    let courriel = document.getElementById('courriel').value;
    let pass = document.getElementById('pass').value;
    let sexe = trouverSexeChoisit();
    let dnais = document.getElementById('dnais').value;
    //alert(prenom+"=="+nom+"=="+courriel+"=="+pass+"=="+sexe+"=="+dnais);
    let unMembre = {"id":autoIncrement,"prenom":prenom,"nom":nom,"sexe":sexe,"daten":dnais};
    let uneConnexion = {"id":autoIncrement,"courriel":courriel, "pass":pass,"statut":"A","role":"M"};
    autoIncrement++;
    membres.push(unMembre);
    connexion.push(uneConnexion);
    document.getElementById('formEnregErr').innerHTML="Membre bien enregistré.";
    setTimeout(() => {
        document.getElementById('formEnregErr').innerHTML="";
        document.getElementById('formEnreg').reset();
        basculerVisibilteModal('modalEnreg','cacher');
    }, 5000);
}

//Dans le cas d'un buton type=submit
let validerFormEnregSubmit = () => {
    let pass = document.getElementById('pass').value;
    let cpass = document.getElementById('cpass').value;
    if(pass !== cpass){
        alert("Les mots de passe ne sont pas égaux.");
        return false;
    } 
    return true; 
}

//Dans le cas d'un buton type=button
let validerFormEnregButon = () => {
    let valide=true;
    let msgErr="";
    let pass = document.getElementById('pass').value;
    let cpass = document.getElementById('cpass').value;
    if(pass !== cpass){
        msgErr+="Les mots de passe ne sont pas égaux.<br />";
        valide=false;
    }
    //Lorsque toutes les vaidations seront terminées
    if(valide){
        enregistrerMembre();
    }else {
        document.getElementById('formEnregErr').innerHTML=msgErr;
        setTimeout(() => {
             document.getElementById('formEnregErr').innerHTML="";
        }, 5000);
    }
}
