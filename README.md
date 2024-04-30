# Age-of-Game

Lancer le projet :

- Dans back/age_of_game realiser les commandes :
composer install
php artisan migrate
cp .env.example .env
- Dans le fichier .env les lignes 22 a 27 par :
DB_CONNECTION=sqlite
DB_PATH= database/database.sqlite

- Dans Front/My-App realiser les commandes :
npm install electron-vite
npm run dev