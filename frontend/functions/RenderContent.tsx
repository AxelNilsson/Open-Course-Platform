import Card from '../components/Card';
import Button from '../components/Button';
import Container from '../components/Container';
import Row from '../components/Row';
import Column from '../components/Column';
import H1 from '../components/H1';
import H2 from '../components/H2';
import H3 from '../components/H3';
import H4 from '../components/H4';
import H5 from '../components/H5';
import H6 from '../components/H6';
import P from '../components/P';
import A from '../components/A';
import Span from '../components/Span';
import Hr from '../components/Hr';
import InternalLink from '../components/InternalLink';

function RenderContent(content: any) {
    const listItems = content.map((tag: any, index: number) => {
        if (tag.name == "h1") {
            return <H1
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </H1>;
        }
        if (tag.name == "h2") {
            return <H2
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </H2>;
        }
        if (tag.name == "h3") {
            return <H3
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </H3>;
        }
        if (tag.name == "h4") {
            return <H4
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </H4>;
        }
        if (tag.name == "h5") {
            return <H5
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </H5>;
        }
        if (tag.name == "h6") {
            return <H6
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </H6>;
        }
        if (tag.name == "p") {
            return <P
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </P>;
        }
        if (tag.name == "span") {
            return <Span
                margin={tag.margin}
                padding={tag.padding}
                color={tag.color}
                fontSize={tag.font_size}
                fontWeight={tag.font_weight}
                key={index}
            >
                {tag.text}
            </Span>;
        }
        if (tag.name == "hr") {
            return <Hr
                key={index}
            />;
        }
        if (tag.name == "link") {
            return <InternalLink
                key={index}
                link={tag.link}
            >
                <a>
                    {tag.text}
                </a>
            </InternalLink>;
        }
        if (tag.name == "a") {
            return <A
                key={index}
                link={tag.link}
            >
                {tag.text}
            </A>;
        }
        if (tag.name == "img") {
            return <img
                key={index}
                src={tag.link}
                alt={tag.alt}
                height={tag.height}
                width={tag.width}
            />;
        }
        if (tag.name == "div") {
            return <div
                key={index}
            >
                {RenderContent(tag.children)}
            </div>;
        }
        if (tag.name == "card") {
            return <Card
                margin={tag.margin}
                padding={tag.padding}
                width={tag.width}
                key={index}
            >
                {RenderContent(tag.children)}
            </Card>;
        }
        if (tag.name == "button") {
            return <Button
                margin={tag.margin}
                padding={tag.padding}
                width={tag.width}
                key={index}
            >
                {tag.text}
            </Button>;
        }
        if (tag.name == "container") {
            return <Container
                margin={tag.margin}
                padding={tag.padding}
                maxWidth={tag.max_width}
                key={index}
            >
                {RenderContent(tag.children)}
            </Container>;
        }
        if (tag.name == "row") {
            return <Row
                margin={tag.margin}
                padding={tag.padding}
                height={tag.height}
                key={index}
            >
                {RenderContent(tag.children)}
            </Row>;
        }
        if (tag.name == "column") {
            return <Column
                margin={tag.margin}
                padding={tag.padding}
                width={tag.width}
                flex={tag.flex}
                key={index}
            >
                {RenderContent(tag.children)}
            </Column>;
        }
    });
    return (
        <>{listItems}</>
    )
}

export default RenderContent;