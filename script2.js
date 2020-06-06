module.exports = async ({context, github}) => {
    const { sha } = context
    const { owner, repo } = context.repo

    github.repos.createDeployment({
        owner,
        repo,
        ref: sha,
        required_contexts: []
    })
}
