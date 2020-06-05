function chunk(arr, chunkSize) {
    var R = [];
    for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
    return R;
}

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
        annotation_level: 'notice', // failure
        message: `[0] This is lame`
    })

    const title = 'This is the check title'
    const summary = `${annotations} error(s)`

    const { data }  = await github.checks.create({
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        completed_at: new Date(),
        status: 'completed',
        conclusion: annotations.length > 0 ? 'failure' : 'success',
        output: {
            title,
            summary
        },
        head_sha: sha
    })

    const { id } = data


    const chunks = chunk(annotations, 50)

    for (const chunk of chunks) {
        await github.checks.update({
            check_run_id: id,
            owner,
            repo,
            output: {
                title,
                summary,
                annotations: chunk
            },
            head_sha: sha
        })
    }
}
