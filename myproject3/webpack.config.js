var path = require('path');

module.exports = {
	entry: './src/app',

	output: {
		path: path.resolve(__dirname, './public/js'),
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [ 'babel-loader', ],
			},{
				test: /\.css?$/,
				use: [ 'style-loader', 'css-loader?modules', ],
			}
		]
	}
};