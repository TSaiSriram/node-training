const router = require('express').Router();
const userService  = require('../services/users.service');
/* GET users listing. */
router.post('/all', userService.postUsers );

router.put('/update/:email', userService.putUser);

router.delete('/delete', userService.deleteUser);

module.exports = router;
