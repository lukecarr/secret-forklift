import defaults from './defaults';
const awsParamStore = require('aws-param-store');

const loadDefaults = (options: SecretForkliftOptions) => Object.assign(defaults, options);

const handleParamters = (options: SecretForkliftOptions, parameters: any) => {
  parameters.forEach((parameter: any) => {
    const name = parameter.Name.split('/');
    const value = parameter.Value;
    options.loader(options.formatter(name[name.length - 1]), value);
  });
}

export const load = (options: SecretForkliftOptions) => {
  return new Promise((resolve, reject) => {
    options = loadDefaults(options);
    awsParamStore.getParametersByPath(options.path).then((parameters: any) => {
      handleParamters(options, parameters);
      resolve();
    }).catch((err: any) => reject(err));
  });
};

export const loadSync = (options: SecretForkliftOptions) => {
  options = loadDefaults(options);
  const parameters = awsParamStore.getParametersByPathSync(options.path);
  handleParamters(options, parameters);
};
