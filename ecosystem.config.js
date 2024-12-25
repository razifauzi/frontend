module.exports = {
  apps: [
    // Spring Boot backend configuration
    {
      name: 'spring-boot-backend',
      script: 'java',
      args: '-jar /home/ubuntu/backend/spring-boot-api/target/demo-0.0.1-SNAPSHOT.jar',
      cwd: '/home/ubuntu', // Make sure the path here is correct
      exec_mode: 'fork',
      watch: false,
    },

    // Next.js frontend configuration
    {
      name: 'nextjs-frontend',
      script: 'npm',
      args: 'start', // If you're using the default Next.js start script
      cwd: '/home/ubuntu/source', // Update this path to where your Next.js app is located
      exec_mode: 'fork',
      watch: false,
    },
  ],

  deploy: {
    production: {
      key: 'key.pem',
      user: 'ubuntu',
      host: '43.216.119.145',
      ref: 'origin/main',
      repo: 'https://github.com/razifauzi/frontend.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      ssh_options: 'ForwardAgent=yes',
    },
  },
};
