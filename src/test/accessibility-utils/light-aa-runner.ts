import "../../generated/tokens/semantics.css";
import "../../generated/tokens/primitives.css";

export const lightAARunner = async (testFn: () => Promise<void>) => {
  console.log("Running accessibility tests in light mode with AA standards...");
  await testFn();
};
