const log = require('@ui5/logger').getLogger('builder:custom:eslint');
const path = require('path');
const { ESLint } = require('eslint');

module.exports = async function ({
  workspace,
  // eslint-disable-next-line no-unused-vars
  dependencies,
  // eslint-disable-next-line no-unused-vars
  taskUtil,
  options,
}) {
  const debug = options.configuration && options.configuration.debug;
  const autoFix = options.configuration && options.configuration.autoFix;

  let countErrors = 0;
  let countWarnings = 0;

  const eslint = new ESLint({ fix: autoFix });
  const results = await eslint.lintFiles('**/*.js');

  if (debug && auotFix) {
    console.info('ESLint auto-fix of problems is enabled!');
  }

  results.forEach((result) => {
    const filename = result.filePath.split(path.sep).pop();

    if (result.errorCount > 0 || result.warningCount > 0 || debug) {
      // Led status based on the unfixed findings
      if (result.errorCount > 0) {
        log.error(`🧹 ESLint check failed (${result.errorCount}): ${filename}`);
      } else if (result.warningCount > 0) {
        log.warn(
          `🧹 ESLint check passed with warnings (${result.warningCount}): ${filename}`
        );
      } else {
        log.info(`🧹 ESLint check passed: ${filename}`);
      }

      countErrors += result.errorCount;
      countWarnings += result.warningCount;
    }
  });

  if (autoFix) {
    await ESLint.outputFixes(results);
  }

  if (countErrors > 0) {
    log.error(
      `🧹 ESLint check failed with ${countErrors} Errors and ${countWarnings} Warnings`
    );
  } else if (countWarnings > 0) {
    log.warn(`🧹 ESLint check passed with ${countWarnings} Warnings`);
  } else {
    log.info(`🧹 ESLint check passed 😃`);
  }
};
