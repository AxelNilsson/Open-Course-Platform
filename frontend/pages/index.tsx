import fetch from 'isomorphic-unfetch';

import Container from "../components/Container";
import Row from "../components/Row";
import Navigation from "../components/Navigation";
import LargeRoundCard from "../components/LargeRoundCard";
import Footer from "../components/Footer";
import Column from "../components/Column";
import SmallRoundCard from "../components/SmallRoundCard";

function Index(props: any) {
    return (
        <>
            <header>
                <Navigation link={`/courses/${props.banner_course.slug}/${props.banner_course.chapter_slug}/${props.banner_course.session_slug}`}></Navigation>
                <Container maxWidth={"1080px"}>
                    <Row>
                        <LargeRoundCard
                            title={props.banner_course.name}
                            tagline={props.banner_course.description}
                            backgroundColor={props.banner_course.color}
                            image={props.banner_course.image_link}
                            link={`/courses/${props.banner_course.slug}/${props.banner_course.chapter_slug}/${props.banner_course.session_slug}`}
                        />
                    </Row>
                </Container>
            </header>
            <main>
                <Container maxWidth={"1080px"}>
                    <Row margin={"1em 0"}>
                        {props.courses.map((course: any, index: any) => {
                            var margin = "0 0 0 1em"
                            if ((index % 2) === 0) {
                                margin = "0 1em 0 0"
                            }
                            return (
                                <Column key={index} margin={margin}>
                                    <SmallRoundCard
                                        title={course.name}
                                        tagline={course.description}
                                        image={course.image_link}
                                        backgroundColor={course.color}
                                        link={`/courses/${course.slug}/${course.chapter_slug}/${course.session_slug}`}
                                    />
                                </Column>
                            )
                        }
                        )}
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


Index.getInitialProps = async function (context: any) {
    const session_res = await fetch(`http://${process.env.host}/api/courses`);
    const session_data = await session_res.json();

    const banner_course = session_data.data[0];
    session_data.data.shift();
    const courses = session_data.data;

    return {
        banner_course: banner_course,
        courses: courses,
    };
};

export default Index;