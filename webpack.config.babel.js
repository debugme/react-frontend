import path from 'path'
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getConfig = (env) => {

  return {

    context: path.join(__dirname, 'app/components'),

    // Define the root file from where the bundling process should begin
    entry: './Application.jsx',

    // Define where the bundled file should be output to
    output: {
      path: path.join(__dirname, 'public'),     // The folder the bundled file should be generated in
      publicPath: '/public/',                   // The folder webpack-dev-server should monitor for updates
      filename: 'bundle.js',                    // The name of the bundled file
      pathinfo: true                            // Should requires be commented to indicate what is being required
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
      new ExtractTextPlugin('bundle.css')                                       // all files concatenated should be dumped into a single file whose name is 'bundle.css'
    ]

  }

}

export default getConfig