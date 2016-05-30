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
		"SELECT games.* " +
		"FROM games" +
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

	var stmt = db.prepare("INSERT INTO games ( winner_id, looser_id ) VALUES (?, ?)");
	stmt.run([
		req.body.winner_id,
		req.body.looser_id
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

	db.get("SELECT * FROM games WHERE id = ?", [req.params.id], function (err, rows) {
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
		"UPDATE games SET winner_id = ?, looser_id = ? " +
		"WHERE id = ?");
	stmt.run([
		req.query.winner_id,
		req.query.looser_id,
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

	db.get("SELECT * FROM games WHERE id = ?", [req.params.id], function (err, rows) {
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
					"DELETE FROM games " +
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

