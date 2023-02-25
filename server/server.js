const path = require('path');
const http = require('http');
const express = require('express');
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green.bold);
});