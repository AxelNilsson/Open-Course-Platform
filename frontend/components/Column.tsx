function Column(props: any) {
    var flex = 1
    if (props.flex !== undefined) {
        flex = props.flex
    }

    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "0"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var width = "auto"
    if (props.width !== undefined) {
        width = props.width
    }

    const style = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        flexBasis: '100%',
        flex: flex,
        margin: margin,
        padding: padding,
        width: width,
    };
    
    return (
        <div style={style}>{props.children}</div>
    )
};

export default Column;