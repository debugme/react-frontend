import path from 'path'
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getConfig = (env) => {

  return {     // the validate() function pretty-prints erros with the webpack config for us :)

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
      extensions: ['.js', '.jsx'],

      // Define aliases which can be for one module to refer to another module
      alias: {
        'Header': 'app/components/Header',
        'Navigation': 'app/components/Navigation',
        'Content': 'app/components/Content',
        'Footer': 'app/components/Footer',
        'VideoInfo': 'app/components/VideoInfo',

        'debug': 'app/../styles/styles.scss',
        'layout': 'app/../styles/layout.scss',
        'responsive': 'app/../styles/responsive.scss',
        'styles': 'app/../styles/styles.scss'
      }
    },

    // Define how code should be transformed before it is bundled
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /(node_modules|public)/
        },
        {
          loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
          test: /\.s?css/,
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('bundle.css')
    ]

  }

}

export default getConfig