import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

import Container from "../../../../components/Container";
import Row from "../../../../components/Row";
import InCourseNavigation from "../../../../components/InCourseNavigation";
import Footer from "../../../../components/Footer";
import Column from "../../../../components/Column";
import Sidebar from "../../../../components/Sidebar";

function Index(props: any) {
    const router = useRouter();

    const style = {
        background: "#FFF",
        width: "100vw",
        minHeight: "100vh",
        margin: "0",
    }

    const card = {
        position: 'relative' as 'relative',
        display: 'inline-block',
        textDecoration: 'none',
        userSelect: 'none' as 'none',
        color: '#212',
        backgroundColor: "#FAFAFA",
        borderRadius: "18px",
        padding: "0 2em",
    }

    const markdown = {
        color: '#424242',
        width: "100%",
        whiteSpace: "pre-wrap" as "pre-wrap",
    }

    return (
        <>
            <div style={style}>
                <InCourseNavigation></InCourseNavigation>
                <main>
                    <Container maxWidth={"1080px"}>
                        <Row padding={"1em 0"}>
                            <Column flex={3}>
                                <Sidebar
                                    courseLink={router.query.course}
                                    chapterLink={router.query.chapter}
                                    sessionLink={router.query.session}
                                    course={props.course}
                                    no_chapters={props.no_chapters}
                                    no_sessions={props.no_sessions}
                                    chapters={props.chapters}
                                ></Sidebar>
                            </Column>
                            <Column flex={7}>
                                <div style={card}>
                                    <div style={markdown}>
                                        <Markdown
                                            source={props.text}
                                        />
                                    </div>
                                </div>
                            </Column>
                        </Row>
                    </Container>
                </main>
                <Footer></Footer>
            </div>
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
                pre {
                    white-space: pre-wrap;
                }
`}
            </style>
        </>
    )
};

Index.getInitialProps = async function (context: any) {
    const { course, chapter, session } = context.query;

    const session_res = await fetch(`http://${process.env.host}/api/courses/${course}/${chapter}/${session}`);
    const session_data = await session_res.json();

    return session_data.data;
};


export default Index;