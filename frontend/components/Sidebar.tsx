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

    const chapterStyle = {
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
            <h2 style={courseTitle}>{ props.course }</h2>
            <h5 style={courseTagline}>{ props.no_chapters } chapters | { props.no_sessions } sessions</h5>
            <ol style={chapters}>
                {props.chapters.map((chapter: any) =>
                    <li>
                        <h3 style={chapterStyle}>{chapter.chapter}</h3>
                        <ul style={sessions}>
                            {chapter.sessions.map((session: any) =>
                                <li style={session}>
                                    <SessionLink>
                                        {session}
                                    </SessionLink>
                                    <p style={sessionTagline}>2 minutes</p>
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ol>
        </>
    )
};

export default Sidebar;