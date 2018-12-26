const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

module.exports = env => {
   const isProd = env && env.prod;
   let config = {
      mode: "development",
      stats: 'errors-only',
      entry: {
         index: './index.ts',
      },
      watchOptions: {
         ignored: /node_modules/
      },
      watch: env && env.watch,
      plugins: [
         new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
         }),
         new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ],
      resolve: {
         alias: {
            'vue$': 'vue/dist/vue.js',
         },
         extensions: ['.ts', '.js', '.json']
      },
      devtool: 'source-map',
      module: {
         rules: [
            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/
            },
            {
               test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
               use: [
                  {
                     loader: 'file-loader',
                     options: {
                        name: isProd ? 'assets/[name].[hash].[ext]' : 'assets/[path]/[name].[ext]',
                        publicPath: '.'
                     }
                  }
               ]
            },
            {
               test: /\.css/,
               use: [
                  {
                     loader: MiniCssExtractPlugin.loader,
                     options: {
                        publicPath: '../'
                     }
                  },
                  {
                     loader: 'css-loader',
                     options: {
                        url: true,
                     }
                  }
               ]
            },
            {
               test: /\.less$/,
               use: [
                  {
                     loader: MiniCssExtractPlugin.loader,
                     options: {
                        publicPath: '../'
                     }
                  },
                  {
                     loader: 'css-loader',
                     options: {
                        url: true,
                     }
                  },
                  {
                     loader: 'less-loader',
                     options: {
                        paths: []
                     }
                  }
               ]
            }
         ]
      },
      optimization: {
         namedChunks: true,
         splitChunks: {
            chunks: 'all',
            name: true,
            minSize: 0,
            cacheGroups: {
               vendors: {
                  test: /(node_modules)/,
                  name: 'vendors',
                  enforce: true,
               },
               default: {
                  minChunks: 9999999,
                  priority: -20,
                  reuseExistingChunk: true
               }
            }
         },
         occurrenceOrder: true
      }
   };

   if (isProd) {
      config.mode = 'production';
      config.devtool = 'none';
      config.watch = false;
      config.plugins.push(new OptimizeCssnanoPlugin({
         cssnanoOptions: {
            preset: [
               'default', {
                  discardComments: {
                     removeAll: true,
                  },
               }
            ],
         },
      }));
   }
   return config;
}