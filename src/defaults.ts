const defaults : SecretForkliftOptions = {
  path: process.env.AWS_PARAM_STORE_PATH || '',
  override: true,
  formatter: function(name) {
    return name.replace(/-/g, '_').toUpperCase();
  },
  loader: function(name, value) {
    if (process.env.hasOwnProperty(name) && this.override || !process.env.hasOwnProperty(name)) {
      process.env[name] = value;
    }
  }
};

export default defaults;
