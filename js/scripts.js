let basculerVisibilteModal = (idModal, etatFR) => {
    let idModalJQ = "#"+idModal;
    let etatEN = (etatFR == 'montrer')?'show':'hide';
    $(idModalJQ).modal(etatEN);  
  }
  let retour = () => {
    window.open("../index.html");
    window.close();
 }
 
/**********************  Conexion *********************************/
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
             window.close();
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

 /**********************  Devenir Membre *********************************/

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
 

 /*********************************** Restayrant*************************************** */
 let cheminEntrees = "../images/entrees/";
let cheminRepas = "../images/repas/";
let totalEntrees = 0;
let totalRepas = 0;
let totalFacture = 0;
let totalTaxes = 0;
const TAXES = 0.1556;

let initialiser = () => {
    document.getElementById('imgEntree').src = cheminEntrees+menu.entrees[0].image;
    document.getElementById('nomEntree').innerHTML = menu.entrees[0].nom;
    document.getElementById('prixEntree').innerHTML = menu.entrees[0].prix+"$";
    //document.getElementById('infosEntree').innerHTML = "Nom : "+menu.entrees[0].nom+"<br>Pages : "+menu.Entrees[0].pages;

    document.getElementById('imgRepas').src = cheminRepas+menu.repas[0].image;
    document.getElementById('nomRepas').innerHTML = menu.repas[0].nom;
    document.getElementById('prixRepas').innerHTML = menu.repas[0].prix+"$";
    //document.getElementById('infosRepas').innerHTML = "Sujet : "+menu.repas[0].sujet;
    //Générer le contenu du select pour les Entrees
    let tabEntrees = menu.entrees;
    let selEntrees = document.getElementById('selEntrees');
    for(let unEntree of tabEntrees){
        selEntrees.options[selEntrees.options.length] = new Option(unEntree.nom,unEntree.id);
    }
    //Générer le contenu du select pour les repas
    let tabRepas = menu.repas;
    let selRepas = document.getElementById('selRepas');
    for(let unRepas of tabRepas){
        selRepas.options[selRepas.options.length] = new Option(unRepas.nom,unRepas.id);
    }
}

let traiterEntree = () => {
    let selEntrees = document.getElementById('selEntrees');
    let idEntrees = selEntrees.options[selEntrees.selectedIndex].value;
    let objEntree = menu.entrees.find(unEntrees =>unEntrees.id == idEntrees);

    document.getElementById('imgEntree').src = cheminEntrees+objEntree.image;
    document.getElementById('nomEntree').innerHTML = objEntree.nom;
    document.getElementById('prixEntree').innerHTML = objEntree.prix+"$";
//document.getElementById('infosEntrees').innerHTML = "Auteur : "+objEntree.auteur+"<br>Pages : "+objEntree.pages;

    //Calcul de la facture pour le Entree
    totalEntrees = objEntree.prix;
    totalTaxes = (totalEntrees+totalRepas)*TAXES;
    totalFacture = totalEntrees+totalRepas+totalTaxes;
    totalFacturePayer();
}

let traiterRepas = () => {
    let selRepas = document.getElementById('selRepas');
    let idRepas = selRepas.options[selRepas.selectedIndex].value;
    let objRepas = menu.repas.find(unRepas =>unRepas.id == idRepas);

    document.getElementById('imgRepas').src = cheminRepas+objRepas.image;
    document.getElementById('nomRepas').innerHTML = objRepas.nom;
    document.getElementById('prixRepas').innerHTML = objRepas.prix+"$";
   // document.getElementById('infosRepas').innerHTML = "Sujet : "+objRepas.sujet;

    //Calcul de la facture pour la Repas
    totalRepas = objRepas.prix;
    totalTaxes = (totalRepas+totalEntrees)*TAXES;
    totalFacture = totalRepas+totalEntrees+totalTaxes;
    totalFacturePayer();
}

function totalFacturePayer() {
    let facture = " ";
    if(totalEntrees > 0){
        facture+=" <b>Entree = </b>"+totalEntrees.toFixed(2)+"$ &nbsp;";
        //totalEntree = 0;
    }
    if(totalRepas > 0){
        facture+="   <b>Repas = </b>"+totalRepas.toFixed(2)+"$ ";
        //totalRepas = 0;
    }
    facture+="   <b>&nbsp;totalTaxes = </b>"+totalTaxes.toFixed(2)+"$ <br>";
    facture+="<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;À PAYER = </b>"+totalFacture.toFixed(2)+"$";
    document.getElementById('facture').innerHTML = facture;
}


