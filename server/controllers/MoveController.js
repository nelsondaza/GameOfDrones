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
		"SELECT moves.* " +
		"FROM moves" +
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

	var stmt = db.prepare("INSERT INTO moves ( name, kills, image ) VALUES (?, ?, ?)");
	stmt.run([
		req.body.name,
		req.body.kills,
		faker.image.abstract(),
	], function (err, rows) {
		if (err) {
			result.error = {
				'code': err.errno,
				'msg': err.message
			};
			res.status(500).jsonp(result);
		}
		else {
			req.params.id = req.body.name;
			exports.show( req, res );
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

	db.get("SELECT * FROM moves WHERE name = ?", [req.params.id], function (err, rows) {
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
		"UPDATE moves SET name = ?, kills = ? " +
		"WHERE name = ?");
	stmt.run([
		req.query.name,
		req.query.kills,
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

	db.get("SELECT * FROM moves WHERE name = ?", [req.params.id], function (err, rows) {
		if (err) {
			result.error = {
				'code': err.errno,
				'msg': err.message
			};
			res.status(500).jsonp(result);
		}
		else {
			if( rows && rows.name ) {
				var stmt = db.prepare("" +
					"DELETE FROM moves " +
					"WHERE name = ?");
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

