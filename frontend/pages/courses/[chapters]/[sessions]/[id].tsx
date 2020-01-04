import Markdown from 'react-markdown';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import Container from "../../../../components/Container";
import Row from "../../../../components/Row";
import InCourseNavigation from "../../../../components/InCourseNavigation";
import Footer from "../../../../components/Footer";
import Column from "../../../../components/Column";
import Sidebar from "../../../../components/Sidebar";

function Index() {
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
    }

    const input = "## Programming is very simple \n\nProgramming at its essence is very simple. What programming is, is just telling a computer what to do. Programming seems very foreign in the beginning due to the fact that we have built very pretty and intuative layers on top of our computers, which makes programming seem very complicated while it really is not. A computer is really good at making very easy operations many times and very fast. Due to the fact that a computer makes the operations so fast makes it seem like it's a magic machine compared to us, but at its core it is a very simple machine.\n\n\n## Making decisions\nA computer is really good at making decisions. Think of a computer standing at a road split. Based on what you send in to the computer, the computer is really good, and is really fast at making a decision here.\n\n## Abstraction\n\nA computer most likely seems very abstract and it doesn't make any sense to me to try to start at the ground up, because then it will take such a long time to make something useful with a computer. This would have been practical 30 years ago, but now, things have changed, and there are better ways to learn how to control a computer. So lets start with that. The goal of this course is to create a blog."

    return (
        <>
            <div style={style}>
                <InCourseNavigation></InCourseNavigation>
                <main>
                    <Container maxWidth={"1080px"}>
                        <Row padding={"1em 0"}>
                            <Column flex={3}>
                                <Sidebar></Sidebar>
                            </Column>
                            <Column flex={7}>
                                <div style={card}>
                                    <h1 style={markdown}>{router.query.chapters} - {router.query.sessions} - {router.query.id}</h1>
                                    <div style={markdown}>
                                        <Markdown
                                            source={input}
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

Index.getInitialProps = async function( context: any) {
    const { chapters, sessions, id } = context.query;
    const res = await fetch(`http://192.168.1.2:8080/api/${chapters}/${sessions}/${id}`);
    const data = await res.json();
  
    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      shows: data.map((entry: any) => entry.show)
    };
  };
  

export default Index;