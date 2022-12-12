const RequestForm = require('../../models/RequestForm');
const nodemailer = require('nodemailer');
const { query } = require('express');


const getAllRequestForm = async (req, res) => {
  try {
    const requestForm = await RequestForm.find({ status: { $ne: "Archive" } });
    

    let openNumber = 0;
    let resolveNumber = 0;
    let voidedNumber = 0;
    let reopenedNumber = 0;
    

    for (let i = 0; i < requestForm?.length; i++) {
      if (requestForm[i].status == 'In Progress') {
        openNumber++;
      }
      if (requestForm[i].status == 'Resolved') {
        resolveNumber++;
      }
      if (requestForm[i].status == 'Voided') {
        voidedNumber++;
      }
      if (requestForm[i].status == 'Reopened') {
        reopenedNumber++;
      }
    }

    res.status(200).json({
      status: 'success',
      results: requestForm.length,
      data: {
        requestForm,
        openNumber,
        resolveNumber,
        voidedNumber,
        reopenedNumber,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getAllArchiveForm = async (req, res) => {
  try {
    const requestForm = await RequestForm.find({status: "Archive"});

    res.status(200).json({
      status: 'success',
      results: requestForm.length,
      data: {
        requestForm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};


const getRequestForm = async (req, res) => {
  // done
  try {
    const requestForm = await RequestForm.findOne({
      referenceId: req.params.id,
    });
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        requestForm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getRequestFormById = async (req, res) => {
  // done
  try {
    const requestForm = await RequestForm.findById(req.params.id);
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        requestForm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const checkRequestForm = async (req, res) => {
  // done
  const { referenceId } = req.body;
  try {
    const requestForm = await RequestForm.find({ referenceId: referenceId });
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        requestForm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const createRequestForm = async (req, res) => {
  try {
    const requestForm = await RequestForm.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        requestForm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err + 'hello',
    });
  }
};

const deleteRequestForm = async (req, res) => {
  try {
    const requestForm = await RequestForm.findById(req.params.id);

    await Feature.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: `Successfully deleted`,
      dataDeleted: requestForm,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const updateRequestForm = async (req, res) => {
  try {
    const requestForm = await RequestForm.findByIdAndUpdate(
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
        requestForm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const sendingEmail = async (req, res) => {
  const { emailAdd } = req.body;
  const { status } = req.body;
  const { emailNaTalaga } = req.body;
  try {
    let requestForm = await RequestForm.find({ emailAdd: emailAdd });
    let requestForm2 = await RequestForm.find({ status: status });
    let requestForm3 = await RequestForm.find({ emailNaTalaga: emailNaTalaga });
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth:{
        user: "ustjhscapstone@gmail.com",
        pass: "chjniokqfpicsiee",
      },
      tls:{
        rejectUnauthorized:false
      }  
    });  
    
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"UST JHS" <ustjhscapstone@gmail.com>', // sender address
        to: req.body.emailNaTalaga, // list of receivers
        subject: req.body.status, // Subject line
        text: req.body.emailAdd, // plain text body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if (error) { 
        console.log(error);}});

    res.status(200).json({
      status: 'success',
      data: {
        requestForm,
      },
    });

  } catch (err) {
    console.log('error' + err);
  } 
};

module.exports = {
  getAllRequestForm,
  getRequestForm,
  createRequestForm,
  deleteRequestForm,
  updateRequestForm,
  checkRequestForm,
  getRequestFormById,
  sendingEmail,
  getAllArchiveForm,
};

