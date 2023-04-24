import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions";
import style from "./Cards.module.css";
import { searchDogByName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import OrderAndFilters from "../OrdersaAndFilters/OrderAndFilters";

const DogsList = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const navigate = useNavigate();

  // Cantidad de perros por página
  const PER_PAGE = 8;

  // Estado local para manejar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleSearch = (name) => {
    dispatch(searchDogByName(name));
    navigate(`/home/name?name=${name}`);
  };

  // Lógica para obtener los perros que se deben mostrar en la página actual
  const indexOfLastDog = currentPage * PER_PAGE;
  const indexOfFirstDog = indexOfLastDog - PER_PAGE;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  // Lógica para renderizar los botones de paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs.length / PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style["dogs-list-container"]}>
      <OrderAndFilters />
      <div className={`${style["dogs-list"]} ${style.dogs}`}>
        {currentDogs.map((dog) => (
          <div key={dog.id} className={style.dog}>
            <img
              src={dog.image.url ? dog.image.url : dog.image}
              alt={dog.name}
              onClick={() => handleSearch(dog.name)}
            />
            <p>
              <strong>{dog.name}</strong>
            </p>
            <br></br>
            <p>
              <strong>Temperaments: </strong>
              {dog.temperament ? (
                dog.temperament
              ) : (
                <>
                  {dog.temperaments &&
                    dog.temperaments.map((t) => t.name).join(", ")}
                </>
              )}
            </p>
            <p>
              <strong>Weight: </strong>
              {dog.weight.imperial ? dog.weight.imperial : dog.weight} lb
            </p>
          </div>
        ))}
      </div>
      {/* Renderizar botones de paginación */}
      <div className={style.pagination}>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DogsList;
