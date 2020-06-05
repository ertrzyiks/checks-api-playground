module.exports = async ({context, github}) => {
    const { owner, repo } = context.repo

    console.log(context)

    github.checks.create({
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'in_progress',
        head_sha: process.env.GITHUB_SHA
    })
}
