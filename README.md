# Projet WE4B : Implémentation d'une application WEB à l'image de Moodle via Angular

_DIEBOLT Matthieu - CHARTIER Matéo - GUEROUT Pierre - PLOUZENNEC Joshua_

### Comment lancer le projet ?
1. Se rendre sur le dossier principal de l'application web si vous n'y êtes pas déjà : Projet_WE4B
2. Dans un premier terminal, se rendre dans le dossier Frontend grâce à la commande ```cd Frontend```
3. Toujours dans ce terminal, exécuter ```ng serve```
4. En attendant que le serveur se lance, ouvrez un deuxième terminal, puis rendez-vous dans Backend ```cd Backend```
5. Ensuite exécutez ```node server.js```
6. Si tout à bien marché, dans le premier terminal devrait apparaitre la confirmation de la réussite du démarrage du serveur, et dans le second terminal, devraient apparaître les lignes
```
API démarrée sur http://localhost:3000
Connecté à MongoDB
Connecté à PgSql
```
7. Dans votre navigateur, tapez l'URL ```http://localhost:4200/```
8. Vous y voilà !

### Que contient le projet ?

##### :mag_right: Pages principales
- Page de login (authentification obligatoire)
- Page d’administration (catalogue et gestion utilisateurs et UE)
- Page de choix des UE (accessible après login, affichage carte ou liste, affichage activité)
- Page de contenu UE (posts visibles)
- Page de création/modification de posts (pour les profs)
- Page des inscrits à une UE (consultation et filtrables)
- Page de gestion de compte (modification du profil)
- Page de soumission de devoir (pour les élèves)
- Page de visualisation des devoirs rendus (pour les profs)
  
##### :compass: Navigation avec les routes Angular & Authguards
- Création de modèle pour les devoirs et les soumissions de devoir
- Création de routes pour récupérer les devoirs et les soumissions de devoir en fonction en fonction des élèves, des cours, des devoirs
  
##### :pushpin: Fonctionnalités clés
* Gestion des utilisateurs et des Cours
* Authentification sécurisée
* Rôles dynamiques (admin, prof, étudiant)
* Création de posts texte et posts depot
* Feed d’activité récente par utilisateur
* Affichage distinct selon type de post
* Interface responsive grâce à Angular & Bootstrap
* **Administration du site** :
  - Accessibilité à la page *uniquement* si autorisé
  - Création, Modification, Suppression de Cours et Utilisateur
  - Lors de l'inscription aux cours, possibilité de rechercher parmi ceux existants
  - Interface *user-friendly* rendue possible facilement grâce aux Services Angular
  - Décomposition en composant Angular
  - La zone admin est un module, permettant d'organiser plus clairement le projet
  - Un routage personnel de la zone d'administration est également présent pour la clareté
* **Gestion des devoirs** :
  - Création des postes devoirs
  - Possibilité de soumettre un devoir, d'y voir sa note et un commentaire laisser par le professeur
  - Visualisation des devoirs soumis par les élèves avec la possibilité d'ajouter une note et un commentaire
