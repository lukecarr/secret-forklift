type NameFormatter = (name: string) => string;
type ParameterLoader = (parameter: Parameter) => void;

type ParameterType = "String" | "StringList" | "SecureString";

export interface SecretForkliftOptions {
  path: string;
  override: true;
  formatter: NameFormatter;
  loader: ParameterLoader;
}

export interface Parameter {
  Name: string;
  Type: ParameterType;
  Value: string;
  Version: number;
  LastModifiedDate: Date;
  ARN: string;
}

export const defaults: SecretForkliftOptions = {
  path: process.env.AWS_PARAM_STORE_PATH || "",
  override: true,
  formatter(name) {
    return name.replace(/-/g, "_").toUpperCase();
  },
  loader(parameter) {
    if (
      (Object.prototype.hasOwnProperty.call(process.env, parameter.Name) &&
        this.override) ||
      !Object.prototype.hasOwnProperty.call(process.env, parameter.Name)
    ) {
      process.env[parameter.Name] = parameter.Value;
    }
  },
};

export const mergeDefaults = (
  options?: SecretForkliftOptions
): SecretForkliftOptions => {
  const newOptions: any = { ...options };
  Object.entries(defaults).forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(newOptions, key)) {
      newOptions[key] = value;
    }
  });
  return newOptions;
};
