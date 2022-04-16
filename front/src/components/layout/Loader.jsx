
const Loader = ({text = '', width = '3', height = '3'}) => {
    return (
        <div className="row text-center justify-content-center h-100">
          <div className="col-6 align-self-center">
            <div className="spinner-border text-primary mb-3" style={{width: `${width}rem`, height: `${height}rem`}} role="status"></div>
            <div className="sr-only lead"><strong>{text}</strong></div>
            </div>
        </div>
      )
}

export default Loader;