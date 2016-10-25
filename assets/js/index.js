
$(document).ready(function(){
//Stock Page Default
var Page = function(prix,sps){
    this.prix = prix;
    this.dejaUpload = 0;
    this.sps = sps;
    this.likeSoul = 0;
};

var blog1 = new Page(20,2);
var blog2 = new Page(50,5);
var article = new Page(250,6);
var souls = 0;
var t; // Pour function incrementation/s

//Affichage de départ
$('#prixBlog1').html( blog1.prix + ' S');
$('#prixBlog2').html( blog2.prix + ' S');
$('#prixArticle').html(article.prix + ' S');

//Palier des unlockeds
function unlocked(palier, remove){
   if( palier < souls ) {
      $(remove).removeClass('display');
    };
    };

//Met à jour souls + pluriel
function soulsPluriels(){
  if(souls <= 1){
  $('#ames').html(souls + ' Âme');

  } else {
  $('#ames').html(souls + ' Âmes');
}
unlocked(10,'.titre_signin,.signinBlog1');
unlocked(50,'.signinBlog2');
unlocked(100,'.signinArticle');
 };

//Incrementation du nombre d'âmes acumulées (ici par Blog1)
//Increment souls du même nombre de sps;

function SoulsSecond(obj, page, like){
  obj.likeSoul = obj.likeSoul + (obj.dejaUpload * obj.sps);//Ce qui est mis à jour
  //likeSoul2 = likeSoul2 + (dejaUpload2 * sps2);
  $('#likeSoul'+ page).html( '<p>'+ obj.likeSoul + like + '</p>');
  souls = souls + (obj.dejaUpload * obj.sps);//Ce qui est mis à jour
  t = setTimeout(function(){ SoulsSecond(obj,page, like); }, 1000);
  soulsPluriels();
}

function uploadSoul(page, obj, post, like){
  if (obj.prix <= souls){
  souls = souls - obj.prix;
  obj.dejaUpload++;
  obj.prix = Math.round( obj.prix * 1.70);
  $('#dejaUp' + page).html('<p>' + obj.dejaUpload + post + '</p>');
  $('#prix' + page).html( obj.prix + ' S');
  $('#sps'+ page).html(obj.sps);
  SoulsSecond(obj,page, like);
  soulsPluriels();
} else {
$('.consolelog').html('<p>Vous avez besoin de plus d\'âmes</p>');
}};

//Click sur Upload PageBlog, s'ensuit la vérification budget, retire prix, ajoute dejaUpload, nouveau prix, maj visu compteur html
$('#uploadBlog1').click(function(){
    uploadSoul('Blog1', blog1,' Photos', ' Followers');
    });

  $('#uploadBlog2').click(function(){
    uploadSoul('Blog2', blog2, ' Photos', ' Likes');
  });

  $('#uploadArticle').click(function(){
    uploadSoul('Article', article,' articles en lignes', ' Likes');
  });

//Ajoute une âme au compteur, quand on clicque sur celui ci
  $('.buttonPurr').click(function(){
    souls++;
    soulsPluriels();
  });

  $('.signinBlog1').click(function(){
    $('.signinBlog1').fadeOut();
    $('NouveauBlocANommer').fadeIn();
    $('.signinBlog1').remove();

    $('.pageblog1').removeClass('display');
    // Juste la premiére fois
    $('.buttonPurr').css('float','right');
    $('.achat-upload1').removeClass('display');
    
  });

  $('.signinBlog2').click(function(){
    $('.pageBlog2').removeClass('display');
    $('.achat-upload2').removeClass('display');
    $('.signinBlog2').remove();
  });

  $('.signinArticle').click(function(){
    $('.pageArticle').removeClass('display');
    $('.achat-uploadArt').removeClass('display');
    $('.signinArticle').remove();
  });
});
//Ouverture Shop afficher/cacher + notif = vu
//Réaction clic sur le logo notif

/*function openShop(){
  var element = document.getElementById('shop');

  if ( element.style.display == 'block'){
    element.style.display = 'none';
    unlocked = 0;
  }
else{
  element.style.display = 'block';
  }
  notification();
}

//Fait apparaitre la notification si notif
function notification(){
  if ( unlocked > 0){
    var notif = document.getElementById('notification');
      notif.style.visibility = 'visible';
  } else {
    var notif = document.getElementById('notification')
    notif.style.visibility = 'hidden';
  }
}

//Nouvel achat disponible;
function newUnlocked(){
  if(souls == 10){
    unlocked = unlocked + 1;
      document.getElementById('signin_blog').style.display = 'block';
  }
  else{ }
    notification();
  }

  function ajoutPage(page){
    var element = document.getElementById(page);
    element.style.display = 'block';
    element.style.width = '180px';
    element.style.height = '240px';

  }
//
  var totalBlog = 0;
  var prixBlog = 10;
  var spsBlog = 5;
  var cumulSoulBlog = 0;
  var t;

  // Mise a jour visuelle de totalSouls + Singulier/Pluriels de Âme
  function update_souls(){
    var stringAme = '';

      if (souls <= 1 ) {
        stringAme = ' Âme';
      } else {
        stringAme = ' Âmes';
      }
    var element = document.getElementById('totalSouls');
    element.innerHTML = '<p>' + souls + stringAme; + '</p>';
  }

  function SoulsSecond(){
    document.getElementById('cumulSoulBlog').textContent = cumulSoulBlog;
    cumulSoulBlog = cumulSoulBlog + (totalBlog * spsBlog);//Ce qui est mis à jour
    souls = souls + (totalBlog * spsBlog);//Ce qui est mis à jour
    t = setTimeout(function(){ SoulsSecond() }, 1000);
    update_souls();
  }

//Click sur Upload PageBlog
function uploadSoul(){
  if (prixBlog <= souls){
  souls = souls - prixBlog;
  totalBlog = totalBlog + 1;
  prixBlog = Math.round(prixBlog * 1.25);
  document.getElementById('totalBlog').textContent = totalBlog;
  document.getElementById('prixBlog').textContent = prixBlog;
  document.getElementById('SpsBlog').textContent = spsBlog;
  SoulsSecond();
} else {
  console.log('Vous avez besoin de plus d\'âmes');
}
}

/* Quand on click sur buttonPurr */
/*function purrClick(number)
{ souls = souls + number;
    console.log(souls);
      update_souls();
      newUnlocked();
    }*/
