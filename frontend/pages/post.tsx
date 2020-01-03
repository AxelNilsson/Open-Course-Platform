import { useRouter } from 'next/router';
import Header from '../components/Header';

const Content = () => {
    const router = useRouter();
    return (
        <>
            <h1>{router.query.title}</h1>
            <p>This is the blog post content.</p>
        </>
    );
};

const Page = () => (
    <div>
        <Header />
        <Content></Content>
    </div>
);

export default Page;