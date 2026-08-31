type FooterProps = {
  randomizeHomeOrder: boolean;
  onToggleRandomizeHomeOrder: (enabled: boolean) => void;
};

export const Footer = ({
  randomizeHomeOrder,
  onToggleRandomizeHomeOrder,
}: FooterProps) => {
  return (
    <footer className="bg-light border-top mt-auto">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <p className="mb-0 text-muted">
              <small>&copy; 2026 User Research</small>
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div className="form-check form-switch d-inline-flex align-items-center gap-2 mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="randomize-home-order"
                checked={randomizeHomeOrder}
                onChange={(event) =>
                  onToggleRandomizeHomeOrder(event.target.checked)
                }
              />
              <label
                className="form-check-label text-muted"
                htmlFor="randomize-home-order"
              >
                <small>Randomise home page order</small>
              </label>
            </div>
          </div>
          <div className="col-md-4 text-md-end">
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
