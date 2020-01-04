function Card(props: any) {
    var margin = "0"
    if (props.margin !== undefined) {
        margin = props.margin
    }

    var padding = "1.2em 2em"
    if (props.padding !== undefined) {
        padding = props.padding
    }

    var width = "auto"
    if (props.width !== undefined) {
        width = props.width
    }
    
    const styles = {
        position: 'relative' as 'relative',
        display: 'inline-block',
        padding: padding,
        margin: margin,
        width: width,
        textDecoration: 'none',
        textAlign: 'center' as 'center',
        cursor: 'pointer',
        userSelect: 'none' as 'none',
        color: 'white',
    };
    return (
        <div>{ props.children }</div>
    )
};

export default Card;