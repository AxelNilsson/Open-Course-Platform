import Container from "../components/Container";
import Column from "../components/Column";
import Row from "../components/Row";
import Link from "next/link";
import InternalLink from "./InternalLink";

function Footer() {
    const style = {
        margin: 0,
        fontFamily: 'Mukta',
    }

    const linkStyle = {
        fontFamily: 'Mukta',
        color: "#212",
        textDecoration: 'none',
    }

    return (
        <footer>
            <Container maxWidth={"1080px"}>
                <Row padding={"32px 0"}>
                    <Column>
                        <Row justifyContent={"space-between"}>
                            <InternalLink link="/terms">Terms</InternalLink>
                            <p style={style}>&copy; Club Coding &ndash; 2020</p>
                            <a href="mailto:help@clubcoding.com" style={linkStyle}>Contact Us</a>
                        </Row>
                    </Column>
                </Row>
            </Container>
        </footer>
    )
};

export default Footer;