import { useState } from 'react';

import Container from "./Container"
import Row from "./Row"
import Link from "next/link"

function SmallRoundCard(props: any) {
    const [hover, setHover] = useState(false);

    function toggleHover() {
        setHover(!hover)
    }

    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "2em"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var width = "auto"
    if (props.width !== undefined) {
        width = props.width
    }

    var backgroundColor = "#FFF"
    if (props.backgroundColor !== undefined) {
        backgroundColor = props.backgroundColor
    }

    var styles = {
        position: 'relative' as 'relative',
        display: 'inline-block',
        padding: padding,
        margin: margin,
        width: width,
        textDecoration: 'none',
        userSelect: 'none' as 'none',
        color: 'white',
        height: "100%",
        backgroundColor: backgroundColor,
        borderRadius: "18px",
        transition: "all .5s",
        boxShadow: "0",
    };

    if (hover) {
        styles.boxShadow = "0 8px 8px rgba(0,0,0,.5)"
    } else {
        styles.boxShadow = "0 0 0 0 rgba(0,0,0,.0)"
    }

    const headerStyle = {
        marginTop: "48px",
        color: '#212121',
        fontSize: "2em",
        fontWeight: 600,
        textAlign: 'left' as 'left',
        letterSpacing: "1.2",
        marginBottom: "0",
        lineHeight: "1.25",
    }

    const paragraphStyle = {
        color: '#212121',
        letterSpacing: "1.2",
        lineHeight: "1.5",
        marginBottom: "1.5em",
    }

    const imageStyle = {
        marginTop: "1em",
    }

    return (
        <Link href={props.link}>
            <a
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                style={styles}
            >
                <Container>
                    <Row>
                        <Row>
                            <img
                                style={imageStyle}
                                width="100%"
                                src={props.image}
                            />
                        </Row>
                        <Row>
                            <h1 style={headerStyle}>{props.title}</h1>
                            <p style={paragraphStyle}>{props.tagline}</p>
                        </Row>
                    </Row>
                </Container>
            </a>
        </Link>
    )
};

export default SmallRoundCard;