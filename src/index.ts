import defaults from './defaults';
const awsParamStore = require('aws-param-store');

const load = function(options: SecretForkliftOptions) {
  return new Promise((resolve, reject) => {
    options = Object.assign(defaults, options);
    awsParamStore.getParametersByPath(options.path).then((parameters: any) => {
      parameters.forEach((parameter: any) => {
        const name = parameter.Name.split('/');
        const value = parameter.Value;
        options.loader(options.formatter(name[name.length - 1]), value);
      });
      resolve();
    }).catch((err: any) => reject(err));
  });
};

export default load;
