module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key: 'key.pem',
      user : 'ubuntu',
      host : '43.216.252.56',
      ref  : 'origin/main',
      repo : 'https://github.com/razifauzi/frontend.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'

    }
  }
};
