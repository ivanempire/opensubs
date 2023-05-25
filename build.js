const { glob } = require("glob");
const { Generator } = require("npm-dts");
const { build } = require("esbuild");

async function buildESM() {
    await build({
        entryPoints: glob.sync("src/**/*.ts"),
        outdir: "dist/esm",
        sourcemap: true,
        splitting: true,
        format: "esm",
        target: ["esnext"],
    });
}

async function createTypes() {
    await new Generator({
        entry: "src/index.ts",
        output: "dist/index.d.ts",
    }).generate();
}

async function buildCJS() {
    await build({
        entryPoints: glob.sync("src/**/*.ts"),
        outdir: "dist/cjs",
        sourcemap: true,
        format: "cjs",
        target: ["esnext"],
    });
}

Promise.all([buildESM(), createTypes(), buildCJS()]);