import User from './schema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

function UserRoutes(app) {

  // ✅ GET user by username (MongoDB)
  app.get('/api/bingo/:username', async (req, res) => {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  });

  // ✅ POST login (MongoDB)
    app.post('/api/bingo/login', async (req, res) => {
    const { username, password } = req.body;

        try {
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(401).send({ message: 'Invalid username' });
          }
      
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).send({ message: 'Invalid password' });
          }
      
          const token = jwt.sign(
            { id: user._id, username: user.username },
            'secret-key',
            { expiresIn: '1h' }
          );
      
          res.send({ token });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Login error' });
        }
    });

  // ✅ POST signout (symbolic for JWT-based auth)
  app.post("/api/bingo/signout", (req, res) => {
    // nothing to destroy with JWT — frontend should just delete token
    res.sendStatus(200);
  });
}

export default UserRoutes;