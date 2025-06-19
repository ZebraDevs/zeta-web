import "../../generated/tokens/semantics.css";
import "../../generated/tokens/primitives-dark.css";
import "../../generated/tokens/semantics-high-contrast.css";
import "../../generated/tokens/primitives-dark.css";

export const darkAARunner = async (testFn: () => Promise<void>) => {
  console.log("Running accessibility tests in dark mode with AA standards...");
  await testFn();
};
