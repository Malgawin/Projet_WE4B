# Moodle Simplifié - Projet WE4B

## 📝 Présentation

Ce projet est une version simplifiée de Moodle développée dans le cadre de l'UE WE4B en collaboration avec l'UE SI40 durant le 2ème semestre d'école d'ingénieur à l'UTBM. L'objectif est de fournir un espace en ligne permettant aux administrateurs de gérer les utilisateurs et les UE, aux professeurs de poster des contenus pédagogiques, et aux étudiants de consulter ces contenus.

## 👨‍💻 Équipe de développement

Matthieu DIEBOLT, Pierre GUEROUT, Joshua PLOUZENNEC, Mateo CHARTIER, Dave JONATHAN SUAREZ (partie BDD - SI40)

## 🚀 Technologies utilisées

- **ANGULAR 13**
- **NODEJS** (API REST) 
- **PostrgeSQL** (via PgAdmin4)
- **MongoDB**
- **FireBase**
- **Apache** (via XAMPP ou équivalent)
- **HTML / CSS / TypeScript**

------
## ⚙️ Installation

### Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé les outils suivants sur votre machine :

- **Node.js** : environnement d’exécution JavaScript côté serveur (nécessaire pour le backend et Angular)  
  👉 Téléchargeable sur : https://nodejs.org/fr/  
  Après installation, vérifiez l’installation avec les commandes :
  ```
  node -v
  ```
  
- **Angular CLI** : outil en ligne de commande pour gérer et lancer des projets Angular  
  👉 Documentation et installation : https://angular.io/cli  
  Installation via npm :
  ```
  npm install –g @angular/cli@13.3.3
  ```
  Après installation, vérifiez l’installation avec les commandes :
  ```
  ng --version
  
  ```
  
- **PostgreSQL** : système de gestion de base de données relationnelle  
  👉 Téléchargeable sur : https://www.postgresql.org/download/

- **pgAdmin 4** : interface graphique pour gérer PostgreSQL  
  👉 Téléchargeable sur : https://www.pgadmin.org/download/
  
- **MongoDB** : base de données NoSQL orientée documents  
  👉 Téléchargeable sur : https://www.mongodb.com/try/download/community  
  Une fois MongoDB installé, assurez-vous que le service **MongoDB** est bien démarré.



> 📝 *Remarque : un guide d’installation de PostgreSQL et pgAdmin, issu du TP3 de l’UE SI40, est disponible dans le dossier [`BDD`] du projet.


## ⚙️ Installation

Voici les étapes à suivre pour installer et exécuter le projet en local.

### 1. Cloner le projet

Clonez ce dépôt dans un répertoire de votre choix.

### 2. Installer les dépendances

- Ouvrez un premier terminal dans le dossier `frontend` et lancez :

  ```
  npm install
  ```

- Ouvrez un second terminal dans le dossier `backend` et lancez :

  ```
  npm install --force
  ```


### Récupération des bases de données : 
### 3. Créer un super utilisateur `admin` dans PostgreSQL via pgAdmin

Pour créer un super utilisateur dans PostgreSQL via **pgAdmin**, suivez les étapes ci-dessous :

1. **Ouvrir pgAdmin** :
   - Lancez pgAdmin 4 et connectez-vous à votre serveur PostgreSQL.
   - Dans le panneau de gauche, cliquez sur votre serveur PostgreSQL pour l'ouvrir.

2. **Créer un nouvel utilisateur** :
   - Cliquez avec le bouton droit sur **Login/Group Roles** dans la colonne de gauche sous votre base de données et sélectionnez **Create > Login/Group Role**.

