import { useState } from 'react';
import Link from 'next/link';

function InternalLink(props: any) {
    const [hover, setHover] = useState(false);

    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "12px 24px"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var color = "#424242"
    if (props.color !== undefined) {
        color = props.color
    }

    var hoverColor = "#FFFFFF"
    if (props.color !== undefined) {
        color = props.color
    }

    var styles = {
        padding: padding,
        margin: margin,
        textDecoration: 'none',
        color: color,
        borderRadius: "6px",
        border: "1px solid #424242",
        backgroundColor: "transparent",
    };

    if (hover) {
        styles.backgroundColor = color
        styles.color = hoverColor
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