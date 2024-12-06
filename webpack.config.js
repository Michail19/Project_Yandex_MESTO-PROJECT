const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Входной файл для сборки
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Применяем Babel ко всем JS файлам
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Для обработки CSS файлов
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон для создания HTML-файла
    }),
  ],
  mode: 'development', // Режим разработки (можно сменить на 'production' для продакшн сборки)
};
