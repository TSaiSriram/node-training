const router = require('express').Router();
const userService = require('../services/users.service');
const updateValdation = require('../validation/update.validation');
const deleteValdation = require('../validation/delete.validate');
const expressJoi = require('express-joi-validator');

/* GET all users  users listing. */
router.post('/all', userService.postUsers);
//User Search
router.post('/search', userService.postSearchUsers);
// Update a single user 
router.put('/update/:userId', expressJoi(updateValdation.updateSchema), userService.putUser);
//Soft delete a single user
router.delete('/delete/:userId', expressJoi(deleteValdation.deleteSchema), userService.deleteUser);

module.exports = router;
