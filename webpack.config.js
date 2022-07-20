const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  // 开发模式
  mode: 'development',
  // 入口：main.js
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/chunk-[contenthash].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      // js 在 body 里引入
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.((c|sc)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        parser: {
          dataUrlCondition: {
            maxsize: 25 * 1024,
          }
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /.\js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
    extensions: ['.js', '.ts', '.less', '.vue']
  },
  devServer: {
    port: 8080,
    open: true
  }
}