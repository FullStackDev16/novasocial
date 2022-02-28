const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')
const auth = require('../middlewares/auth')

router.post('/comment', auth, commentCtrl.createComment)

router.patch('/comment/:id', auth, commentCtrl.updateComment)

router.patch('/comment/:id/like', auth, commentCtrl.likeComment)
router.patch('/comment/:id/removelike', auth, commentCtrl.removeLikeComment)

router.patch('/comment/:id/dislike', auth, commentCtrl.dislikeComment)
router.patch('/comment/:id/removedislike', auth, commentCtrl.removeDislikeComment)

router.delete('/comment/:id', auth, commentCtrl.deleteComment)



module.exports = router