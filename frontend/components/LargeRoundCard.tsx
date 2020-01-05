import Column from "./Column"
import Container from "./Container"
import Row from "./Row"
import LearnMoreButton from "./LearnMoreButton"

function LargeRoundCard(props: any) {
    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "2em"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var width = "100%"
    if (props.width !== undefined) {
        width = props.width
    }

    var backgroundColor = "#FFFFFF"
    if (props.backgroundColor !== undefined) {
        backgroundColor = props.backgroundColor
    }

    const styles = {
        position: 'relative' as 'relative',
        display: 'inline-block',
        padding: padding,
        margin: margin,
        width: width,
        textDecoration: 'none',
        userSelect: 'none' as 'none',
        color: 'white',
        height: "400px",
        backgroundColor: backgroundColor,
        borderRadius: "18px",
    };

    const headerStyle = {
        marginTop: "48px",
        color: '#212121',
        fontSize: "2.5em",
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
        <div style={styles}>
            <Container>
                <Row>
                    <Column flex={3}>
                        <h1 style={headerStyle}>{props.title}</h1>
                        <p style={paragraphStyle}>{props.tagline}</p>
                        <LearnMoreButton link={props.link}></LearnMoreButton>
                    </Column>
                    <Column flex={7}>
                        <img
                            style={imageStyle}
                            width="100%"
                            src={props.image}
                        />
                    </Column>
                </Row>
            </Container>
        </div>
    )
};

export default LargeRoundCard;