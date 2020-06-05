module.exports = async ({context, github}) => {
    const { sha } = context
    const { owner, repo } = context.repo

    const annotations = []

    // annotations.push({
    //     path,
    //     start_line: line,
    //     end_line: line,
    //     annotation_level: annotationLevel,
    //     message: `[${ruleId}] ${message}`
    // })

    await github.checks.create({
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'completed',
        conclusion: annotations.length > 0 ? 'failure' : 'success',
        annotations,
        output: {
            title: 'This is the check title',
            summary: `${errorCount} error(s), ${warningCount} warning(s) found`,
            annotations
        },
        head_sha: sha
    })
}
