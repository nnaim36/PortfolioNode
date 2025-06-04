const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

import UserRoutes from './BingoCard/Users/routes.js';


const app = express();
app.use(cors());
app.use(express.json());

UserRoutes(app)


app.listen(provess.env.PORT || 4000)