declare module 'secret-forklift';

type NameFormatter = (name: string) => string;

type ParameterLoader = (parameter: Parameter) => void;

type ParameterType = 'String' | 'StringList' | 'SecureString';

interface SecretForkliftOptions {
  path: string;
  override: true;
  formatter: NameFormatter;
  loader: ParameterLoader;
}

interface Parameter {
  Name: string;
  Type: ParameterType;
  Value: string;
  Version: number;
  LastModifiedDate: Date;
  ARN: string;
}
