const userCtrl = require("../controllers/userCtrl")
const auth = require("../middlewares/auth")

const router = require('express').Router()

router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/update_user', auth, userCtrl.updateUserProfle)

router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow)

router.post('/user/feedback', auth, userCtrl.feedbackUser)
router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)

router.post('/story/create', auth, userCtrl.createStory)
router.get('/story/:id/get', auth, userCtrl.getStory)
router.delete('/story/delete/:id', auth, userCtrl.deleteStory)

router.delete('/delete/:id', auth, userCtrl.deleteUser)


module.exports = router