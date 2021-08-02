import { useState, useEffect } from "react";
import dataWebsite from  "../../pages/api/data.json"

const Affiliation = ({ users, handleEditUser, linkDb, clientLinkDB }) => {
  const [reqAffiliation, setReqAffiliation] = useState([]);
  const [arlyAffiliate, setArlyAffiliate] = useState([]);
  const [seeUser, setSeeUser] = useState("");

  useEffect(() => {
    if (users) {
      setReqAffiliation(users.filter((i) => i.promo.value == 0));
      setArlyAffiliate(users.filter((i) => i.promo.value == 1));
    }
  }, [users]);

  return (
    <>
      <section className=" my-4 text-wrap d-flex flex-row justify-content-between flex-wrap">
        <div className="col-md-5 my-auto p-4 text-light bg-dark d-flex flex-column justify-content-between flex-wrap text-wrap">
          {seeUser ? (
            <> 
            <ul>
                <li>
                  <strong className="text-warning">id :</strong> {seeUser.id}
                </li>
                <li>
                  <strong className="text-warning">Prénom :</strong>
                  {seeUser.firstname}
                </li>
                <li>
                  <strong className="text-warning">Nom :</strong>
                  {seeUser.lastname}
                </li>
                <li>
                  <strong className="text-warning">Média :</strong>
                  {seeUser.promo.media}
                </li>
                <li>
                  <strong className="text-warning">Code Promo :</strong>
                  {seeUser.promo.code}
                </li>
                <li>
                  <strong className="text-warning">Moyen de paiement :</strong>
                  {seeUser.promo.payment}
                </li>
                <li>
                  <strong className="text-warning">
                    Réduction pour le client :
                  </strong>
                  {seeUser.promo.solde + "%"}
                </li>
                <li>
                  <strong className="text-warning">
                    Bénefice pour L'affilié:
                  </strong>
                  {seeUser.promo.benef + "%"}
                </li>
                <li>
                  <strong className="text-warning">Total Gagné: </strong>
                  {seeUser.promo.money.total + dataWebsite.currency}
                </li>
                <li>
                  <strong className="text-warning">
                    En Attente de reversement:
                  </strong>
                  {seeUser.promo.money.actual + dataWebsite.currency}
                </li>
              </ul>

              {
              users.includes(seeUser) && (
                <div className="btn-group d-flex flex-wrap">
                  <a
                    className="btn btn-lg btn-link"
                    href={clientLinkDB + seeUser.id}
                    target="_blank"
                  >
                    Voir plus
                  </a>
                  <button
                    onClick={(e) => handleEditUser(e, "delete", seeUser.id)}
                    className="btn btn-lg btn-danger"
                  >
                    Désafillier
                  </button>

                  {seeUser.promo.value == 0 && (
                    <button
                      onClick={(e) => handleEditUser(e, "accept", seeUser.id)}
                      className="btn btn-lg btn-primary"
                    >
                      Accepter
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="my-auto text-wrap -100 mx-4 ">
              Pour plus d'infos sur les utilisateurs consultez
              <a className="text-info" target="_blank" href={linkDb}>
                la base de donnée
              </a>
            </p>
          )}
        </div>

        <div className="col-md-6 my-4 list-group ">
          <h2 className="mx-2 fw-lighter my-4">
            Demande de partenariat
          </h2>

          {reqAffiliation.length != 0 ? (
            reqAffiliation.map((item) => (
              <button
                className={`btn  list-group-item list-group-item-action ${
                  item == seeUser
                    ? " list-group-item-primary "
                    : " list-group-item-secondary"
                } `}
                onClick={(e) => setSeeUser(item)}
              >
                {item.firstname + " " + item.lastname}
              </button>
            ))
          ) : (
            <i className="list-group-item list-group-item-action list-group-item-secondary">
              Aucune demande n'est en attente
            </i>
          )}

          <hr className="my-4" />

          <h2 className="fw-lighter my-4">Les Partenaires</h2>
          {arlyAffiliate.length != 0 ? (
            arlyAffiliate.map((item) => (
              <button
                className={`btn  list-group-item list-group-item-action ${
                  item == seeUser
                    ? " list-group-item-primary "
                    : " list-group-item-secondary"
                }`}
                onClick={(e) => setSeeUser(item)}
              >
                {item.firstname + " " + item.lastname}
              </button>
            ))
          ) : (
            <i className="list-group-item list-group-item-action list-group-item-secondary">
              Aucun Partenaire
            </i>
          )}
        </div>
      </section>
    </>
  );
};

export default Affiliation;
 