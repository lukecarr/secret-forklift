const defaults: SecretForkliftOptions = {
  path: process.env.AWS_PARAM_STORE_PATH || '',
  override: true,
  formatter(name) {
    return name.replace(/-/g, '_').toUpperCase();
  },
  loader(name, value) {
    if ((Object.prototype.hasOwnProperty.call(process.env, name) && this.override)
      || !Object.prototype.hasOwnProperty.call(process.env, name)) {
      process.env[name] = value;
    }
  },
};

export default defaults;
