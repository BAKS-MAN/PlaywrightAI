import * as allure from "allure-js-commons";

export function step(stepName?: string) {
  return function decorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Promise<Return>
    >,
  ) {
    const methodName = context.name as string;
    return async function (this: This, ...args: Args): Promise<Return> {
      /* Use `stepName` when it's defined or fall back to class name / method name */
      const dynamicStepName =
        stepName || `${(this as any).constructor.name}.${methodName}`;
      return allure.step(dynamicStepName, () => target.apply(this, args));
    };
  };
}
