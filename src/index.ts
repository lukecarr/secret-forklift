import defaults from './defaults';

const awsParamStore = require('aws-param-store');

const loadDefaults = (options: SecretForkliftOptions): SecretForkliftOptions => {
  return Object.assign(defaults, options);
};

const handleParamters = (options: SecretForkliftOptions, parameters: any): void => {
  parameters.forEach((parameter: any) => {
    const name = parameter.Name.split('/');
    const value = parameter.Value;
    options.loader(options.formatter(name[name.length - 1]), value);
  });
};

export const load = (options: SecretForkliftOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const optionsWithDefaults = loadDefaults(options);
    awsParamStore.getParametersByPath(optionsWithDefaults.path).then((parameters: any) => {
      handleParamters(optionsWithDefaults, parameters);
      resolve();
    }).catch((err: any) => reject(err));
  });
};

export const loadSync = (options: SecretForkliftOptions): void => {
  const optionsWithDefaults = loadDefaults(options);
  const parameters = awsParamStore.getParametersByPathSync(optionsWithDefaults.path);
  handleParamters(optionsWithDefaults, parameters);
};
