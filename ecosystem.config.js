module.exports = {
  apps: [
    {
      name: '[DOC] Docs',
      script: 'npm',
      args: 'run serve',
      cwd: '/root/app/ssapi-doc',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 27000
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
