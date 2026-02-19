import { test } from "@playwright/test";

export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext,
  ) {
    return function replacementMethod(...args: any) {
      /* Use `stepName` when it's defined or fall back to class name / method name */
      const name =
        stepName || `${this.constructor.name + "." + (context.name as string)}`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
