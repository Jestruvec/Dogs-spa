import React, { useEffect, useState } from "react";
import styles from "./CardDetail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../../redux/actions";
import { deleteDog } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const CardDetail = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.filteredDogs);
  const loading = useSelector((state) => state.loading);
  const [cleared, setCleared] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = () => {
      if (!cleared) {
        dispatch(clearState());
        setCleared(true);
      }
    };
    return cleanup;
  }, [cleared, dispatch]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>; // indicador de carga
  }

  const delDog = (id) => {
    dispatch(deleteDog(id));
    alert(`El perro ${dog.name} ha sido eliminado correctamente`);
    navigate("/home");
  };

  return (
    <div className={styles.card}>
      {dog.name ? (
        <>
          <div className={styles["card-header"]}>
            {dog.image && (
              <img
                src={dog.image.url ? dog.image.url : dog.image}
                alt={dog.name}
              />
            )}
          </div>

          <div className={styles["card-name"]}>
            {dog.name && <h2>{dog.name}</h2>}
          </div>
          <div className={styles["card-body"]}>
            <ul>
              {dog.temperament ? (
                <li>
                  <strong>Temperament:</strong> {dog.temperament}
                </li>
              ) : (
                <li>
                  <strong>Temperament:</strong>{" "}
                  <>{dog.temperaments.map((t) => t.name).join(", ")}</>
                </li>
              )}
              {dog.breed_group ? (
                <li>
                  <strong>Breed:</strong> {dog.breed_group}
                </li>
              ) : (
                ""
              )}
              {dog.height && (
                <li>
                  <strong>Height:</strong>{" "}
                  {dog.height.imperial ? dog.height.imperial : dog.height} ft
                </li>
              )}
              {dog.weight && (
                <li>
                  <strong>Weight:</strong>{" "}
                  {dog.weight.imperial ? dog.weight.imperial : dog.weight} inch
                </li>
              )}
              {dog.life_span ? (
                dog.life_span && (
                  <li>
                    <strong>Life span:</strong> {dog.life_span} years
                  </li>
                )
              ) : (
                <div>
                  <li>
                    <strong>Life span:</strong> {dog.lifespan} years
                  </li>
                </div>
              )}
            </ul>
            <div>
              {dog.id.length > 5 && (
                <button
                  className={styles["delete-button"]}
                  onClick={() => delDog(dog.id)}
                >
                  DELETE DOG
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2>Not found</h2>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
