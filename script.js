module.exports = async ({context, github}) => {
    const { sha } = context
    const { owner, repo } = context.repo

    const annotations = []

    annotations.push({
        path: 'index.js',
        start_line: 1,
        end_line: 1,
        annotation_level: 'warning', // failure
        message: `[0] This is lame`
    })

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
            summary: `0 error(s), 0 warning(s) found`,
            annotations
        },
        head_sha: sha
    })
}
