import React from 'react';

function GitHubImport({ handleSubmit }) {
    const [showForm, setShowForm] = React.useState(false);

    const toggleButtonHandler = event => {
        event.preventDefault();

        setShowForm(!showForm);
    };

    return (
        <div className="github-import togglable-section">
            <button className="show-hide-toggle" onClick={toggleButtonHandler}>Import public GitHub issues</button>
            <form onSubmit={handleSubmit} className={showForm ? "" : "hidden"}>
                <input type="text" id="repopath" name="github-import" placeholder="user/repo"/>
                <button type="submit">Import</button>
            </form>
        </div>
    );
}

export default GitHubImport
