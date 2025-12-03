module.exports = {
  apps: [
    {
      name: 'elissh-backend',
      script: './backend/server.js',
      cwd: '/var/www/html/elissh',
      env: {
        NODE_ENV: 'production',
        PORT: 5002,
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_NAME: 'elissh_cosmetics',
        DB_USER: 'postgres',
        DB_PASSWORD: 'postgres123',
        JWT_SECRET: 'your_jwt_secret_key_here_make_it_very_long_and_secure',
        JWT_EXPIRE: '30d',
        FRONTEND_URL: 'http://localhost:5173'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log'
    }
  ]
};