import Container from "../components/Container";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Markdown from 'react-markdown';

function Terms() {
    const style = {
        width: "100vw",
        minHeight: "100vh",
        margin: "0",
    }

    const card = {
        position: 'relative' as 'relative',
        display: 'inline-block',
        textDecoration: 'none',
        userSelect: 'none' as 'none',
        color: '#212212',
        borderRadius: "18px",
        padding: "0 2em",
    }
    const input = "## Programming is very simple \n\nProgramming at its essence is very simple. What programming is, is just telling a computer what to do. Programming seems very foreign in the beginning due to the fact that we have built very pretty and intuative layers on top of our computers, which makes programming seem very complicated while it really is not. A computer is really good at making very easy operations many times and very fast. Due to the fact that a computer makes the operations so fast makes it seem like it's a magic machine compared to us, but at its core it is a very simple machine.\n\n\n## Making decisions\nA computer is really good at making decisions. Think of a computer standing at a road split. Based on what you send in to the computer, the computer is really good, and is really fast at making a decision here.\n\n## Abstraction\n\nA computer most likely seems very abstract and it doesn't make any sense to me to try to start at the ground up, because then it will take such a long time to make something useful with a computer. This would have been practical 30 years ago, but now, things have changed, and there are better ways to learn how to control a computer. So lets start with that. The goal of this course is to create a blog."

    return (
        <>
            <div style={style}>
                <header>
                    <Navigation></Navigation>
                </header>
                <main>
                    <Container maxWidth={"1080px"}>
                        <div style={card}>
                            <Markdown
                                source={input}
                            />
                        </div>
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

export default Terms;