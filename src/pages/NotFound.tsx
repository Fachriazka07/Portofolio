import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import "./NotFound.css";

export function NotFound() {
    return (
        <div className="notfound-section">
            {/* Floating Decorations */}
            <div className="notfound-decoration decoration-1" />
            <div className="notfound-decoration decoration-2" />
            <div className="notfound-decoration decoration-3" />

            <div className="notfound-container">
                {/* Main Error Card */}
                <div className="notfound-card">
                    {/* Browser Header */}
                    <div className="notfound-header">
                        <div className="browser-dot dot-red" />
                        <div className="browser-dot dot-yellow" />
                        <div className="browser-dot dot-green" />
                        <div className="notfound-title-bar">error://404-not-found</div>
                    </div>

                    {/* Content */}
                    <div className="notfound-content">
                        {/* Big Sad Face */}
                        <div className="notfound-face">:(</div>

                        {/* Error Code Badge */}
                        <div className="notfound-badge">404</div>

                        {/* Text */}
                        <h1 className="notfound-heading">Page Not Found</h1>
                        <p className="notfound-text">
                            Oops! Halaman yang kamu cari tidak ada atau sudah dipindahkan.
                        </p>

                        {/* Action Buttons */}
                        <div className="notfound-actions">
                            <Link to="/" className="notfound-btn btn-primary">
                                <Home size={20} strokeWidth={2.5} />
                                Back to Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="notfound-btn btn-outline"
                            >
                                <ArrowLeft size={20} strokeWidth={2.5} />
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fun Glitch Text */}
                <div className="notfound-glitch" data-text="404">
                    404
                </div>
            </div>
        </div>
    );
}
