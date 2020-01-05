import SessionLink from './SessionLink';

function Sidebar(props: any) {
    const courseTitle = {
        color: "#424242",
        fontSize: "24px",
        marginBottom: 0,
    }

    const courseTagline = {
        marginTop: 0,
        color: "#757575",
        marginBottom: "4px",
    }

    const chapters = {
        padding: 0,
        listStyle: "none",
    }

    const chapter = {
        fontWeight: 300,
        color: "#424242",
        marginTop: 0,
        marginBottom: "4px",
        fontSize: "14px",
    }

    const sessions = {
        padding: 0,
        listStyle: "none",
        marginBottom: "3em",
    }


    const session = {
        marginBottom: "8px",
    }

    const sessionTagline = {
        margin: 0,
        color: "#757575",
        fontWeight: 300,
        fontSize: "14px",
    }

    return (
        <>
            <h2 style={courseTitle}>Introduction to Programming</h2>
            <h5 style={courseTagline}>3 Chapters | 6 sessions</h5>
            <ol style={chapters}>
                {props.chapters.map((chapter: any) =>
                    <li>
                        <h3 style={chapter}>Chapter 1</h3>
                        <ul style={sessions}>
                            <li style={session}>
                                <SessionLink>
                                    Install Patterns in Illustrator
                                </SessionLink>
                                <p style={sessionTagline}>2 minutes</p>
                            </li>
                            <li style={session}>
                                <SessionLink active>
                                    Pattern Making Basics
                                </SessionLink>
                                <p style={sessionTagline}>5 minutes</p>
                            </li>
                        </ul>
                    </li>
                )}
            </ol>
        </>
    )
};

export default Sidebar;