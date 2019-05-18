import React from "react";
import {
    Container as OldContainer,
    Row as OldRow,
    Col as OldCol,
    Progress,
    Card as OldCard
} from "reactstrap";

const flexPropsToClasses = props => {
    const newProps = { ...props };
    newProps.className = newProps.className || "";

    /**
     Note: please set `body, html { height: 100% }` to fill window frame
     TODO: Maybe use min-height: 100% instead?
     https://getbootstrap.com/docs/4.1/utilities/sizing/
     **/
    if (newProps.fullHeight) {
        newProps.className += " h-100";
        delete newProps.fullHeight;
    }

    /**
     Use align-items utilities on flexbox containers to
     change the alignment of flex items on the cross
     axis (the y-axis to start, x-axis if flex-direction:
     column). Choose from start, end, center, baseline, or
     stretch (browser default).
     https://getbootstrap.com/docs/4.1/utilities/flex/#align-items
     **/
    if (newProps.alignItems) {
        newProps.className += ` align-items-${newProps.alignItems}`;
        delete newProps.alignItems;
    }

    /**
     Use justify-content utilities on flexbox containers to change the alignment
     of flex items on the main axis (the x-axis to start, y-axis if flex-direction:
     column). Choose from start (browser default), end, center, between, or around.

     https://getbootstrap.com/docs/4.1/utilities/flex/#justify-content
     **/
    if (newProps.justifyContent) {
        newProps.className += ` justify-content-${newProps.justifyContent}`;
        delete newProps.justifyContent;
    }

    if (newProps.flex) {
        newProps.className += ` d-flex`;
        delete newProps.flex;
    }

    if (newProps.alignItems) {
        newProps.className += ` align-items-${newProps.alignItems}`;
        delete newProps.alignItems;
    }

    if (newProps.alignSelf) {
        newProps.className += ` align-self-${newProps.alignSelf}`;
        delete newProps.alignSelf;
    }

    if (newProps.flexRow) {
        newProps.className += ` flex-row`;
        delete newProps.flexRow;
    }

    if (newProps.flexCol) {
        newProps.className += ` flex-column`;
        delete newProps.flexCol;
    }

    return newProps;
};

export class Container extends React.Component {
    render() {
        const newProps = flexPropsToClasses(this.props);
        return <OldContainer {...newProps}>{this.props.children}</OldContainer>;
    }
}

export class Row extends React.Component {
    render() {
        const newProps = flexPropsToClasses(this.props);
        return <OldRow {...newProps}>{this.props.children}</OldRow>;
    }
}

export class Col extends React.Component {
    render() {
        const newProps = flexPropsToClasses(this.props);
        return <OldCol {...newProps}>{this.props.children}</OldCol>;
    }
}

export class Card extends React.Component {
    render() {
        const newProps = flexPropsToClasses(this.props);
        return <OldCard {...newProps}>{this.props.children}</OldCard>;
    }
}
