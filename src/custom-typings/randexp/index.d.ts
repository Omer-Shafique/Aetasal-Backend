declare module 'randexp' {
  class RandExp {

    public static randexp(...args: any[]): void;

    public static sugar(...args: any[]): void;

    constructor(...args: any[]);

    public gen(...args: any[]): string;

    public randInt(...args: any[]): void;

  }

  export = RandExp;
}
