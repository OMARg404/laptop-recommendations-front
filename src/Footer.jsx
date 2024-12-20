
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    
    // Sample insights data
   
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Laptop Recommendation System. All Rights Reserved.</p>
                <p>Designed and Developed for FCDS</p>

              

                {/* Footer Links */}
                <div>
                <a href="/about" className="text-white mx-3">Insights</a>
                    <a href="/about" className="text-white mx-3">About Us</a>
                    <a href="/contact" className="text-white mx-3">Contact</a>
                    <a href="/privacy" className="text-white mx-3">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
