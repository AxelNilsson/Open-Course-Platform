import Container from "../components/Container";
import Row from "../components/Row";
import Navigation from "../components/Navigation";
import LargeRoundCard from "../components/LargeRoundCard";
import Footer from "../components/Footer";
import Column from "../components/Column";
import SmallRoundCard from "../components/SmallRoundCard";

function Index() {
    return (
        <>
            <header>
                <Navigation></Navigation>
                <Container maxWidth={"1080px"}>
                    <Row>
                        <LargeRoundCard
                            title="Introduction to Programming"
                            tagline="We want to introduce programming to you in a intuitive way, giving you practical knowledge. After this short course you will be able to create websites just like this one."
                        />
                    </Row>
                </Container>
            </header>
            <main>
                <Container maxWidth={"1080px"}>
                    <Row margin={"1em 0"}>
                        <Column margin={"0 1em 0 0"}>
                            <SmallRoundCard
                                title="Linear Algebra"
                                tagline="Linear algebra is fundamental in Computer Science but it's not taught for Computer Scientists. We want to change that. We need to combine our previous knowledge with new knowledge, giving you the tools to understand Linear Algebra."
                                image="/linear-algebra.png"
                                backgroundColor="#7fd6c2"
                                link="/courses/linear-algebra"
                            />
                        </Column>
                        <Column margin={"0 0 0 1em"}>
                            <SmallRoundCard
                                title="Calculus"
                                tagline="There is so much content on Calculus online that it's hard to make sense of it all. This resource is all that you need for your Computer Science needs. Use technology to your advantage to really understand Calculus. Once and for all."
                                image="/calculus.png"
                                backgroundColor="#ecced6"
                                link="/courses/calculus"
                            />
                        </Column>
                    </Row>
                </Container>
            </main>
            <Footer></Footer>
            <style jsx global>
                {`
                @import url("https://fonts.googleapis.com/css?family=Mukta:300,700");
                * {
                    font-family: 'Mukta', sans-serif;
                }
                body {
                    margin: 0;
                    padding: 0;
                }
                `}
            </style>
        </>
    )
};

export default Index;