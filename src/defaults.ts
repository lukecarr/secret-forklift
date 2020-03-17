const defaults: SecretForkliftOptions = {
  path: process.env.AWS_PARAM_STORE_PATH || '',
  override: true,
  formatter(name) {
    return name.replace(/-/g, '_').toUpperCase();
  },
  loader(parameter) {
    if ((Object.prototype.hasOwnProperty.call(process.env, parameter.Name) && this.override)
      || !Object.prototype.hasOwnProperty.call(process.env, parameter.Name)) {
      process.env[parameter.Name] = parameter.Value;
    }
  },
};

export default defaults;
