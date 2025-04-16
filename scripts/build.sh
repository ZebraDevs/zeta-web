tsc -P tsconfig.build.json
npx clean-css-cli ./src/index.css -o ./dist/index.css
cp src/generated/tokens/semantics.css ./dist/semantics.css
cp src/generated/tokens/primitives.css ./dist/primitives.css
npx tsx scripts/add-declarations.ts --silent
