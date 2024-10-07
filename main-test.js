const core = require("@actions/core");

async function main() {
try {
const ref = process.env.GITHUB_REF;

// GITHUB_REF 환경 변수 검증
if (!ref) {
core.setFailed("GITHUB_REF is not defined.");
return;
}

// 태그 참조인지 확인
if (!ref.startsWith("refs/tags/")) {
core.setFailed(`The GITHUB_REF (${ref}) is not a tag reference.`);
return;
}

// 태그 이름 추출
const tag = ref.replace(/^refs\/tags\//, "");

// 디버그 정보 출력
core.debug(`Ref: ${ref}`);
core.debug(`Extracted tag: ${tag}`);

// 추출된 태그 출력 설정
core.setOutput("tag", tag);
} catch (error) {
// 예상치 못한 에러 처리
core.setFailed(`Action failed with error: ${error}`);
}
}

main();
