import React from 'react';

function Settings({ settingsFormHandler, settings }) {
    const [showSettings, setShowSettings] = React.useState(false);

    const settingsButtonHandler = event => {
        event.preventDefault();

        setShowSettings(!showSettings);
    };

    return (
        <div className="settings">
            <button id="settings-toggle" onClick={settingsButtonHandler}>{showSettings ? 'Hide Settings' : 'Show Settings'}</button>
            <form onSubmit={settingsFormHandler} className={showSettings ? "" : "hidden"}>
                <div className="form-row">
                    <label htmlFor="impact">Rename "Impact"</label>
                    <input
                        id="impact"
                        name="impact"
                        placeholder="Users, sales, value"
                        type="text"
                        required={true}
                        defaultValue={settings.impact}
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
                        defaultValue={settings.effort}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="tooltip">Show Tooltips</label>
                    <input
                        id="tooltip"
                        name="label-display"
                        type="radio"
                        required={true}
                        defaultChecked={!settings.showLabels}
                    />
                    <label htmlFor="label">Show Labels</label>
                    <input
                        id="label"
                        name="label-display"
                        type="radio"
                        required={true}
                        defaultChecked={settings.showLabels}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Settings
