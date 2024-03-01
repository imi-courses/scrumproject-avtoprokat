const express = require('express');
const { useCallback } = require('react');

const PORT = 5000;

const app = express()
app.listen(PORT, () => console.log('Server started ${5000}'))