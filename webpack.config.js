import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    clean: true,
  },
  plugins: [
  new HtmlWebpackPlugin({
    title: 'Test Task',
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: 'style.css'
  }),
  new CopyPlugin({
    patterns: [
      {
        from: 'src/assets/img',
        to: 'img',
      }
    ]
  }),
],
optimization: {
  minimizer: [
    `...`,
    new CssMinimizerPlugin(),
  ],
},
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff)$/,
        use: ['file-loader'],
      },
    ]
  }
}