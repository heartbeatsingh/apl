// config.js
module.exports = {
  'secret': process.env.SECRET || 'supersecret',
  'base_url': process.env.BASEURL || 'http://localhost:3000',
  'fornt_url' : process.env.FORNTURL || 'http://localhost:4200',
  'smtp': {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: '587',
    secure: false,
    user: 'AKIAIX4JWL2A65WYTQPA',
    pass: 'AsL1bThLZA3+1CHX5o3hLy3m9tjNnJbWYMEUyYBcfMLF',
    from: '"No Reply" <no-reply@121with.com>'
  }
};