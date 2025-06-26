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

- **XAMPP** : pour disposer facilement de **PHP**, **MySQL** et **Apache**  
  👉 Téléchargeable sur : https://www.apachefriends.org/index.html  
  Une fois XAMPP installé, vérifiez que les modules **Apache** et **MySQL** sont bien activés.

- **PostgreSQL** : système de gestion de base de données relationnelle  
  👉 Téléchargeable sur : https://www.postgresql.org/download/

- **pgAdmin 4** : interface graphique pour gérer PostgreSQL  
  👉 Téléchargeable sur : https://www.pgadmin.org/download/

- **Symfony** : framework PHP utilisé pour ce projet  
  👉 Télécharger depuis le site officiel : https://symfony.com/download  
  Ce téléchargement installe également tout ce qu’il faut, y compris Composer si nécessaire.

> 📝 *Remarque : un guide d’installation de PostgreSQL et pgAdmin, issu du TP3 de l’UE SI40, est disponible dans le dossier [`BDD`] du projet.


## ⚙️ Installation

Voici les étapes à suivre pour installer et exécuter le projet en local.

### 1. Cloner le projet

Clonez ce dépôt dans un répertoire de votre choix.

### 2. Activer PostgreSQL dans PHP

Sur XAMPP, dans la section actions, allez dans **Config > php.ini** pour le module Apache. 

Décommentez les lignes suivantes dans le fichier `php.ini` :
```ini
extension=intl
extension=pdo_pgsql
extension=pgsql
```
Ensuite, redémarrez le serveur Apache pour appliquer les changements.

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

### 6. Configurer le fichier `.env` de Symfony

Une fois la base de données importée, vous devez configurer Symfony pour qu’il puisse s’y connecter. Pour cela, il faut modifier le fichier `.env` à la racine du projet.

#### 6.1 Ouvrir le fichier `.env`

- Accédez au dossier principal du projet Symfony.
- Ouvrez le fichier `.env` avec un éditeur de texte (par exemple : VS Code).

#### 6.2 Modifier la ligne de connexion à la base de données

- Recherchez la ligne suivante :

```env
  DATABASE_URL="postgresql://admin:admin@127.0.0.1:5432/nom_de_votre_base?serverVersion=16&charset=utf8"
```
> Remplacez `nom_de_votre_base` par le nom exact de la base de données que vous avez créée dans pgAdmin.
> Utilisez bien l'url : **postgresql**
> `admin:admin` correspond à l'utilisateur PostgreSQL que vous avez créé précédemment.

- Enregistrez le fichier. Symfony est maintenant configuré pour se connecter à votre base de données PostgreSQL.

### 7. Lancer le projet Symfony

Une fois tout configuré, voici comment démarrer le projet en local.

#### 7.1 Installer les dépendances du projet

Dans le terminal, placez-vous dans le dossier du projet (là où se trouve `composer.json`), puis exécutez :

```bash
composer install
```

Cela va installer toutes les dépendances nécessaires à l’exécution du projet.

#### 7.2 Démarrer le serveur Symfony

Toujours dans le dossier du projet, lancez le serveur de développement Symfony :

```bash
symfony serve -d
```

### 7.3 Accéder à l’application

Ouvrez votre navigateur à l’adresse suivante :

```bash
http://127.0.0.1:8000
```

Vous devriez voir s’afficher l’interface de l’application Moodle simplifiée. 🎉

------

## ✅ Tester l'application

Pour tester l'aplication 3 utilisateur de demonstration sont précreer pour pouvoir ce login avec leur compte : 
```
mail : student@utbm.fr mdp : 123456
mail : admin@utbm.fr   mdp : 123456
mail : prof@utbm.fr    mdp : 123456
```
De plus une UE **`test`** qui est completer avec des inscrits et des posts est disponible. 

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
