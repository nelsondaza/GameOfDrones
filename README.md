# Game-Of-Drones
Game Of Drones - Test

---
## Author

####Nelson Daza

**LinkedIn:** https://www.linkedin.com/in/nelsonadp

**E-mail:** [nelson.daza@gmail.com](mailto:nelson.daza@gmail.com)

**Skype:** nelson.daza


---
##Node/Angular - Test
###Game of drones game specification

In Game of Drones there are two players trying to conquer each other.
Players take turns to make their move, choosing Paper, Rock or Scissors. Each move beats another, just like the game “Paper, rock, scissors”.

Like so:
- Paper beats Rock
- Rock beats scissors
- Scissors beat Paper

The first player to beat the other player 3 times wins the battle.
We would like you to create a web site with:

1. A Start button to begin the game
2. Inputs for each player to enter his name. (only 2 players)
3. The game begins and each player choose one of the possible moves.
4. First, player1 pick his move, then player2. The system computes the result of the play. (The game happens on the same computer for both players. It is not required to create a true online game. 2 players share the computer, and the system asks each player for their move assuming the other player looks away while the other selects the move)
5. Step #4 repeats until one of the players wins three times. This player will be the winner of the game.
6. A result of each round should be displayed somewhere in the screen, so that players know the total score.
7. Once the game has finished, the start button shows again to start over.

### Additional features

The result of each game should be stored somewhere to keep track of games won by each player. We would like to know how many games a player has won.
We would like to be able to change the possible moves in runtime. This means that after a game completes, one could change the default move rules and have more moves added or change the way each move beats the other. We are interested in a simple solution easy to implement.

---

## Installation

To get a copy of the test: (_git_ installation is not part of this doc)
```
git clone https://github.com/nelsondaza/GameOfDrones.git
```

Get into the folder:
```
cd GameOfDrones/
```

Install dependencies: (_npm_ or _node_ installations are not part of this doc)
```
npm install
```

Cree un archivo de entorno basándose en el de ejemplo:
```
cp .env.example .env
```

Cree una llave de aplicación:
```
php artisan key:generate
```

Edite el archivo _.env_ configurando la conexión a una base de datos ya creada:
```
> DB_CONNECTION=mysql
> DB_HOST=127.0.0.1
> DB_PORT=3306
> DB_DATABASE=homestead
> DB_USERNAME=homestead
> DB_PASSWORD=secret
```

Cree las entidades en la BDD:
```
php artisan migrate
```

Cree los datos iniciales:
```
php artisan db:seed
```

Ejecute las pruebas unitarias:
```
vendor/bin/phpunit
```

Para verlo en su navegador podría usar el siguiente comando:
```
php artisan serve --host=localhost --port=9092
```
URL de prueba:

Contenido | URL
------------ | -------------
Listado de libros | [http://localhost:9092/api/books](http://localhost:9092/api/books)
Ver el libro con ID 10 y sus ventas | [http://localhost:9092/api/books/10](http://localhost:9092/api/books/10)
Listado de ventas | [http://localhost:9092/api/sales](http://localhost:9092/api/sales)
Ver la venta con ID 32 | [http://localhost:9092/api/sales/32](http://localhost:9092/api/sales/32)

> Para ver el listado de rutas y sus métodos:
> ```php artisan route:list```


## _GRACIAS_

