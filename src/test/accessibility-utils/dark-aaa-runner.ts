import "../../generated/tokens/semantics-high-contrast.css";
import "../../generated/tokens/primitives-dark.css";

export const darkAAARunner = async (testFn: () => Promise<void>) => {
  console.log("Running accessibility tests in dark mode with AAA standards...");
  await testFn();
};
