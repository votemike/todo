import React from 'react';
import ToggleableSection from "./ToggleableSection";

function Settings({ settingsFormHandler, settings }) {
    return (
        <ToggleableSection buttonText="Settings" extraClasses="settings">
            <form onSubmit={settingsFormHandler}>
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
        </ToggleableSection>
    );
}

export default Settings
