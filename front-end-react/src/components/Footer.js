import "./Footer.css";
const Footer = () => {
  return (
    <div className="Footer">
      <div>
        <div className="Student">
          <h4>Web developer: </h4>
          <p className="NA">Wentao Guo</p>
        </div>
        <div className="Student">
          <h4>Student ID: </h4>
          <p>S3956080</p>
        </div>
      </div>
      <div className="Image">
        <img
          src="https://www.rmit.edu.au/content/dam/rmit/common-assets/logo/rmit-pixel.png"
          alt="RMIT"
          width="100px"
          height="100px"
        />
      </div>
    </div>
  );
};

export default Footer;
