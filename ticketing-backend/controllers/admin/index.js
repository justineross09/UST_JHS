const Admin = require('../../models/Admin');



const getAllAdmin = async (req, res) => {
  try {
    const adminAccount = await Admin.find();

    res.status(200).json({
      status: 'success',
      results: adminAccount.length,
      data: {
        adminAccount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getAdmin = async (req, res) => {
  // done
  try {
    const adminAccount = await Admin.findById(req.params.id);
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        adminAccount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const loginAdmin = async (req, res) => {
  // done
  try {
    const { email, password } = req.body;

    const adminAccount = await Admin.findOne({ email: email });

    if (!adminAccount)
      return res.status(401).json({ errorMessage: 'Invalid Credentials' });

    if (adminAccount.password !== password)
      return res.status(401).json({ errorMessage: 'Invalid Credentials' });
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: 'login success',
      data: {
        adminAccount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const forgotAdmin = async (req, res) => {
  // done
  try {
    const { email } = req.body;

    const adminAccount = await Admin.findOne({ email: email });

    if (!adminAccount)
      return res.status(401).json({ errorMessage: 'Invalid Credentials' });

    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: 'forgot email check success',
      data: {
        adminAccount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const adminAccount = await Admin.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        adminAccount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminAccount = await Admin.findById(req.params.id);

    await Admin.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: `Successfully deleted`,
      dataDeleted: adminAccount,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const adminAccount = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        adminAccount,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};



module.exports = {
  getAllAdmin,
  getAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  forgotAdmin,
  loginAdmin,
  
};

