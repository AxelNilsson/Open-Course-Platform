import Link from 'next/link';
import { useState } from 'react';

function SessionLink(props: any) {
    const [hover, setHover] = useState(false);

    function toggleHover() {
        setHover(!hover)
    }

    const sessionTitle = {
        margin: 0,
        color: "#424242",
        fontWeight: 300,
        fontSize: "18px",
        textDecoration: 'none',
    }

    if (props.active) {
        sessionTitle.fontWeight = 700
    } else if (hover) {
        sessionTitle.color = "#212212"
    } else {
        sessionTitle.color = "#424242"
    }

    return (
        <>
            <Link href="/">
                <a onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    style={sessionTitle}>
                    {props.children}
                </a>
            </Link>
        </>
    )
};

export default SessionLink;