type PageCardProps = {
  title: string;
  description?: string;
  onClick: () => void;
};

export const PageCard = ({ title, description, onClick }: PageCardProps) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title h5">{title}</h3>
          {description && (
            <p className="card-text flex-grow-1">{description}</p>
          )}
          <button className="btn btn-primary mt-auto" onClick={onClick}>
            View <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
