import Header from '../../components/Header';
import fetch from 'isomorphic-unfetch';

const Post = (props: any) => (
  <div>
    <Header />
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
    <img src={props.show.image.medium} />
  </div>
);

Post.getInitialProps = async function(context: any) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;