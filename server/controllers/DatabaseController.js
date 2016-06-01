var faker = require('faker');
/**
 * Database Object
 */
var db = null;
var exists = null;

exports.setDB = function (globalDB) {
	var self = this;
	db = globalDB;

	db.serialize(function() {
		//self.destroy();
		db.get("SELECT name FROM sqlite_sequence WHERE name='players'", function (err, rows) {
			exists = ( !err && !!rows );
			if( !exists ) {
				console.log("Database does not seems to exist.");
				console.log("- Creating & Seeding ...");
				self.create( true );
			}
			console.log("Database loaded.");
		});
	});

};

exports.exists = function () {
	return exists;
};

/**
 * Creates DB structure.
 */
exports.create = function ( seed ) {
	var self = this;
	db.run(
		'CREATE TABLE "moves" ' +
		'(' +
		'"name" VARCHAR(50) PRIMARY KEY, ' +
		'"image" VARCHAR(255), ' +
		'"kills" VARCHAR(50) DEFAULT NULL, ' +
		'"udpated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
		'"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
		'FOREIGN KEY(kills) REFERENCES moves(name)' +
		')',function(){
			db.run(
				'CREATE TABLE "players" ' +
				'(' +
				'"id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
				'"name" VARCHAR(255), ' +
				'"image" VARCHAR(255), ' +
				'"udpated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
				'"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ' +
				')', function(){
					db.run(
						'CREATE TABLE "games" ' +
						'(' +
						'"id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
						'"winner_id" INTEGER, ' +
						'"loser_id" INTEGER, ' +
						'"udpated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
						'"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
						'FOREIGN KEY(winner_id) REFERENCES players(id),' +
						'FOREIGN KEY(loser_id) REFERENCES players(id)' +
						')',function(){
							if( seed )
								self.seed();
						});
				});

		});

};

/**
 * Seed with random data.
 *
 * @param req
 * @param res
 */
exports.seed = function (req, res) {

	var stmt = db.prepare("INSERT INTO moves ( name, kills, image ) " +
		"VALUES ('Paper', 'Rock', 'http://blog.japandict.com/wp-content/plugins/wp-emoji-one/icons/1F590.png')," +
		" ('Rock', 'Scissors', 'http://blog.japandict.com/wp-content/plugins/wp-emoji-one/icons/270A.png')," +
		" ('Scissors', 'Paper', 'http://blog.japandict.com/wp-content/plugins/wp-emoji-one/icons/270C.png')" +
		";");
	stmt.run();

	stmt = db.prepare("INSERT INTO players ( name, image ) VALUES (?, ?)");

	var end = 0;
	for ( var c = 0; c < 20; c++) {
		stmt.run([
			faker.name.findName(),
			faker.image.avatar()
		], function(){
			end ++;
			if( end == 20 ) {
				stmt = db.prepare("INSERT INTO games ( winner_id, loser_id ) VALUES (?, ?)");
				for (var i = 0; i < 100; i++) {
					db.all("SELECT * FROM players ORDER BY RANDOM() LIMIT 2", function(err, rows) {
						stmt.run([
							rows[0].id,
							rows[1].id
						]);
					});
				}
			}
		});
	}

};


/**
 * Drops DB structure.
 */
exports.destroy = function () {
	db.run( 'DROP TABLE "moves"');
	db.run( 'DROP TABLE "games"');
	db.run( 'DROP TABLE "players"');
};

