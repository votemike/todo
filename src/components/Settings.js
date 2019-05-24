import React from 'react';

function Settings({ renameHandler, variableNames }) {
    const [showSettings, setShowSettings] = React.useState(false);

    const settingsButtonHandler = event => {
        event.preventDefault();

        setShowSettings(!showSettings);
    };

    return (
        <div className="settings">
            <button id="settings-toggle" onClick={settingsButtonHandler}>{showSettings ? 'Hide Settings' : 'Show Settings'}</button>
            <form onSubmit={renameHandler} className={showSettings ? "" : "hidden"}>
                <div className="form-row">
                    <label htmlFor="impact">Rename "Impact"</label>
                    <input
                        id="impact"
                        name="impact"
                        placeholder="Users, sales, value"
                        type="text"
                        required={true}
                        defaultValue={variableNames.impact}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="effort">Rename "Effort"</label>
                    <input
                        id="effort"
                        name="effort"
                        placeholder="Cost, speed, difficulty"
                        type="text"
                        required={true}
                        defaultValue={variableNames.effort}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Settings
