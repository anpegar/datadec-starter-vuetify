const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const url = require('url')

const publicPath = ''
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader'];
const cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: 'css-loader'
});

module.exports = {
	entry: {
		vendor: './src/vendor',
		app: './src/app.js'
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: isProd ? '[name].js?[chunkhash]' : '[name].js',
		chunkFilename: '[id].js?[chunkhash]',
		publicPath: isProd ? publicPath : '/dist/'
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.css$/,
				use: isProd ? cssProd : cssDev
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				exclude: /node_modules/
			},
			{
				enforce: 'pre',
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]'
					}
				}
			},
			{
				test: /\.styl$/,
				loader: ['style-loader', 'css-loader', 'stylus-loader']
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'public': resolve(__dirname, './public')
		}
	},
	devServer: {
		host: '127.0.0.1',
		port: 3000,
		proxy: {
			'/crme/*': {
				target: 'http://127.0.0.1:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/crme': ''
				},
				secure: false
			}
		},
		historyApiFallback: {
			index: url.parse(isProd ? publicPath : '/dist/').pathname
		},
		noInfo: true
	},
	devtool: isProd ? '#source-map' : '#eval-source-map',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'src/app.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			axios: 'axios'
		})
	]
}

if (isProd) {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new ExtractTextPlugin({
			filename: '/css/[name].css',
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}