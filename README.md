# TP Front-Back

Ce projet est une application full-stack composée d'un frontend Angular et d'un backend Spring Boot.

## Prérequis

- Node.js & npm
- Java (JDK 17 ou version ultérieure recommandée)
- Maven (optionnel, wrapper inclus)

## Structure du Projet

- `frontend-angular/` : L'application frontend Angular.
- `demo 2/` : L'application backend Spring Boot.

## Comment Lancer le Projet

### 1. Backend (Spring Boot)

Naviguez vers le répertoire du backend :

```bash
cd "demo 2"
```

Lancez l'application en utilisant le wrapper Maven :

```bash
# Sur macOS/Linux
./mvnw spring-boot:run

# Sur Windows
mvnw.cmd spring-boot:run
```

Le serveur backend démarrera sur `http://localhost:9000`.
Vous pouvez accéder à la console H2 via `http://localhost:9000/h2-console`.

### 2. Frontend (Angular)

Ouvrez un nouveau terminal et naviguez vers le répertoire du frontend :

```bash
cd frontend-angular
```

Installez les dépendances :

```bash
npm install
```

Démarrez le serveur de développement :

```bash
npm start
```

L'application frontend sera accessible sur `http://localhost:4200`.

## Tests

### Tests Frontend

Pour exécuter les tests unitaires du frontend :

```bash
cd frontend-angular
npm test
```

Pour exécuter les tests end-to-end Cypress :

```bash
cd frontend-angular
npm run cy:open
```

## Fonctionnalités

- Authentification utilisateur (Connexion/Inscription)
- Gestion des notes (Créer, Lire, Mettre à jour, Supprimer)
- Fonctionnalités d'administration
