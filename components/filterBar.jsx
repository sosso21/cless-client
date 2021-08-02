import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FilterBar = ({ Type, setData, allProduct }) => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    collection: "",
    q: "",
    minPrice: 0,
    maxPrice: "",
    orderBy: "",
    dir: "asc",
  });

  const changeFIlter = (elements) => {
    setFilter({ ...filter, ...elements });
  };

  useEffect(() => {
    allProduct = allProduct.filter(
      (d) =>
        (d.name.search(filter.q) != -1 ||
          d.description.search(filter.q) != -1 ||
          d.type.includes(filter.q)) &&
        d.price[0] >= +filter.minPrice
    );
    filter.collection &&
      (allProduct = allProduct.filter((d) =>
        d.type.includes(filter.collection)
      ));
    filter.maxPrice &&
      (allProduct = allProduct.filter((d) => d.price[0] <= +filter.maxPrice));
    if (filter.orderBy) {
      if (filter.orderBy == "date" && filter.dir == "asc") {
        allProduct = allProduct.sort((a, b) => a.date - b.date);
      }
      if (filter.orderBy == "date" && filter.dir == "desc") {
        allProduct = allProduct.sort((a, b) => b.date - a.date);
      }

      if (filter.orderBy == "price" && filter.dir == "asc") {
        allProduct = allProduct.sort((a, b) => a.price[0] - b.price[0]);
      }
      if (filter.orderBy == "price" && filter.dir == "desc") {
        allProduct = allProduct.sort((a, b) => b.price[0] - a.price[0]);
      }
    }
    setData(allProduct);
  }, [filter]);

  useEffect(() => {
    if (router.query.filter && Type.length && allProduct.length) {
      const filterUrl = router.query.filter.replace("%", " ");

      if (Type.includes(filterUrl)) {
        changeFIlter({
          collection: filterUrl,
        });
      } else {
        router.push("/");
      }
    }
  }, [router.query, Type, allProduct]);

  return (
    <section className=" w-100 py-4 d-flex justify-content-around align-content-around align-items-around  flex-wrap ">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input
            value={filter.q}
            onChange={(e) =>
              changeFIlter({
                q: e.target.value,
              })
            }
            type="text"
            name="q"
            placeholder="Rechercher"
            className="form-control "
          />
          <button className="btn btn-link btn-sm text-hermes bi bi-search"></button>
        </div>
      </form>
      <span>
        <div className="input-group">
          <select
            value={filter.collection}
            onChange={(e) =>
              changeFIlter({
                collection: e.target.value,
              })
            }
            className="custom-select form-control"
          >
            <option value="">Collections</option>
            {Type.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
        </div>
      </span>

      <span>
        <div className="input-group">
          <input
            value={filter.minPrice}
            onChange={(e) =>
              changeFIlter({
                minPrice: e.target.value,
              })
            }
            type="number"
            name="min-price"
            placeholder="Prix minimum"
            className="form-control w-min-cont mx-1"
          />
          <input
            value={filter.maxPrice}
            onChange={(e) =>
              changeFIlter({
                maxPrice: e.target.value,
              })
            }
            type="number"
            name="max-price"
            placeholder="Prix maximum"
            className="form-control w-min-cont mx-1"
          />
        </div>
      </span>

      <span>
        <div className="input-group">
          <select
            value={filter.orderBy}
            onChange={(e) =>
              changeFIlter({
                orderBy: e.target.value,
              })
            }
            className="custom-select form-control"
          >
            <option value="">Tirer Par</option>
            <option value="date">date d'ajout</option>
            <option value="price">prix</option>
          </select>
          <button
            onClick={(e) =>
              changeFIlter({
                dir: filter.dir == "asc" ? "desc" : "asc",
              })
            }
            className={`btn btn-sm btn-link text-hermes bi bi-arrow-${
              filter.dir == "asc" ? "down" : "up"
            }`}
          ></button>
        </div>
      </span>
    </section>
  );
};

export default FilterBar;
