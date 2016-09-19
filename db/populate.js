
// Clear
db.users.drop();
db.questions.drop();
db.enigms.drop();

// Users
db.users.insert([{ 
    salt : "750932005623", 
    hashed_password : "52b8702873f8a1dace2cad4dc14db902351865b5", 
    email : "equipe1", 
    teamname : "", 
    name : "equipe1",
    enigms : [
      {id: 0, done: false},
      {id: 1, done: false},
      {id: 4, done: false},
      {id: 2, done: false},
      {id: 3, done: false},
      {id: 5, done: false}
    ],
    questions : [
      {id: 1, attempt: 0, done: false},
      {id: 4, attempt: 0, done: false},
      {id: 2, attempt: 0, done: false},
      {id: 3, attempt: 0, done: false},
      {id: 5, attempt: 0, done: false},
      {id: 6, attempt: 0, done: false}
    ],   
    currentStep : 0, 
    points : 0   
  }, {
    salt : "732309995045", 
    hashed_password : "7d8e91d1bc09fc1ea849237f94d94c743e6f8a4d", 
    email : "equipe2", 
    teamname : "", 
    name : "equipe2",
    enigms : [
      {id: 0, done: false},
      {id: 1, done: false},
      {id: 4, done: false},
      {id: 2, done: false},
      {id: 3, done: false},
      {id: 5, done: false}
    ],
    questions : [
      {id: 1, attempt: 0, done: false},
      {id: 4, attempt: 0, done: false},
      {id: 2, attempt: 0, done: false},
      {id: 3, attempt: 0, done: false},
      {id: 5, attempt: 0, done: false},
      {id: 6, attempt: 0, done: false}
    ],   
    currentStep : 0, 
    points : 0   
  }, {
    salt : "87949827446", 
    hashed_password : "97a3d5f90b28d49f6a321f5b62c3174f33f6a6d2", 
    email : "equipe3", 
    teamname : "", 
    name : "equipe3",
    enigms : [
      {id: 0, done: false},
      {id: 1, done: false},
      {id: 4, done: false},
      {id: 2, done: false},
      {id: 3, done: false},
      {id: 5, done: false}
    ],
    questions : [
      {id: 1, attempt: 0, done: false},
      {id: 4, attempt: 0, done: false},
      {id: 2, attempt: 0, done: false},
      {id: 3, attempt: 0, done: false},
      {id: 5, attempt: 0, done: false},
      {id: 6, attempt: 0, done: false}
    ],   
    currentStep : 0, 
    points : 0   
  }, {
    salt : "256110876995", 
    hashed_password : "e866c4a3db6e79f8679c18230ccd8e430810daad", 
    email : "equipe4", 
    teamname : "", 
    name : "equipe4",
    enigms : [
      {id: 0, done: false},
      {id: 1, done: false},
      {id: 4, done: false},
      {id: 2, done: false},
      {id: 3, done: false},
      {id: 5, done: false}
    ],
    questions : [
      {id: 1, attempt: 0, done: false},
      {id: 4, attempt: 0, done: false},
      {id: 2, attempt: 0, done: false},
      {id: 3, attempt: 0, done: false},
      {id: 5, attempt: 0, done: false},
      {id: 6, attempt: 0, done: false}
    ],   
    currentStep : 0, 
    points : 0   
  }, {
    salt : "965644650821", 
    hashed_password : "ec0f6662208661f523c541bec300b0c6f5a45bea", 
    email : "equipe5", 
    teamname : "", 
    name : "equipe5",
    enigms : [
      {id: 0, done: false},
      {id: 1, done: false},
      {id: 4, done: false},
      {id: 2, done: false},
      {id: 3, done: false},
      {id: 5, done: false}
    ],
    questions : [
      {id: 1, attempt: 0, done: false},
      {id: 4, attempt: 0, done: false},
      {id: 2, attempt: 0, done: false},
      {id: 3, attempt: 0, done: false},
      {id: 5, attempt: 0, done: false},
      {id: 6, attempt: 0, done: false}
    ],   
    currentStep : 0, 
    points : 0   
  }, { 
    salt : "537903139354", 
    hashed_password : "3a77198e634fa0b936943f806d5862011d7de37a", 
    email : "admin", 
    teamname : "", 
    name : "admin",
    enigms : [
      {id: 0, done: false},
      {id: 1, done: false},
      {id: 4, done: false},
      {id: 2, done: false},
      {id: 3, done: false},
      {id: 5, done: false}
    ],
    questions : [
      {id: 1, attempt: 0, done: false},
      {id: 4, attempt: 0, done: false},
      {id: 2, attempt: 0, done: false},
      {id: 3, attempt: 0, done: false},
      {id: 5, attempt: 0, done: false},
      {id: 6, attempt: 0, done: false}
    ],   
    currentStep : 0, 
    points : 0 
  }]);


