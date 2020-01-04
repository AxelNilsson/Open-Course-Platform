import Container from "../components/Container";
import Column from "../components/Column";
import Row from "../components/Row";
import H2 from "../components/H2";
import TopRightButton from "../components/TopRightButton";

function InCourseNavigation() {
    return (
        <nav>
            <Container maxWidth={"1080px"}>
                <Row padding={"32px 0"}>
                    <Column flex={3}>
                        <H2 color={"#424242"}>Club Coding</H2>
                    </Column>
                    <Column flex={2}>
                        <Row justifyContent={"flex-end"}>
                            <TopRightButton link="/">Leave course</TopRightButton>
                        </Row>
                    </Column>
                </Row>
            </Container>
        </nav>
    )
};

export default InCourseNavigation;