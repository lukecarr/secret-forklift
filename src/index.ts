import defaults from './defaults';

const awsParamStore = require('aws-param-store');

const loadDefaults = (options: SecretForkliftOptions): SecretForkliftOptions => {
  const newOptions: any = { ...options };
  Object.entries(defaults).forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(newOptions, key)) {
      newOptions[key] = value;
    }
  });
  return newOptions;
};

const handleParamters = (options: SecretForkliftOptions, parameters: Parameter[]): void => {
  parameters.forEach((parameter: Parameter) => {
    const parameterFormatted: Parameter = parameter;
    const nameSplit: string[] = parameterFormatted.Name.split('/');
    parameterFormatted.Name = options.formatter(nameSplit[nameSplit.length - 1]);
    options.loader(parameterFormatted);
  });
};

export const load = (options: SecretForkliftOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const optionsWithDefaults = loadDefaults(options);
    awsParamStore.getParametersByPath(optionsWithDefaults.path).then((parameters: Parameter[]) => {
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
