import "../../generated/tokens/semantics-high-contrast.css";
import "../../generated/tokens/primitives.css";

export const lightAAARunner = async (testFn: () => Promise<void>) => {
  console.log("Running accessibility tests in light mode with AAA standards...");
  await testFn();
};
