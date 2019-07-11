import React from 'react';
import classNames from 'classnames';

function ToggleableSection({ children, buttonText, extraClasses }) {
    const [showChild, setShowChild] = React.useState(false);

    const toggleButtonHandler = event => {
        event.preventDefault();

        setShowChild(!showChild);
    };

    const sectionClassNames = classNames(
        "togglable-section-content",
        extraClasses,
        {"hidden": !showChild}
    );

    return (
        <div className="togglable-section">
            <button className="show-hide-toggle" onClick={toggleButtonHandler}>{buttonText}</button>
            <div className={sectionClassNames}>
                {children}
            </div>
        </div>
    );
}

export default ToggleableSection;
