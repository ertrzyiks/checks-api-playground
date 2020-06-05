module.exports = async ({context, github}) => {
    const { owner, repo } = context.repo

    console.log(context)

    const annotations = []

    await github.checks.create({
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'completed',
        conclusion: annotations.length > 0 ? 'failure' : 'success',
        annotations,
        head_sha: process.env.GITHUB_SHA
    })
}
