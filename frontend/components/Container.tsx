function Container(props: any) {
    var margin = "0 auto"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "0 10px"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var maxWidth = "960px"
    if (props.maxWidth !== undefined) {
        maxWidth = props.maxWidth
    }

    const style = {
        margin: margin,
        maxWidth: maxWidth,
        padding: padding,
    };
    
    return (
        <div style={style}>{props.children}</div>
    )
};

export default Container;