3. **Configurer le rôle** :
   - **Name** : `admin` (ou tout autre nom que vous souhaitez utiliser pour l'utilisateur).
   - **Password** (section `definition`) : `admin` (ou tout autre mot de passe que vous souhaitez utiliser pour l'utilisateur).
   - Cochez la case **Superuser** (section `Privilegese`) pour attribuer tous les privilèges à cet utilisateur, ce qui lui permettra de gérer toutes les bases de données et d'effectuer toutes les actions.

4. **Appliquer les modifications** :
   - Cliquez sur **Save** pour créer l'utilisateur.

5. **Vérifier l'utilisateur** :
   - Vous devriez maintenant voir le rôle `admin` sous **Login/Group Roles** dans pgAdmin.
   - Cet utilisateur aura tous les privilèges nécessaires pour gérer PostgreSQL et interagir avec la base de données du projet.

### 5. Télécharger et importer la base de données dans Symfony

Une fois PostgreSQL et pgAdmin configurés, il est temps de télécharger la base de données du projet et de l'importer dans votre installation Symfony. Voici comment procéder :

#### 5.1 Télécharger la base de données

1. **Accédez au dossier BDD** :
   - Dans le projet, un fichier Backup contenant la structure et les données de la base de données devrait être disponible dans le dossier **`BDD`**.
   - Téléchargez ou copiez ce fichier Backup sur votre machine si nécessaire.
   - Il n'y aura pas besoin de faire de migrations via Symfony, puisque notre base utilise des triggers : on a exporté toute la base et pas seulement les données.

#### 5.2 Importer la base de données dans PostgreSQL

1. **Ouvrir pgAdmin** :
   - Ouvrez pgAdmin et connectez-vous à votre serveur PostgreSQL.
   - Créez une nouvelle base de données où vous souhaitez importer le fichier SQL. Faites un clic droit sur **Databases** et sélectionnez **Create > Database**.
   - Donnez un nom à votre base de données et changez l'**Owner** pour le super utilisateur que vous avez créé. Cliquez sur **Save** pour créer la base de données.
   - Si elle ne s'affiche pas, faites un clic droit>refresh sur **Databases**

2. **Importer le fichier Backup** :
   - Dans pgAdmin, faites un clic droit sur la base de données nouvellement créée dans la section **Databases** et sélectionnez **Restore...**.
   - Dans la fenêtre qui apparaît, sous **Filename**, ouvrez l'explorateur de fichiers et sélectionnez le fichier **Backup File**.
   - Cliquez sur **Restore** pour exécuter le fichier SQL et importer la structure et les données de la base de données dans PostgreSQL.

3. **(optionel) Vérifier que l'importation a réussi** :
   - Dans pgAdmin, faites un clic droit sur le nom de la base de données et cliquez sur **Refresh**.
   - Dépliez la base de données (en cliquant sur la flèche à gauche du nom).
   - Ouvrez la section **Schemas > public > Tables** : vous devriez voir les tables créées par le fichier SQL.
   - Si les tables sont présentes, cela signifie que l'importation a bien fonctionné.



### 6. Configurer le fichier `poolPgSQL.js` dans le dossier **backend**

Une fois la base de données importée, vous devez configurer le pool du serveur pour qu’il puisse s’y connecter. Pour cela, il faut modifier le fichier `poolPgSQL.js` dans le backend.


#### 6.3 Modifier les ligne de connexion à la base de données

- Recherchez les lignes suivantes :

```
    user: 'admin',  // nom d'utilisateur postgresql
    host: 'localhost', 
    database: 'moodle_tr', //nom de la base de données
    password: 'admin', // mdp de l'utilisateur postgresql
    port: 5432, // port par défaut de postgresql
```
> Remplacez si nécessaire les informations conformément à votre utilisateur créé et à votre nom de base de données.

- Enregistrez le fichier. Le serveur est maintenant configuré pour se connecter à votre base de données PostgreSQL.


### 7. MongoDB 

## 7.1 Créer la base de données 

Pour créer une base de données, il suffit de :

- Lancez le shell MongoDB :
  ```bash
  mongosh
  ```
- Passez sur la base :
  ```javascript
  use projet_moodle
  ```
## 7.3 Importer des collections à partir de fichiers JSON

Vous trouverez dans le dossier **BDD/mongodb** l’ensemble des collections à télécharger.
Utilisez la commande `mongoimport` (disponible avec l'installation de MongoDB).

### Syntaxe générale

```bash
mongoimport --db projet_moodle --collection <nom_collection> --file <nom_fichier.json> 
```

### Exemple

Pour importer un fichier `forums.json` dans la collection `utilisateurs` :

```bash
mongoimport --db projet_moodle --collection forums --file forums.json
```
Faire cela pour l'ensemble des collections.

Une fois l’ensemble des collections téléchargé,

Pour vérifier que vous avez bien toutes les collections, lancez :

```
show collections 
```

Vous devriez avoir :

![image](https://github.com/user-attachments/assets/fd8fa6b2-5932-4a83-b5ef-2863f07fe2b1)


## 7.4 Vérifier le lien avec le serveur :

Dans le dossier **backend**, allez dans le fichier `server.js` et trouvez la ligne suivante :

```
await mongoose.connect('mongodb://localhost:27017/projet_moodle');
```

Vérifiez que le nom correspond au nom de votre base de données.

### 8. Firebase

Il n'est pas nécessaire de télécharger ou de créer un lien manuellement avec Firebase, car la connexion se fait automatiquement. Firebase étant une base de données en ligne, tout est déjà configuré pour permettre la connexion à distance.

Pour visualiser les données Firebase, écrivez un mail à pierre.guerrout@utbm.fr pour qu’il vous donne l’accès.

### 9. Lancer le projet 

Une fois tout configuré, voici comment démarrer le projet en local :

Dans un premier terminal, placez-vous dans le dossier **backend** et lancez :

```
node server.js
```

Si la connexion aux différentes bases est réussie, vous devriez voir :

![image](https://github.com/user-attachments/assets/6c36ab17-7ce4-4221-b6e7-bf302ec6619a)

Dans un second terminal, placez-vous dans le dossier **frontend** et lancez :

```
ng serve
```

Si tout est bon, l’application Angular devrait démarrer et être accessible à l’adresse indiquée dans le terminal (par défaut : [http://localhost:4200](http://localhost:4200)).


------

## ✅ Tester l'application

Pour tester l'aplication 3 utilisateur de demonstration sont précreer pour pouvoir ce login avec leur compte : 
```
mail : etudiant@utbm.fr mdp : azerty
mail : admin@utbm.fr   mdp : azerty
mail : prof@utbm.fr    mdp : azerty
```
De plus une UE **`exemple`** qui est completer avec pas mal de données. Les autres ue sont egalement disponible mais peuvent manquer de donnés pour une demonstration optimal.  
L’ensemble des utilisateurs est également disponible, mais il manque aussi des données pour une démonstration optimale.

Voici la liste de l’ensemble des utilisateurs disponibles :
```
Prof : 
alice.martin@example.com mdp : azerty
julien.dupont@example.com mdp : azerty
emma.lefevre@example.com mdp : azerty
lucas.laurent@example.com mdp : azerty
clara.moreau@example.com mdp : azerty
hugo.simon@example.com mdp : azerty
lea.michel@example.com mdp : azerty

Etudiant : 
gabriel.thomas@example.com mdp : azerty
camille.petit@example.com mdp : azerty
nathan.robert@example.com mdp : azerty
chloe.richard@example.com mdp : azerty
enzo.dubois@example.com mdp : azerty
manon.roux@example.com mdp : azerty
mathis.vincent@example.com mdp : azerty
jade.lefebvre@example.com mdp : azerty
ethan.morel@example.com mdp : azerty
louise.girard@example.com mdp : azerty
```
Il est également possible de créer vos propres utilisateurs en vous connectant en tant qu’Admin dans l’onglet Administration, section Utilisateur > Créer.

Dans cette section, vous pourrez également inscrire l’utilisateur aux UE que vous souhaitez.

Attention, il vous faut utiliser une véritable adresse mail pour pouvoir, par la suite, changer le mot de passe.

Cette façon de créer un utilisateur suit la méthode utilisée par les platformes pedagogique classique ou pour les comptes élèves : c’est l’administrateur qui crée le compte, puis le mot de passe est changé par l’utilisateur final.

------


## 🔐 Rôles utilisateurs

- **Administrateur** : gestion des comptes utilisateurs et des UE 
- **Professeur** : création/modification de posts dans les UE
- **Étudiant** : consultation des contenus des UE

------

## 🧭 Navigation principale

### 🔎 Pages principales

- **Page de login** (authentification obligatoire)
- **Page d’administration** (catalogue et gestion utilisateurs et UE)
- **Page de choix des UE** (accessible après login, affichage carte ou liste, affichage activité)
- **Page de contenu UE** (posts visibles)
- **Page de création/modification de posts** (pour les profs)
- **Page des inscrits à une UE** (consultation et filtrables)
- **Page de gestion de compte** (modification du profil)

---

### 📌 Fonctionnalités clés

- Gestion des utilisateurs et des UE
- Authentification sécurisée
- Rôles dynamiques (admin, prof, étudiant)
- Création de **posts texte** et **posts depot**
- **Suppression AJAX** avec confirmation
- Feed d’**activité récente** par utilisateur
- Affichage distinct selon type de post
- Interface responsive grâce aux **CSS/HTML**
- Création Modification et Suppression d'Utilisateur et d'UE pour l'administrateur
- Upload d'image depuis l'ordinateur vers le site (icon profil, affichage ue) 

---

### 🎯 Fonctionnalités "Nice to Have"

- Épinglage des UE et carte tournable pour obtenir description de l'UE
- Réorganisation manuelle des posts
- Interface dynamique (AJAX/JS) pour les formulaires de modification et création de posts
- Interface administrateur avec des fenêtres modales, créant une dynamique de page agréable
- Affichage des inscrits pour une UE donnée.
- Chargement progressif du feed d’actualité via AJAX
- Filtre page inscrits (JS)
- Modification des posts depuis l'UE
- Affichage des posts suivant la date de publication pour les étudiants (Planification de publications possible pour les professeurs.)

---

En cas de problème ou informations manquantes, vous pouvez contactez matthieu.diebolt@utbm.fr.
