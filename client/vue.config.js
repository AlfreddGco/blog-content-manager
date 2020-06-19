module.exports = {
    devServer: {
        proxy: 'http://localhost:5000/',
    },
    api:{
        storage: 'http://localhost:5000/api/storage',
        blogs: 'http://localhost:5000/api/blogs',
        news: 'http://localhost:5000/api/news',
    }
}
