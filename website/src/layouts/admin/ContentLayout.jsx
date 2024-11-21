import Header from './Header';

const ContentLayout = ({ children, title }) => {
    return (
        <div>
            <Header title={ title } />
            <div className="container pt-8 pb-8 px-4 sm:px-8">
                { children }
            </div>
        </div>
    );
};

export default ContentLayout;