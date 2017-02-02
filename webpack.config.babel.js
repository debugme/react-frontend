import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const BUNDLE_ROOT = 'app/components/Application.jsx'
const VENDOR_LIBS = ['lodash', 'moment', 'react', 'react-dom']

const getConfig = (env) => {

  return {

    // Define the root files from where discrete bundles should be created
    entry: {
      bundle: BUNDLE_ROOT,      // store app code and any libraries not defined in VENDOR_LIBS in bundle.js
      vendor: VENDOR_LIBS       // store these libraries in vendor.js
    },

    // Define where the bundled file should be output to
    output: {
      path: path.join(__dirname, 'public'),     // The folder the bundled files should be generated in
      filename: '[name].[chunkhash].js',         // The name of the bundled files (matches the keys in the entry object above) with chunk hash for cache busting
      pathinfo: true                            // Should requires be commented in bundle files to make more clear indicate what is being required by the require call
    },

    // Provide support for source-map (inline for DEV; separate for PROD)
    devtool: env.prod && 'source-map' || 'eval',

    resolve: {
      // Look in these directories when trying to find modules...
      modules: [
        'node_modules',
        __dirname
      ],
      // Files with these extensions should be considered as modules
      extensions: ['.js', '.jsx', '.css', '.scss'],

      // Define aliases which can be for one module to refer to another module
      alias: {

        // Define aliases for your React components
        'Header': 'app/components/Header',
        'Navigation': 'app/components/Navigation',
        'Content': 'app/components/Content',
        'Footer': 'app/components/Footer',
        'VideoInfo': 'app/components/VideoInfo',

        // Define aliases for your SASS files
        'layout': 'styles/layout.scss',
        'responsive': 'styles/responsive.scss',
        'general': 'styles/general.scss'
      }
    },

    // Define how code should be transformed before it is bundled
    module: {
      rules: [

        // the babel-loader should be used to transform files...
        // that have the .js or .jsx extension...
        // and are not in the node_modules or public folders
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /(node_modules|public)/
        },

        // this extract text plugin should be used to concatenate files...
        // that have the .css or .scss extension.
        {
          loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
          test: /\.s?css/
        }
      ]
    },

    plugins: [

      // vendor contains the source code for the vendor libs
      // manifest contains information indicating whether bundle/vendor/both files changed
      // If we do not provide the 'manifest' string, the info about what has changed is added
      // to vendor, causing it to cache-bust and be downloaded by the browser (Not the behaviour
      // you want when you have only changed bundle.js!!!)
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),

      // all files concatenated should be dumped into a single file whose name is 'bundle.[hash].css'
      // by using the hash, we facilitate cache-busting in the browser
      new ExtractTextPlugin('bundle.[contenthash].css'),

      // add "bundle.js", "vendor.js" and "bundle.css" in script/link tags into copy of index.html in public folder
      new HtmlWebpackPlugin({
        template: 'app/index.html'
      }),

      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]

  }

}

export default getConfig
