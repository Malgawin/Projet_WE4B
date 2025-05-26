export const COURS_FAKE = [
  {
    ue: {
      id: '1',
      name: 'Angular pour débutants',
      code: 'ANG101',
      description: 'Un cours pour apprendre les bases d’Angular',
      image: 'angular.jpg',
      isPinned: true // ou false
    }
  },
  {
    ue: {
      id: '2',
      name: 'Node.js avancé',
      code: 'NODE201',
      description: 'Gestion des APIs REST et authentification',
      image: 'nodejs.jpg',
      isPinned: false
    }
  }
];

export const ETUDIANT_FAKE = {
  _id: 'abc123',
  nom: 'Doe',
  prenom: 'John',
  email: 'john@example.com',
  motDePasse: '***',
  role: 'etudiant',
  inscritCours: ['1', '3']
};