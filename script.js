module.exports = async ({context, github}) => {
    const { owner, repo, sha } = context.repo

    github.checks.create({
        owner,
        repo,
        name: 'Test check',
        started_at: new Date(),
        status: 'in_progress',
        head_sha: sha
    })
}
