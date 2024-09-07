const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database (for simplicity)
let employees = [
    { name: 'John Doe', department: 'HR', position: 'Manager', status: 'Active' },
    { name: 'Jane Smith', department: 'Finance', position: 'Analyst', status: 'Active' }
];
app.get('/', (req, res) => {
  res.send('I am working');
});
// 1. Get Dashboard Data
app.get('/api/dashboard', (req, res) => {
    res.json({
        totalEmployees: employees.length,
        tasksCompleted: 1250, // Example data
        onLeave: 5,
        payrollPending: '10%'
    });
});

// 2. Get Employee Directory
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// 3. Add New Employee
app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// 4. Update Employee Status
app.put('/api/employees/:name', (req, res) => {
    const employeeName = req.params.name;
    const updatedData = req.body;
    const employee = employees.find(emp => emp.name === employeeName);
    if (employee) {
        Object.assign(employee, updatedData);
        res.json(employee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
