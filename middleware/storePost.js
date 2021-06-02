module.exports = (req, res, next) => {
    if (!req.files || !req.files.image || !req.body.username || !req.body.title || !req.body.description || !req.body.content) {
        console.log('ERR: validate new post request. redirect...');
        return res.redirect('/posts/new')
    }

    next()
}