// Questions
db.questions.insert([
  {
    id: 1, 
    type: 'choice', 
    sentence: 'Une baronne, c\'est people, jet set et paillettes!!!!', 
    question: 'En 2005, quelle baronne a participé à la Ferme Célébrités sur TF1?', 
    choices: [
      'Baronne Ariane de Rothschild',
      'Baronne Marianne von Brandstetter', 
      'Baronne de La Tronche en Biais',
      'Aucune d\'entre elles' 
    ],
    img:'tronche.jpg',     
    answer: 'baronne marianne von brandstetter'
  }, {
    id: 2, 
    type: 'choice', 
    sentence: 'Heureusement qu\'il existe des barons pour inventer des choses dont on pourrait se passer...', 
    question: 'Le baron Drais von Sauerbon (de son petit nom Karl Friedrich Christian Ludwig) est à l\'origine:',
    choices: [
      'Des noms à coucher dehors',
      'Du Mikado (le jeu de société, pas les gâteaux)',
      'Du Cor des Alpes (instrument de musique)', 
      'De la Draisienne (un ancêtre du vélo)'
    ],
    answerImg:'draisienne.jpg',
    answer:'de la draisienne (un ancêtre du vélo)' 
  }, {
    id: 3, 
    type: 'choice', 
    sentence: 'âmes sensibles s\'abstenir', 
    question: 'Quel  baron a eu sa première érection le 24 septembre 1480?', 
    choices: [
      'Baron Derval', 
      'Baron Avaugour',
      'Baron Pont-L\'Abbé', 
      'Tous' 
    ], 
    answer: 'baron avaugour' 
  }, {
    id: 4, 
    type: 'word', 
    sentence: 'Qui a dit que toutes les baronnes étaient fréquentables...', 
    question: 'Quel petit nom donne-t-on à la grande baronne de la drogue "Sandra Avila Beltran"?', 
    answer: 'reine du pacifique',
    answerImg: '',
    hint: '_____ __ _________'
  }, {
    id: 5, 
    type: 'word', 
    sentence: 'Ouf!!!! Enfin une baronne intellectuelle', 
    question: 'Quel est le nom de la baronne qui était romancière, auteur dramatique, féministe, connue, ayant pris un pseudonyme masculin et dont une de ses œuvres se nomme "Pauline"?', 
    answer: 'dudevant',
    hint: 'baronne ________'    
  }, {
    id: 6, 
    type: 'choice', 
    sentence: 'Qui a dit que les barons étaient des personnes comme les autres....', 
    question: 'Le baron de Münchhausen est connu pour :',
    choices: [
      'Voler sur des boulets de canon', 
      'Se sortir des sables mouvants en se soulevant par les cheveux',
      'Raconter des craques', 
      'Pour avoir donné son nom à une maladie pshychiatrique',
      'Toutes ces réponses' 
    ],     
    answer: 'toutes ces réponses',
    answerImg: 'mun.jpg',
  }, {
    id: 7, 
    type: 'choice', 
    sentence: '', 
    question: 'Quel classement des titres de noblesse par ordre d\'importance (du plus important au moins important) est il inexact?',
    choices: [
      'baron, dieu, licorne, petit poney ', 
      'prince, marquis, baron, écuyer, châtelain, ', 
      'marquis, duc, comte, baron, chevalier',
      'Toutes ces réponses' 
    ],     
    answer: 'toutes ces réponses'
  }]);


// Enigme
db.enigms.insert([
  {id: 0, code: '000', hash: 'drtympe'},
  {id: 1, code: '111', hash: 'zbbyyxv'},
  {id: 2, code: '222', hash: 'crtbhrn'},
  {id: 3, code: '333', hash: 'uolnrds'},
  {id: 4, code: '444', hash: 'advnmpl'},
  {id: 5, code: '555', hash: 'xeztyhj'}]);