

const handleSignin = (req, res, db, bcrypt) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      bcrypt.compare(password, data[0].hash).then(isValid => {
        if (isValid) {
          return (
            db.select('*').from('users')
              .where('email', '=', email)
              .then(user => {
                req.session.userId = user[0].id;
                // console.log(req.session);
                res.json(user[0]);
              })
              .catch(err => res.status(400).json("Error retrieving user"))
          );
        } else {
          return res.status(401).json("Incorrect credentials");
        }
      })
        .catch(err => res.status(401).json("Incorrect credentials"))
    })
    .catch(err => res.status(401).json("Incorrect credentials"));
}

module.exports = {
  handleSignin: handleSignin
}