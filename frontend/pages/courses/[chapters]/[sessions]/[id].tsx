import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';

import Container from "../../../../components/Container";
import Row from "../../../../components/Row";
import InCourseNavigation from "../../../../components/InCourseNavigation";
import Footer from "../../../../components/Footer";
import Column from "../../../../components/Column";
import Sidebar from "../../../../components/Sidebar";

function Index(props: any) {
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
                `}
            </style>
        </>
    )
};

Index.getInitialProps = async function (context: any) {
    const { chapters, sessions, id } = context.query;

    const session_res = await fetch(`http://192.168.1.2/api/courses/${chapters}/${sessions}/${id}`);
    const session_data = await session_res.json();

    return session_data.data;
};


export default Index;