function A(props: any) {
    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "0"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    const styles = {
        padding: padding,
        margin: margin,
    };
    return (
        <a href={props.link} style={styles}>{ props.children }</a>
    )
};

export default A;