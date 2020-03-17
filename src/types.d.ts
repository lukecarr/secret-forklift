declare module 'secret-forklift';

interface NameFormatter {
  (name: string): string;
}

interface ParameterLoader {
  (name: string, value: any): void;
}

interface SecretForkliftOptions {
  path: string;
  override: true;
  formatter: NameFormatter;
  loader: ParameterLoader;
}
