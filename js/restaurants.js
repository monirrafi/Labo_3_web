let menu = {
    "entrees" : [
        {
            "id"    : 1,
            "nom" : "salade verte",
            "prix"  : 27.95,
            "image" : "salade1.jpg"
        },
        {
            "id"    : 2,
            "nom" : "salade composee",
            "prix"  : 27.95,
            "image" : "salade2.jpg"
        },
        {
            "id"    : 3,
            "nom" : "salade de riz",
            "prix"  : 29.95,
            "image" : "salade3.jpg"
        }
    ],
    "repas" : [
        {
            "id"    : 1,
            "nom" : "Couscous",
            "prix"  : 11.99,
            "image" : "couscous.jpg"
        },
        {
            "id"    : 2,
            "nom" : "Tajine",
            "prix"  : 22.99,
            "image" : "tajine.jpg"
        },
        {
            "id"    : 3,
            "nom" : "Pastilla",
            "prix"  : 16.99,
            "image" : "pastilla.jpg"
        }
    ]
}
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
        facture+=" <b>Entree = </b>"+totalEntrees.toFixed(2)+"$ ";
        //totalEntree = 0;
    }
    if(totalRepas > 0){
        facture+="   <b>Repas = </b>"+totalRepas.toFixed(2)+"$ ";
        //totalRepas = 0;
    }
    facture+="   <b>totalTaxes = </b>"+totalTaxes.toFixed(2)+"$ ";
    facture+="<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;À PAYER = </b>"+totalFacture.toFixed(2)+"$";
    document.getElementById('facture').innerHTML = facture;
}