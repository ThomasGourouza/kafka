// après avoir écrit le fichier docker-compose:
sudo docker-compose up -d

// dans un dossier "kafka":
npm init -y
npm i kafkajs

// après avoir écrit le fichier topic.js:
node topic.js

// lancer des consumer.js puis générer des messages avec producer.js
node consumer.js
node producer.js message
