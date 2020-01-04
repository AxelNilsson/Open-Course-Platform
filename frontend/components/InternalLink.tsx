import { useState } from 'react';
import Link from 'next/link';

function InternalLink(props: any) {
    const [hover, setHover] = useState(false);

    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "0"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var color = "#000"
    if (props.color !== undefined) {
        color = props.color
    }

    var hoverColor = "#212121"
    if (props.color !== undefined) {
        color = props.color
    }

    var styles = {
        padding: padding,
        margin: margin,
        textDecoration: 'none',
        color: color,
        borderBottom: "0",
        paddingBottom: "4px",
        fontFamily: 'Mukta',
    };

    if (hover) {
        styles.color = hoverColor
        styles.borderBottom = "2px solid #424242";
    } else {
        styles.color = color
    }

    var divStyles = {
        textAlign: 'center' as 'center',
    }

    function toggleHover() {
        setHover(!hover)
    }

    return (
        <div style={divStyles}>
            <Link
                href={props.link}
            >
                <a
                    style={styles}
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                >
                    {props.children}
                </a>
            </Link>
        </div>
    )
};

export default InternalLink;