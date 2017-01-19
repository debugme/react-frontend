import path from 'path'
// const path = require('path')

module.exports = env => {

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
        'VideoInfo': 'app/components/VideoInfo'
      }
    },

    // Define how code should be transformed before it is bundled
    module: {
      loaders: [
        {
          // Use the babel-loader...
          loader: 'babel-loader',
          // to convert React code into latest EcmaScript code...
          query: {
            presets: ['react', 'es2015', 'es2016', 'stage-0']
          },
          // only apply these conversions to files with the .js or .jsx extension...
          test: /\.jsx?$/,

          // and exclude the following directories
          exclude: /(node_modules)/
        }
      ]
    }

  }

}