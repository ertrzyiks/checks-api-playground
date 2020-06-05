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

    annotations.push({
        path: 'index.js',
        start_line: 2,
        end_line: 2,
        annotation_level: '', // failure
        message: `[0] This is lame`
    })

    const { data }  = await github.checks.create({
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'completed',
        conclusion: annotations.length > 0 ? 'failure' : 'success',
        output: {
            title: 'This is the check title',
            summary: `0 error(s), 0 warning(s) found`,
            annotations
        },
        head_sha: sha
    })

    const { id } = data

    await github.checks.update({
        check_run_id: id,
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'completed',
        conclusion: annotations.length > 0 ? 'failure' : 'success',
        output: {
            title: 'This is the check title',
            summary: `0 error(s), 0 warning(s) found`,
            annotations: [annotations[0]]
        },
        head_sha: sha
    })

    await github.checks.update({
        check_run_id: id,
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'completed',
        conclusion: annotations.length > 0 ? 'failure' : 'success',
        output: {
            title: 'This is the check title',
            summary: `0 error(s), 0 warning(s) found`,
            annotations: [annotations[1]]
        },
        head_sha: sha
    })
}
