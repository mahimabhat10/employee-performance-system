const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json(employee);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });
  }
};

exports.getEmployees = async (req, res) => {

  const employees = await Employee.find();

  res.json(employees);
};

exports.searchEmployee = async (req, res) => {

  const { department } = req.query;

  const employees = await Employee.find({
    department
  });

  res.json(employees);
};