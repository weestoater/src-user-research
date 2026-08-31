export const Footer = () => {
  return (
    <footer className="bg-light border-top mt-auto">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0 text-muted">
              <small>&copy; 2026 User Research</small>
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 text-muted">
              <small>
                <i className="bi bi-info-circle me-1"></i>
                An exercise in user pattern discovery.
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
