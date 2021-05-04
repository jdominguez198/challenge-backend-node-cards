module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/index.js',
      instances: 4,
      exec_mode: 'cluster',
      instance_var: 'server',
    }
  ]
}
