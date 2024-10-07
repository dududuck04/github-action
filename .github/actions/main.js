const core = require("@actions/core");

// 태그를 추출하는 함수
function extractTag(ref) {
  if (!ref) {
    throw new Error("GITHUB_REF is not defined");
  }
  if (!ref.startsWith("refs/tags/")) {
    throw new Error(`Not a tag ref (${ref})`);
  }
  return ref.replace(/^refs\/tags\//, "");
}

async function main() {
  try {
    const ref = process.env.GITHUB_REF;
    core.debug(`Received GITHUB_REF: ${ref}`);

    const tag = extractTag(ref);
    core.debug(`Extracted tag: ${tag}`);

    core.setOutput("tag", tag);
    core.info(`Tag [${tag}] has been successfully set as an output.`);
  } catch (error) {
    core.setFailed(`Failed to extract tag: ${error.message}`);
    core.error(error); // 추가적인 에러 로깅
  }
}

main();
