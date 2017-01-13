module.exports = {

  // Define the root file from where the bundling process should begin
  entry: './app/components/Application.jsx',

  // Define where the bundled file should be output to
  output: {
    path: __dirname,
    filename: 'public/bundle.js'
  },

  // Define extensions of files to be bundled
  resolve: {

    // Define root directory of where to look...
    root: __dirname,

    // when resolving aliases for custom React components
    alias: {
      Header: 'app/components/Header',
      Navigation: 'app/components/Navigation',
      Content: 'app/components/Content',
      VideoInfo: 'app/components/VideoInfo',
      Footer: 'app/components/Footer',
    },
    extensions: ['', '.js', '.jsx']
  },

  // Define how code should be transformed before it is bundled
  module: {
    loaders: [
      {
        // Use the babel-loader...
        loader: 'babel-loader',
        // to first convert react into javascript and then that javascript into es2015 syntax...
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        // only apply these conversions to files with the .jsx extension...
        test: /\.jsx?$/,

        // and exclude the following directories
        exclude: /(node_modules)/
      }
    ]
  },

  // Enable source maps for debugging purposes
  devtool: 'inline-source-map'
}
