declare module 'markdown-it' {
  interface MarkDownIt {
    new (): {
      render(str: string): string;
    };
  }

  export class MarkDownIt implements MarkDownIt {}

  export default MarkDownIt;
}
