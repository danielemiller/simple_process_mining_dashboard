declare module 'bpmn-js' {
    class BpmnViewer {
      constructor(options: any);
      importXML(xml: string, callback: (err: Error, warnings?: string[]) => void): void;
      attachTo(parentNode: HTMLElement): void;
      get(module: string): any;
    }
    export = BpmnViewer;
  }