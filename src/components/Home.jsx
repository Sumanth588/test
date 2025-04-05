import NavigationBar from './NavigationBar';
import WelcomeSection from './WelcomeSection';
import Footer from './Footer';

export default function Home(){
    return (
        <>
            <NavigationBar path={"home"}/>
            <WelcomeSection />
            <Footer />
        </>
    );
}