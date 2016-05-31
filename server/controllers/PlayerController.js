var faker = require('faker');
var db = null;

exports.setDB = function (globalDB) {
	db = globalDB;
};

/**
 * Display a listing of the resource.
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
	var result = {
		data: [],
		error: null
	};

	db.all("" +
		"SELECT players.*, (" +
			"SELECT COUNT(*) FROM games WHERE players.id = games.winner_id" +
		") AS winned, (" +
			"SELECT COUNT(*) FROM games WHERE players.id = games.looser_id" +
		") AS loosed " +
		"FROM players " +
		"ORDER BY winned DESC, loosed ASC " +
		"", function (err, rows) {
			if (err) {
				result.error = {
					'code': err.errno,
					'msg': err.message
				};
				res.status(500);
			}
			else {
				result.data = rows;
				res.status(200);
			}

			res.jsonp(result);
		}
	);
};

/**
 * Show the form for creating a new resource.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
	//
};

/**
 * Store a newly created resource in storage.
 *
 * @param req
 * @param res
 */
exports.store = function (req, res) {

	var result = {
		data: [],
		error: null
	};

	var stmt = db.prepare("INSERT INTO players ( name, image ) VALUES (?, ?)");
	stmt.run([
		req.body.name,
		faker.image.avatar()
	], function (err, rows) {
		if (err) {
			result.error = {
				'code': err.errno,
				'msg': err.message
			};
			res.status(500).jsonp(result);
		}
		else {
			db.get("SELECT last_insert_rowid() AS id", function (err, rows) {
				req.params.id = rows.id;
				exports.show( req, res );
			});
		}
	});
};

/**
 * Display the specified resource.
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
	var result = {
		data: [],
		error: null
	};

	db.get("SELECT * FROM players WHERE id = ?", [req.params.id], function (err, rows) {
		if (err) {
			result.error = {
				'code': err.errno,
				'msg': err.message
			};
			res.status(500);
		}
		else {
			if( !rows ) {
				result.error = {
					'code': 404,
					'msg': 'Not Found'
				};
				res.status(404);
			}
			else {
				result.data = [rows];
				res.status(200);
			}
		}
		res.jsonp(result);
	});
};

/**
 * Show the form for editing the specified resource.
 *
 * @param req
 * @param res
 */
exports.edit = function (req, res) {
	//
};

/**
 * Update the specified resource in storage.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
	var result = {
		data: [],
		error: null
	};

	var stmt = db.prepare("" +
		"UPDATE players SET name = ?, image = ? " +
		"WHERE id = ?");
	stmt.run([
		req.query.name,
		faker.image.avatar(),
		req.params.id
	], function (err, rows) {
		if (err) {
			result.error = {
				'code': err.errno,
				'msg': err.message
			};
			res.status(500).jsonp(result);
		}
		else {
			exports.show( req, res );
		}
	});
};

/**
 * Remove the specified resource from storage.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
	var result = {
		data: [],
		error: null
	};

	db.get("SELECT * FROM players WHERE id = ?", [req.params.id], function (err, rows) {
		if (err) {
			result.error = {
				'code': err.errno,
				'msg': err.message
			};
			res.status(500).jsonp(result);
		}
		else {
			if( rows && rows.id ) {
				var stmt = db.prepare("" +
					"DELETE FROM players " +
					"WHERE id = ?");
				stmt.run([
					req.params.id
				], function (err) {
					if (err) {
						result.error = {
							'code': err.errno,
							'msg': err.message
						};
						res.status(500);
					}
					else {
						result.data = [rows];
						res.status(200);
					}
					res.jsonp(result);
				});
			}
			else {
				result.error = {
					'code': 404,
					'msg': 'Not Found'
				};
				res.status(404).jsonp(result);
			}
		}
	});
};

