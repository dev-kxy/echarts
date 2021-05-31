const {resolve}  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    devtool: 'none',
    output:{
        filename:'build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[ // 执行顺序从后向前
                    // 'style-loader',// 创建一个style标签，添加到head中
                    MiniCssExtractPlugin.loader, // 提取css成单独的文件
                    'css-loader', // 将css文件整合成common.js模块，内容是样式的字符串
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: () => [
                            // postcss的插件
                            require('postcss-preset-env')()
                          ]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(png|svg|jpg|gif|ttf)$/,
                loader:'url-loader',
                options:{
                    name:'[hash:10].[ext]',
                    esModule:false,
                    limit:8 * 1024,
                    outputPath:'imgs'
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                exclude:/\.(html|js|css|less|json|jpg|png|gif|svg)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'medias'
                }
            },
            
            
        ]
    },
    plugins:[
        //打包后默认创建一个html文件，自动引入打包后输出的资源
        // 添加template文件后，可复制该资源，并讲打包后的文件引入到template的副本中
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        })
    ],
    mode:'development',
    devServer:{ // 特点，只会在内存中打包，不会在本地输出。 而使用webpack命令打包时，会在本地打包， 有输出
        contentBase:resolve(__dirname,'build'),
        compress:true, // gzip 压缩
        port:8888,
        open:false
    }
}