function Row(props: any) {
    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "0"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var height = "auto"
    if (props.height !== undefined) {
        height = props.height
    }

    var justifyContent = "baseline"
    if (props.justifyContent !== undefined) {
        justifyContent = props.justifyContent
    }
    const style = {
        display: 'flex',
        flexDirection: 'row' as 'row',
        flexWrap: 'wrap' as 'wrap',
        width: '100%',
        padding: padding,
        margin: margin,
        height: height,
        justifyContent: justifyContent,
    };
    
    return (
        <div style={style}>{props.children}</div>
    )
};

export default Row;