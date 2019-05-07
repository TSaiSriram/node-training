const router = require('express').Router();
const userService  = require('../services/users.service');
/* GET users listing. */
router.post('/all', async (req, res) => {
  const data  = await userService.postUsers;
  console.log(data)
  res.status(200).send({data : data })
});

module.exports = router;
