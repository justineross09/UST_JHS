const router = require('express').Router();
const {
  getAllAdmin,
  getAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  loginAdmin,
  forgotAdmin,
 
} = require('../../controllers/admin');

router.get('/get-all-admin', getAllAdmin);
router.get('/get-admin/:id', getAdmin);
router.post('/create-admin', createAdmin);
router.post('/login-admin', loginAdmin);
router.post('/forgot-password', forgotAdmin);
router.delete('/delete-admin/:id', deleteAdmin);
router.patch('/update-admin/:id', updateAdmin);

module.exports = router;

