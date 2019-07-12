import React from 'react';
import ToggleableSection from "./ToggleableSection";

function GitHubImport({ handleSubmit }) {
    return (
        <ToggleableSection buttonText="Import public GitHub issues" extraClasses="github-import">
            <form onSubmit={handleSubmit}>
                <input type="text" id="repopath" name="github-import" placeholder="user/repo"/>
                <button type="submit">Import</button>
            </form>
        </ToggleableSection>
    );
}

export default GitHubImport
