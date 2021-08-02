import component from "../pages/api/FooterComponent.json";
import dataWebSite from "../pages/api/data.json";
import StyleFooter from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className="pt-4 bg-dark text-light d-flex justify-content-around flex-column">
      <div className={StyleFooter.footerCmponent}>
        {component.map((i) => (
          <span className={StyleFooter.footerCmponentChild}>
            <i className={"fs-1 bi " + i.svg}></i>
            <strong>{i.title}</strong>
            <p> {i.content} </p>
          </span>
        ))}
      </div>

      <div className="d-flex justify-content-around">
        <p>{new Date().getFullYear()} All right is reserved</p>
        {dataWebSite.social.map((i) => (
          <a
            className={i.svg + " bi text-light font-big"}
            title={i.className}
            href={i.url}
            target="_blanck"
          >
            
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
