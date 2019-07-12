class GitHub {
    static importIssues(event, newItems, setNewItems) {
        event.preventDefault();

        const {repopath} = event.target.elements;

        import('github-api')
            .then(({default: GitHub}) => {
                const gh = new GitHub();
                const [user, repo] = repopath.value.trim().split('/');
                gh
                    .getIssues(user, repo)
                    .listIssues()
                    .then((issues) => {
                        const newIssues = [];
                        issues.data.forEach((issue) => {
                            newIssues.push({text: `${repo}-${issue.number} ${issue.title}`});
                        });
                        setNewItems([...newItems, ...newIssues]);
                    }).catch(err => {
                    alert('There was an error, it may be because the repository isn\'t public.');
                });
            })
            .catch(err => {
                alert('There was an error, please refresh the page and try again');
            });
    }
}

export default GitHub
