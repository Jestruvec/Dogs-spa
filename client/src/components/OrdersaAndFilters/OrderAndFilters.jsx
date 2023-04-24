import React, { useEffect } from "react";
import styles from "./OrderAndFilters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getAllTemperaments } from "../../redux/actions";

import {
  sortDogsZA,
  sortDogsAZ,
  filterDogsDb,
  filterDogsApi,
  filterDogsByTemp,
  sortDogsByWeightDes,
  sortDogsByWeightAsc,
} from "../../redux/actions";

const OrderAndFilters = () => {
  const dispatch = useDispatch();

  const allTemperaments = useSelector((state) => state.allTemperaments);
  allTemperaments.sort((a, b) => (a.name > b.name ? 1 : -1));

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleSortAZChange = (event) => {
    const value = event.target.value;
    if (value === "Sort A - Z") {
      dispatch(getAllDogs());
    }
    if (value === "ascendente") {
      dispatch(sortDogsAZ());
    } else if (value === "descendente") {
      dispatch(sortDogsZA());
    }
  };

  const handleFilterOriginChange = (event) => {
    const value = event.target.value;
    if (value === "Filter by origin") {
      dispatch(getAllDogs());
    }
    if (value === "db") {
      dispatch(filterDogsDb());
    } else if (value === "api") {
      dispatch(filterDogsApi());
    }
  };

  const handleFilterTemp = (event) => {
    const value = event.target.value;
    if (value === "Filter by temperament") {
      dispatch(getAllDogs());
    } else {
      dispatch(filterDogsByTemp(value));
    }
  };

  const handleSortWeight = (event) => {
    const value = event.target.value;
    if (value === "Sort by weight") {
      dispatch(getAllDogs());
    }
    if (value === "ascendente") {
      dispatch(sortDogsByWeightAsc());
    } else if (value === "descendente") {
      dispatch(sortDogsByWeightDes());
    }
  };

  return (
    <div className={styles.container}>
      <select onChange={handleFilterTemp} className={styles.select}>
        <option value="Filter by temperament">Filter by temperament</option>
        {allTemperaments.map((temp) => (
          <option value={temp.name} key={temp.id}>
            {temp.name}
          </option>
        ))}
      </select>
      <select onChange={handleFilterOriginChange} className={styles.select}>
        <option value="Filter by origin">Filter by origin</option>
        <option value="api">API</option>
        <option value="db">DB</option>
      </select>
      <select onChange={handleSortAZChange} className={styles.select}>
        <option value="Sort A - Z">Sort A - Z</option>
        <option value="ascendente">A - Z</option>
        <option value="descendente">Z - A</option>
      </select>
      <select onChange={handleSortWeight} className={styles.select}>
        <option value="Sort by weight">Sort by weight</option>
        <option value="ascendente">min - max</option>
        <option value="descendente">max - min</option>
      </select>
    </div>
  );
};

export default OrderAndFilters;
