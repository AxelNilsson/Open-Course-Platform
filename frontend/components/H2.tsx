function H2(props: any) {
    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "0"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var color = "#000"
    if (props.color !== undefined) {
        color = props.color
    }

    const styles = {
        padding: padding,
        margin: margin,
        color: color,
        textDecoration: 'none',
    };
    return (
        <h2 style={styles}>{ props.children }</h2>
    )
};

export default H2;