module.exports = async ({context, github}) => {
    const { sha } = context
    const { owner, repo } = context.repo

    const { data } = await github.repos.createDeployment({
        owner,
        repo,
        ref: sha,
        required_contexts: []
    })

    const { id } = data

    await github.repos.createDeploymentStatus({
      owner,
      repo,
      deployment_id: id,
      state: 'success',
    })
}
