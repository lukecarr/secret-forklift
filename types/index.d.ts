export type NameFormatter = (name: string) => string;

export type ParameterLoader = (parameter: Parameter) => void;

export type ParameterType = 'String' | 'StringList' | 'SecureString';

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