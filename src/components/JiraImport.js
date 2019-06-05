import React from 'react';

function JiraImport({ handleFiles }) {
    const [showUpload, setShowUpload] = React.useState(false);

    const toggleButtonHandler = event => {
        event.preventDefault();

        setShowUpload(!showUpload);
    };

    return (
        <div className="jira-import togglable-section">
            <button className="show-hide-toggle" onClick={toggleButtonHandler}>Import from Jira CSV</button>
            <input type="file" id="input" onChange={handleFiles} name="jira-import" accept=".csv" className={showUpload ? "" : "hidden"}/>
        </div>
    );
}

export default JiraImport
