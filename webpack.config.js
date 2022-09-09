var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "",
    filename: "main.js",
  },

  mode: "development",

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    port: 1233,
  },

  // Loader: jede Loader wird seine rule in Form von module geschrieben
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },

      // {
      //   test: /\.css$/,
      //   use: 
      //   [MiniCssExtractPlugin.loader, "css-loader"],
      // },

      {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false,
                  publicPath: '../',
                },
              },
            'css-loader'
        ]
    },

      // {
      //   test: /\.(png|svg|jpe?g|gif)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "images",
      //       },
      //     },
      //   ],
      // },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
              esModule: false,
            },
          },
        ],
      },

      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        }
      },

    ],
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({ filename: "css/style.css" }),
  ],
};
