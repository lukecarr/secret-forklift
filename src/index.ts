import { mergeDefaults, SecretForkliftOptions, Parameter } from "./options";

const awsParamStore = require("aws-param-store");

const handleParamters = (
  options: SecretForkliftOptions,
  parameters: Parameter[]
): void => {
  parameters.forEach((parameter: Parameter) => {
    const parameterFormatted: Parameter = parameter;
    const nameSplit: string[] = parameterFormatted.Name.split("/");
    parameterFormatted.Name = options.formatter(
      nameSplit[nameSplit.length - 1]
    );
    options.loader(parameterFormatted);
  });
};

/**
 * Asynchronously loads parameters from AWS Parameter Store.
 *
 * @param options The configuration options for the method.
 * @returns An empty promise which resolves when the parameters have loaded.
 */
export const load = (options?: SecretForkliftOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const optionsWithDefaults = mergeDefaults(options);
    awsParamStore
      .getParametersByPath(optionsWithDefaults.path)
      .then((parameters: Parameter[]) => {
        handleParamters(optionsWithDefaults, parameters);
        resolve();
      })
      .catch((err: any) => reject(err));
  });
};

/**
 * Synchronously loads parameters from AWS Parameter Store.
 *
 * @param options The configuration options for the method.
 */
export const loadSync = (options?: SecretForkliftOptions): void => {
  const optionsWithDefaults = mergeDefaults(options);
  const parameters = awsParamStore.getParametersByPathSync(
    optionsWithDefaults.path
  );
  handleParamters(optionsWithDefaults, parameters);
};
