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
      filename: '[name].js',                    // The name of the bundled files (matches the keys in the entry object above)
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
        'debug': 'styles/debug.scss',
        'layout': 'styles/layout.scss',
        'responsive': 'styles/responsive.scss',
        'general': 'styles/general.scss'
      }
    },

    // Define how code should be transformed before it is bundled
    module: {
      rules: [
        {
          loader: 'babel-loader',                                               // the babel-loader should be used to transform files...
          test: /\.jsx?$/,                                                      // that have the .js or .jsx extension...
          exclude: /(node_modules|public)/                                      // and are not in the node_modules or public folders
        },
        {
          loader: ExtractTextPlugin.extract('css-loader!sass-loader'),          // this extract text plugin should be used to concatenate files...
          test: /\.s?css/,                                                      // that have the .css or .scss extension
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('bundle.css'),                                      // all files concatenated should be dumped into a single file whose name is 'bundle.css'
      new HtmlWebpackPlugin({                                                   // add "bundle.js", "vendor.js" and "bundle.css" in script/link tags into copy of index.html in public folder
        template: 'app/index.html'
      })
    ]

  }

}

export default getConfig

// BEFORE
//  bundle.js   2.5 MB       0  [emitted]  [big]  bundle
// bundle.css  7.82 kB       0  [emitted]         bundle

// AFTER
//  bundle.js   2.5 MB       0  [emitted]  [big]  bundle
//  vendor.js  1.91 MB       1  [emitted]  [big]  vendor
// bundle.css  7.82 kB       0  [emitted]         bundle

// AFTER-AFTER
//  bundle.js   589 kB       0  [emitted]  [big]  bundle
//  vendor.js  1.91 MB       1  [emitted]  [big]  vendor
// bundle.css  7.82 kB       0  [emitted]         bundle