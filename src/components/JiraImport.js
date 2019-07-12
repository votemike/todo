import React from 'react';
import ToggleableSection from "./ToggleableSection";

function JiraImport({ handleFiles }) {
    return (
        <ToggleableSection buttonText="Import from Jira CSV" extraClasses="jira-import">
            <input type="file" id="input" onChange={handleFiles} name="jira-import" accept=".csv"/>
        </ToggleableSection>
    );
}

export default JiraImport
