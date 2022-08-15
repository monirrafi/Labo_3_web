let basculerVisibilteModal = (idModal, etatFR) => {
    let idModalJQ = "#"+idModal;
    let etatEN = (etatFR == 'montrer')?'show':'hide';
    $(idModalJQ).modal(etatEN);  
  }
  let retour = () => {
    window.open("../index.html");
    window.close();
 }
 
