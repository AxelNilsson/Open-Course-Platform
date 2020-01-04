function H6(props: any) {
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
        <h6 style={styles}>{ props.children }</h6>
    )
};

export default H6;