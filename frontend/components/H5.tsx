function H5(props: any) {
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
        <h5 style={styles}>{ props.children }</h5>
    )
};

export default H5;