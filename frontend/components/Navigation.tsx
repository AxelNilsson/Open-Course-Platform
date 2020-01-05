import Container from "../components/Container";
import Column from "../components/Column";
import Row from "../components/Row";
import InternalLink from "../components/InternalLink";
import H2 from "../components/H2";
import TopRightButton from "../components/TopRightButton";

function Navigation(props: any) {
    return (
        <nav>
            <Container maxWidth={"1080px"}>
                <Row padding={"32px 0"}>
                    <Column flex={5}>
                        <H2 color={"#212121"}>Club Coding</H2>
                    </Column>
                    <Column flex={2}>
                        <Row justifyContent={"space-between"}>
                            <InternalLink color={"#424242"} link="/">Home</InternalLink>
                            <InternalLink color={"#424242"} link="/about">About</InternalLink>
                            <TopRightButton link={props.link}>Get started</TopRightButton>
                        </Row>
                    </Column>
                </Row>
            </Container>
        </nav>
    )
};

export default Navigation;