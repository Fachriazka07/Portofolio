import { ExternalLink, Download, X } from "lucide-react";
import { Link } from "react-router-dom";
import "./Resume.css";

export function Resume() {
    const pdfUrl = "/cv.pdf";

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Fachri_Azka_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenNewTab = () => {
        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="resume-section">
            {/* Header Bar */}
            <div className="resume-header">
                <h1 className="resume-title">Resume — Fachri Azka</h1>

                <div className="resume-actions">
                    <button onClick={handleOpenNewTab} className="resume-btn btn-outline">
                        <ExternalLink size={18} />
                        Open in new tab
                    </button>
                    <button onClick={handleDownload} className="resume-btn btn-primary">
                        <Download size={18} />
                        Download PDF
                    </button>
                    <Link to="/" className="resume-btn btn-close">
                        <X size={18} />
                        Close
                    </Link>
                </div>
            </div>

            {/* PDF Preview */}
            <div className="resume-preview-container">
                <div className="resume-preview-card">
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0`}
                        title="Resume Preview"
                        className="resume-iframe"
                    />
                </div>
            </div>
        </div>
    );
}
