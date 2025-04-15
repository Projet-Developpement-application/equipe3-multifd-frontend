export default function RetourSiteBar() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center bg-dark">
                <button className="btn align-items-center ms-3 text-white" >
                    <a href="https://www.multifd.com/boutique/" className="text-decoration-none text-white">
                        <i className="bi bi-arrow-left me-2"></i> Retour au site principal
                    </a>
                </button>
            </div>
        </>
    );
}